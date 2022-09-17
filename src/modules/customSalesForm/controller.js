import {
	API_URL,
	getElById,
	getFormVal,
	querySelector,
} from '../../modules/utilities';
import * as model from './model.js';
import FormView from './View';

// CONTROLLER
export const controller = {
	init: async function () {
		try {
			// 2. Load Form
			console.log('Loading Form...');
			await model.getCourseData('courses');
			FormView.showCourses(model.state.courses);

			// 3. Handle Submit
			FormView.addHandlerSubmit(this.submitForm);

			// Get comparison data
			await model.getLMSData(['memberships', 'accessPlans', 'groups']);
			// CREATE LMS Assets (AJAX)
			// await someMethod();
			// Send to New Page (checkout)
		} catch (err) {
			console.error(err);
		}
	},
	/** onSubmit()
	 * 1. get data
	 * 2. add to state
	 * 3. create LMS assets
	 * 4. redirect user
	 * @param {object} ev the Event
	 */
	submitForm: async function (data) {
		model.state.form = data;
		console.log('Form Submitted! Doing AJAX....');
		await model.createLMSAssets();
		// console.log('AJAX Complete! See ya later!');
		// formView.checkout();
	},
};
