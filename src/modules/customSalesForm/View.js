import { Spinner } from 'spin.js';
import { querySelector, getElById, getFormVal } from '../utilities';

class FormView {
	#jsNotice = getElById('jsNotice');
	formContainer = getElById('custom-sales-form');
	courseContainer = querySelector('.the-courses');
	#volunteerBtns = querySelector('input[type=radio][name=volunteers', true);
	#volunteerDiv = querySelector('.licenses__volunteers');
	constructor() {
		if (!this.#jsNotice) return;
		this.#jsNotice.innerHTML = '';
		this._revealVolunteers();
	}
	renderSpinner(parentEl) {
		const opts = {
			lines: 13, // The number of lines to draw
			length: 38, // The length of each line
			width: 17, // The line thickness
			radius: 45, // The radius of the inner circle
			scale: 1, // Scales overall size of the spinner
			corners: 1, // Corner roundness (0..1)
			speed: 1, // Rounds per second
			rotate: 0, // The rotation offset
			animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000000', // CSS color or array of colors
			fadeColor: 'transparent', // CSS color or array of colors
			position: 'relative',
			shadow: '0 0 1px transparent', // Box-shadow for the lines
			zIndex: 2000000000, // The z-index (defaults to 2e9)
			className: 'spinner', // The CSS class to assign to the spinner
		};
		const spinner = new Spinner(opts).spin(parentEl);
	}
	/**
	 * Listen for `submit` event and passes the value of `getFormData()` to the callback function
	 * @param {function} handler the callback function to fire
	 * @return {json} user-submitted form data from `getFormData()`
	 */
	addHandlerSubmit(handler) {
		this.formContainer.addEventListener('submit', (ev) => {
			ev.preventDefault();
			console.log('Form Submitted!');
			handler(this.getFormData());
			// handler(this._getFormDatav2());
		});
	}
	/** Show/Hide Volunteer count based on user input */
	_revealVolunteers() {
		this.#volunteerBtns.forEach((el) =>
			el.addEventListener('change', (ev) => {
				if (!ev.target.value) return;
				if (ev.target.value === 'False')
					this.#volunteerDiv.classList.add('hidden');
				if (ev.target.value === 'True')
					this.#volunteerDiv.classList.remove('hidden');
			}),
		);
	}
	showCourses(courses) {
		this.courseContainer.innerHTML = '';
		console.log('Course Container Cleared!');
		courses.forEach((course) => {
			const courseDisplay = `
			<div class="course">
				<input type="checkbox" value="${course.id}" name="${course.name}" id="${course.name}"><label for="${course.name}">${course.name}</label>
			</div>
			`;
			this.courseContainer.insertAdjacentHTML('afterbegin', courseDisplay);
		});
		console.log(`Form loaded!`);
	}

	/** Callback onSubmit()
	 * @return {json} obj of data
	 */
	getFormData() {
		const form = {
			user: {},
			org: {
				employees: {},
				volunteers: {},
				get total() {
					return this.employees.ft + this.employees.pt + this.volunteers;
				},
			},
			courses: {
				ids: [],
			},
		};
		// get Form Data
		form.user.firstName = getFormVal('user-first-name');
		form.user.lastName = getFormVal('user-last-name');
		form.user.email = getFormVal('user-email');
		form.org.type = getFormVal('org-type');
		form.org.name = getFormVal('org-name');
		form.org.employees.ft = parseInt(getFormVal('employee--full'));
		form.org.employees.pt = parseInt(getFormVal('employee--part'));
		form.org.volunteers = parseInt(getFormVal('volunteers'));
		const theCourses = querySelector('.course', true);

		theCourses.forEach((el) => {
			const courseName = el.querySelector('label').textContent;
			const courseID = getElById(courseName);
			if (courseID.checked) form.courses.ids.push(+courseID.value);
		});
		return form;
	}
	_getFormDatav2() {
		const data = [...new FormData(this.formContainer)];
		return data;
	}
	checkout(link) {
		window.location.href = link;
	}
}
export default new FormView();
