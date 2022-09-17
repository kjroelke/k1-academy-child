import { API_URL } from '../utilities';

export const state = {
	accessPlans: [],
	courses: [],
	groups: [],
	memberships: [],
};

/** Gets LMS Course Data and adds it to state.
 * @param {string} endpoint endpoint of API
 */
export async function getCourseData(endpoint) {
	const res = await fetch(API_URL + `/${endpoint}`);
	const data = await res.json();
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
 * Takes an array of LMS endpoints as strings and returns the data to State. Note, this function converts 'accessPlans' (input JS) to 'access-plans' (string for href).
 * [LMS Rest API Documentation](https://developer.lifterlms.com/rest-api/)
 * @param {array} lmsData the terms as strings
 */
export async function getLMSData(lmsData) {
	try {
		lmsData.forEach(async (el) => {
			const endpoint = el === 'accessPlans' ? 'access-plans' : el;
			const res = await fetch(API_URL + `/${endpoint}`);
			const data = await res.json();
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
	// console.log(state);
}

async function createAsset(endpoint, data) {
	const res = await fetch(API_URL + `/${endpoint}`, {
		method: 'POST',
		credentials: '',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const info = await res.json();
}
