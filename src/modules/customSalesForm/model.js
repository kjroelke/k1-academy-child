import { makeRequest } from '../utilities';
export const state = {
	courses: [],
};

/** Gets LMS Course Data and adds it to state.
 * @param {string} endpoint endpoint of API
 */
export async function getCourseData(endpoint) {
	console.log('Loading Form...');
	try {
		const data = await makeRequest(endpoint);
		data.forEach((el) => {
			const course = {
				id: el.id,
				link: el.permalink,
				status: el.status,
				name: el.title.rendered,
			};
			if (course.id != 1214) state.courses.push(course);
		});
	} catch (err) {
		console.error(err);
	}
}

/**
 * [DEPRECATED?]
 * Takes an array of LMS endpoints as strings and returns the data to State.
 * [LMS Rest API Documentation](https://developer.lifterlms.com/rest-api/)
 * @param {array} lmsData the terms as strings
 */
export async function getLMSData(lmsData) {
	try {
		lmsData.forEach(async (endpoint) => {
			const data = await makeRequest(endpoint);
			data.forEach((el) => {
				switch (endpoint) {
					case 'memberships':
						const membership = {
							id: el.id,
						};
						state.memberships.push(membership);
						break;
					case 'accessPlans':
						const accessPlan = {
							id: el.id,
						};
						state.accessPlans.push(accessPlan);
						break;
					case 'groups':
						const group = {
							id: el.id,
						};
						state.groups.push(group);
				}
			});
		});
	} catch (err) {
		console.error(err);
	}
}

export async function createLMSAssets() {
	console.log('Creating assets...');
	await createMembership();
	await createAccessPlan();
	await createGroups();
	console.log('AJAX Complete! See ya later!');
}

async function createMembership() {
	const membership = {
		content: `A membership for ${state.form.org.name}`,
		title: `${state.form.org.name} Billing Membership`,
		catalog_visibility: 'hidden',
		auto_enroll: state.form.courses.ids,
	};
	try {
		const res = await makeRequest('memberships', 'POST', membership, true);
		state.membership = res[1];
		console.log('Membership created!');
	} catch (err) {
		console.error(err);
	}
}

async function createAccessPlan() {
	console.log('Creating access plan...');
	const accessPlan = {
		post_id: state.membership.id,
		title: `${state.form.org.name} Access Plan for AB-506 Membership.`,
		access_expiration: 'limited-period',
		visibility: 'hidden',
		price: calcPrice(),
	};
	try {
		const res = await makeRequest('access-plans', 'POST', accessPlan, true);
		state.accessPlan = res[1];
		console.log('Access Plan Created!');
	} catch (err) {
		console.error(err);
	}
}

/** List of course IDs Names & Prices (currently for K1Academy.local)
 * - `1214` Quick start = free
 * - `1021` Education = $15
 * - `831` Volunteer = $5
 * - `583` Reg = $15
 */
function calcPrice() {
	let price = 0;
	const employed = state.form.org.employees.ft + state.form.org.employees.pt;
	const vol = state.form.org.volunteers;
	state.membership.auto_enroll.forEach((id) => {
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

async function createGroups() {
	const coursesToAdd = Object.values(state.form.courses.ids);
	const totalEmployed =
		state.form.org.employees.ft + state.form.org.employees.pt;
	const seats = totalEmployed + state.form.org.volunteers;
	const plural = seats > 10 ? true : false;
	state.groups = {
		courses: [],
		group: {
			post: state.membership.id,
			visibility: 'private',
			slug: ``,
			title: ``,
		},
	};

	if (plural) {
		console.log('Creating all the groups...');
		for (const id of coursesToAdd) {
			const res = await makeRequest(`courses/${id}`);
			state.groups.courses.push(res);
		}

		for (const course of state.groups.courses) {
			const name = course.title.rendered;
			let type = '';
			switch (course.id) {
				case 1021:
					type = 'Edu';
					break;
				case 831:
					type = 'Vol';
					break;
				case 583:
					type = 'Emp';
					break;
			}
			state.groups.group.post = course.id;
			if (!name) return;
			state.groups.group.slug = `${state.form.org.name}-${name}-${type}`;
			state.groups.group.title = `${state.form.org.name} (${name})`;
			await createGroup(state.groups.group, seats);
		}
	}

	if (!plural) {
		console.log('Creating the group.');
		state.groups.group = {
			slug: `${state.form.org.name}-mx`,
			title: `${state.form.org.name}`,
		};
		await createGroup(state.groups.group);
	}
}
async function createGroup(group, seats) {
	try {
		const res = await makeRequest('groups', 'POST', group, true);
		await makeRequest(
			`groups/${res[1].id}/seats`,
			'PUT',
			{ total: `${seats}` },
			true,
		);
		console.log('Group created!');
	} catch (err) {
		console.error(err);
	}
}
