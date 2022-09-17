import {
	API_URL,
	getElById,
	getFormVal,
	querySelector,
} from '../../modules/utilities';
import * as model from './model.js';
import { formView } from './View';

// CONTROLLER
export const controller = {
	init: async function () {
		formView.clearNotice();
		try {
			// 2. Load Form
			console.log('Loading Form...');
			await model.getCourseData('courses');
			formView.showCourses(model.state.courses);

			// 3. Handle Submit
			formView.addHandlerRender(this.submitForm);

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
	submitForm: async function (ev) {
		ev.preventDefault();
		model.state.form = formView.getFormData();
		console.log('Form Submitted! Doing AJAX....');
		await model.createLMSAssets();
		// console.log('AJAX Complete! See ya later!');
		// formView.checkout();
	},
};
