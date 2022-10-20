import {
	API_URL,
	getElById,
	getFormVal,
	querySelector,
} from '../../modules/utilities';
import model from './model';
import FormView from './View';

// CONTROLLER
export const controller = {
	init: async function () {
		try {
			// 1. Get Data Form
			await model.getCourseData('courses');

			// 2. Show Form
			FormView.showCourses(model.state.courses);

			// 3. Handle Submit
			FormView.addHandlerSubmit(this.submitForm);
		} catch (err) {
			console.error(err);
		}
	},
	/** onSubmit()
	 * 1. add data to model.state
	 * 2. create LMS assets
	 * 3. redirect user
	 * @param {object} data the data
	 */
	submitForm: async function (data) {
		model.state.form = { ...data };
		try {
			// 1. Send Data
			await model.createLMSAssets();

			// 2. Redirect to Checkout Page
			FormView.checkout(model.state.accessPlan.permalink);
		} catch (err) {
			console.error(err);
		}
	},
};
