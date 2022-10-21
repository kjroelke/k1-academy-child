import { querySelector, getElById, getFormVal } from '../utilities';
import { formMarkup as form } from '../customSalesForm/formMarkup';

class FormView {
	#appContainer = getElById('app');
	formContainer;
	courseContainer;
	#volunteerBtns;
	#volunteerDiv;
	constructor() {
		if (!this.#appContainer) return;
		this.#appContainer.innerHTML = this.#renderSpinner();
	}
	#renderSpinner() {
		return `<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div><span style="text-align:center;margin:1rem auto;display:block;">Loading Form...</span>`;
	}
	/**
	 * Listen for `submit` event and passes the value of `getFormData()` to the callback function
	 * @param {function} handler the callback function to fire
	 * @return {json} user-submitted form data from `getFormData()`
	 */
	addHandlerSubmit(handler) {
		this.formContainer.addEventListener('submit', (ev) => {
			ev.preventDefault();
			handler(this.getFormData());
			this.formContainer.innerHTML = this.#renderSpinner();
			// const error = setTimeout(this.#errorMessage(this.formContainer), 5000);
		});
		// handler(this._getFormDatav2());
	}

	#errorMessage(parentEl) {
		parentEl.innerHTML = `Something went wrong. Please try again later or contact <a href="mailto:hello@kingdomone.co">hello@kingdomone.co</a> for help.`;
	}
	/** Show/Hide Volunteer count based on user input */
	#revealVolunteers() {
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
		this.#appContainer.innerHTML = form;
		this.formContainer = getElById('custom-sales-form');
		this.courseContainer = querySelector('.the-courses');
		this.#volunteerBtns = querySelector(
			'input[type=radio][name=volunteers',
			true,
		);
		this.#volunteerDiv = querySelector('.licenses__volunteers');

		courses.forEach((course) => {
			const courseDisplay = `
			<div class="course">
				<input type="checkbox" value="${course.id}" name="${course.name}" id="${course.name}"><div class="course__info"><label for="${course.name}"><h3 class="course__info--title">${course.name}</h3><span class="course__info--excerpt">${course.excerpt.rendered}</span></label></div>
			</div>
			`;
			this.courseContainer.insertAdjacentHTML('afterbegin', courseDisplay);
		});
		this.#revealVolunteers();
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
			const courseName = el.querySelector('.course__info--title').textContent;
			const courseID = getElById(courseName);
			if (courseID.checked) form.courses.ids.push(+courseID.value);
		});
		return form;
	}
	#getFormDatav2() {
		const data = [...new FormData(this.formContainer)];
		return data;
	}
	checkout(link) {
		window.location.href = link;
	}
}
export default new FormView();
