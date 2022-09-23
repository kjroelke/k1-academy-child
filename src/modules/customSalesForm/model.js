import { makeRequest } from '../utilities';
export const state = {
	courses: [],
};

/** Gets LMS Course Data and adds it to state.
 * @param {string} endpoint endpoint of API
 */
export async function getCourseData(endpoint) {
	const data = await makeRequest(endpoint);
	data.forEach((el) => {
		const course = {
			id: el.id,
			link: el.permalink,
			status: el.status,
			name: el.title.rendered,
		};
		state.courses.push(course);
	});
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
	await createMembership();
	console.log('Membership created!');
	console.log('Creating access plan...');
	await createAccessPlan();
}

async function createMembership() {
	const membership = {
		content: `A membership for ${state.form.org.name}`,
		title: `${state.form.org.name} Billing Membership`,
		catalog_visibility: 'hidden',
		auto_enroll: state.form.courses.ids,
	};
	try {
		console.log(membership);
		const res = await makeRequest('memberships', 'POST', membership, true);
		state.membership = res[1];

		// FOR TESTING
		// state.membership = membership;
	} catch (err) {
		console.error(err);
	}
}

async function createAccessPlan() {
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
		console.log('Access Plan Created! Time to checkout.');
	} catch (err) {
		console.error(err);
	}
}

/**
 * 1214 = quick start = free
 * 1021 = education = $15
 * 831 = volunteer = $5
 * 583 = reg = $15
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
