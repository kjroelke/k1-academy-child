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
			// await model.getLMSData(['memberships', 'accessPlans', 'groups']);
		} catch (err) {
			console.error(err);
		}
	},
	/** onSubmit()
	 * 1. add data to model.state
	 * 3. create LMS assets
	 * 4. redirect user
	 * @param {object} data the data
	 */
	submitForm: async function (data) {
		model.state.form = { ...data };
		try {
			console.log('Creating assets...');
			await model.createLMSAssets();
		} catch (err) {
			console.error(err);
		}
		// console.log('AJAX Complete! See ya later!');
		// formView.checkout();
	},
};
