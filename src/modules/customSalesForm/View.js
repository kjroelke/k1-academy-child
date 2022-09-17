import { querySelector, getElById, getFormVal } from '../utilities';

export const formView = {
	loggedIn: querySelector('body.logged-in'),
	jsNotice: getElById('jsNotice'),
	formContainer: getElById('custom-sales-form'),
	courseContainer: querySelector('.the-courses'),
	clearNotice: function () {
		if (!this.jsNotice) return;
		this.jsNotice.innerHTML = '';
		if (!this.loggedIn) {
			this.formContainer.innerHTML = `<span class="alert">You must be logged in to continue.</span>`;
		}
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
			this.courseContainer.insertAdjacentHTML('afterbegin', courseDisplay);
		});
	},
	/** Callback onSubmit()
	 * @return {json} obj of data
	 */
	getFormData: function () {
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
		form.org.employees.ft = getFormVal('employee--full');
		form.org.employees.pt = getFormVal('employee--part');
		form.org.volunteers = getFormVal('volunteers');
		const theCourses = querySelector('.course', true);

		theCourses.forEach((el) => {
			const courseName = el.querySelector('label').textContent;
			const courseID = getElById(courseName);
			if (courseID.checked) form.courses.ids.push(+courseID.value);
		});
		return form;
	},
	checkout: function (id) {
		window.location.href = `https://academy.kingdomone.co/checkout/?=${id}`;
	},
};
