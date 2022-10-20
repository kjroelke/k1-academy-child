import { makeRequest } from '../utilities';

class Model {
	state = { courses: [] };
	constructor() {}
	/** Gets LMS Course Data and adds it to state.
	 * @param {string} endpoint endpoint of API
	 */
	getCourseData = async function (endpoint) {
		try {
			const data = await makeRequest(endpoint);
			data.forEach((el) => {
				const course = {
					id: el.id,
					link: el.permalink,
					status: el.status,
					name: el.title.rendered,
				};
				this.state.courses.push(course);
			});
		} catch (err) {
			console.error(err);
		}
	};
	createLMSAssets = async function () {
		await this.#createMembership();
		await this.#createAccessPlan();
		await this.#createGroups();
	};

	#createMembership = async function () {
		const membership = {
			content: `A membership for ${this.state.form.org.name}`,
			title: `${this.state.form.org.name} Billing Membership`,
			catalog_visibility: 'hidden',
			auto_enroll: this.state.form.courses.ids,
		};
		try {
			const res = await makeRequest('memberships', 'POST', membership, true);
			this.state.membership = res[1];
		} catch (err) {
			console.error(err);
		}
	};

	#createAccessPlan = async function () {
		const accessPlan = {
			post_id: this.state.membership.id,
			title: `${this.state.form.org.name} Access Plan for AB-506 Membership.`,
			access_expiration: 'limited-period',
			visibility: 'hidden',
			price: this.#calcPrice(),
		};
		try {
			const res = await makeRequest('access-plans', 'POST', accessPlan, true);
			this.state.accessPlan = res[1];
		} catch (err) {
			console.error(err);
		}
	};
	/** List of course IDs Names & Prices (currently for K1Academy.local)
	 * - `1214` Quick start = free
	 * - `1021` Education = $15
	 * - `831` Volunteer = $5
	 * - `583` Reg = $15
	 */
	#calcPrice() {
		let price = 0;
		const employed =
			this.state.form.org.employees.ft + this.state.form.org.employees.pt;
		const vol = this.state.form.org.volunteers;
		this.state.membership.auto_enroll.forEach((id) => {
			switch (id) {
				case 1214:
					price += 0;
					break;
				case 1021:
					price += 15 * employed;
					break;
				case 831:
					price += 5 * vol;
					break;
				case 583:
					price += 15 * employed;
			}
		});
		return price;
	}

	#createGroups = async function () {
		const coursesToAdd = Object.values(this.state.form.courses.ids);
		const totalEmployed =
			this.state.form.org.employees.ft + this.state.form.org.employees.pt;
		const seats = totalEmployed + this.state.form.org.volunteers;
		this.state.groups = {
			courses: [],
			group: {
				post: this.state.membership.id,
				visibility: 'private',
				slug: ``,
				title: ``,
			},
			seats: {
				employed: totalEmployed,
				volunteer: this.state.form.org.volunteers,
				total: seats,
			},
		};
		for (const id of coursesToAdd) {
			const res = await makeRequest(`courses/${id}`);
			this.state.groups.courses.push(res);
		}

		for (const course of this.state.groups.courses) {
			const name = course.title.rendered;
			let type = '';
			let licenses = 0;
			switch (course.id) {
				case 1021:
					type = 'Edu';
					licenses = this.state.groups.seats.employed;
					break;
				case 831:
					type = 'Vol';
					licenses = this.state.groups.seats.volunteer;
					break;
				case 583:
					type = 'Emp';
					licenses = this.state.groups.seats.employed;
					break;
			}
			this.state.groups.group.post = course.id;
			if (!name) return;
			this.state.groups.group.slug = `${this.state.form.org.name}-${name}-${type}`;
			this.state.groups.group.title = `${this.state.form.org.name} (${name})`;
			await this.#createGroup(this.state.groups.group, licenses);
		}
	};
	#createGroup = async function (group, seats) {
		try {
			const res = await makeRequest('groups', 'POST', group, true);
			await makeRequest(
				`groups/${res[1].id}/seats`,
				'PUT',
				{ total: `${seats}` },
				true,
			);
		} catch (err) {
			console.error(err);
		}
	};
}

export default new Model();

/**
 * [DEPRECATED?]
 * Takes an array of LMS endpoints as strings and returns the data to State.
 * [LMS Rest API Documentation](https://developer.lifterlms.com/rest-api/)
 * @param {array} lmsData the terms as strings
 */
// export async function getLMSData(lmsData) {
// 	try {
// 		lmsData.forEach(async (endpoint) => {
// 			const data = await makeRequest(endpoint);
// 			data.forEach((el) => {
// 				switch (endpoint) {
// 					case 'memberships':
// 						const membership = {
// 							id: el.id,
// 						};
// 						state.memberships.push(membership);
// 						break;
// 					case 'accessPlans':
// 						const accessPlan = {
// 							id: el.id,
// 						};
// 						state.accessPlans.push(accessPlan);
// 						break;
// 					case 'groups':
// 						const group = {
// 							id: el.id,
// 						};
// 						state.groups.push(group);
// 				}
// 			});
// 		});
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
