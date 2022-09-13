const courses = [];
const markup = ``;
export function customsales() {
	const notice = document.getElementById('custom-sales-form');
	notice.innerHTML = '';
	getCourses();
	document.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log('Submitted!');
	});
}
async function getCourses() {
	try {
		const res = await fetch('https://k1academy.local/wp-json/llms/v1/courses');
		const data = await res.json();
		console.log(data);
		const courseContainer = document.querySelector('.the-courses');
		data.forEach((el) => {
			const course = {
				id: el.id,
				link: el.permalink,
				status: el.status,
				name: el.title.rendered,
			};
			courses.push(course);
			const courseDisplay = `
			<div class="course">
				<input type="checkbox" value="${course.id}" name="${course.name}" id="${course.name}"><label>${course.name}</label>
			</div>
			`;
			courseContainer.insertAdjacentHTML('afterbegin', courseDisplay);
		});
	} catch (err) {
		alert(err);
	}
}
