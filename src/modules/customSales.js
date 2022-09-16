import { API_URL } from '../modules/utilities';

// Init
export function customSalesApp() {
	// 1. Clear Notice
	view.clearNotice();

	// 2. Load Form
	model._getCourses();
	view.showCourses(model.state.courses);

	// 3. Listen For Submit
	view.addHandlerRender(controller.submitForm);

	// 4. onSubmit (view)
	// 4a. Show Spinner (view)
	// 4b. Do AJAXing (control, model)
	// 5.
}
// Controller
const controller = {
	submitForm: function (ev) {
		ev.preventDefault();
		console.log('Submitted!');
	},
};
// MODEL

const model = {
	state: {
		courses: [],
	},
	_getCourses: async function () {
		try {
			const res = await fetch(API_URL + '/courses');
			const data = await res.json();
			const courseContainer = document.querySelector('.the-courses');
			data.forEach((el) => {
				const course = {
					id: el.id,
					link: el.permalink,
					status: el.status,
					name: el.title.rendered,
				};
				this.state.courses.push(course);
			});
			console.log(this.state);
		} catch (err) {
			alert(err);
		}
	},
};
// View
const view = {
	markup: ``,
	clearNotice: function () {
		const jsNotice = document.getElementById('custom-sales-form');
		if (!jsNotice) return;
		jsNotice.innerHTML = '';
	},
	addHandlerRender: function (handler) {
		document.addEventListener('submit', handler);
	},
	showCourses: function (courses) {
		courses.forEach((course) => {
			const courseDisplay = `
			<div class="course">
				<input type="checkbox" value="${course.id}" name="${course.name}" id="${course.name}"><label>${course.name}</label>
			</div>
			`;
			courseContainer.insertAdjacentHTML('afterbegin', courseDisplay);
		});
	},
};
