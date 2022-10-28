/** Shorthand for Query Selector Function.
 * @param selector {string} CSS Selector. Must include class ('.') marker if needed
 * @param  [all] {boolean} optional to call querySelectorAll.
 * @return {Element} HTML Element
 * */
export function querySelector(selector, all = false) {
	return all === false
		? document.querySelector(selector)
		: document.querySelectorAll(selector);
}

export function getElById(selector) {
	return document.getElementById(selector);
}
export function getFormVal(selector) {
	return document.getElementById(selector).value;
}
/** Outputs Copyright String to `div` with ID of 'copyright'
 * @param {string} brandName - The name of the brand that claims copyright
 * @output The HTML
 */
export function myCopyright(brandName) {
	const copyright = document.getElementById('copyright');
	copyright.innerHTML = `<p>&copy; ${k1AcademyData.year} ${brandName} All Rights Reserved.`;
}

export const API_URL = `${k1AcademyData.root_url}/wp-json/llms/v1/`;

/** Checks url to determine environmet and returns the appropriate API key/secret as an array
 * @return {array} [key,secret]
 */
function apiControl() {
	const env = window.location.href;
	let apiKey, apiSecret;
	if (env.includes('.local')) {
		console.log('local env');
		apiKey = process.env.API_KEY_LOCAL;
		apiSecret = process.env.API_SECRET_LOCAL;
	} else if (env.includes('stg.wpengine')) {
		console.log('staging env');
		apiKey = process.env.API_KEY_STAGING;
		apiSecret = process.env.API_SECRET_STAGING;
	} else if (env.includes('academy.kingdomone.')) {
		console.log('production env');
		apiKey = process.env.API_KEY;
		apiSecret = process.env.API_SECRET;
	}
	return [apiKey, apiSecret];
}
const api = apiControl();

/**
 * Makes AJAX request to LMS API. Also converts `'accessPlans'` to HTML-friedly `'access-plans.'`
 * @param {string} endpoint the endpoint url to add. *Note: should not include leading '/'*
 * @param {string} method the AJAX Method (GET, POST, DELETE, UPDATE)
 * @param {boolean} returnAll if `true`, returns an Array, else only return the `data`
 * @returns {Array|Object} `data` object or an Array containing [AJAX `res`ponse, The `data`, The `method`]
 */
export async function makeRequest(
	endpoint,
	method = 'GET',
	theData = false,
	returnAll = false,
) {
	// endpoint = endpoint === 'accessPlans' ? 'access-plans' : endpoint;
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'X-LLMS-CONSUMER-KEY': api[0],
				'X-LLMS-CONSUMER-SECRET': api[1],
			},
			method: `${method}`,
			timeout: 5000,
		};
		if (theData) config.body = JSON.stringify(theData);

		const res = await fetch(API_URL + `${endpoint}`, config);
		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		const data = await res.json();
		return returnAll ? [res, data, method] : data;
	} catch (error) {
		console.error(err);
	}
}

const Google = require('google-api-wrapper');

async function main() {
	Google.loadCredFile('../../buoyant-nectar-366611-0816404e4361.json');
	// Google.loadTokenFile('/path/to/token.json');
	const Sheet = Google.getSheet();
	const rows = await Sheet.read('1N18vFBkeo7PH6jNJc791I07vrZdMYYKOg1o5qrRIITA');
	console.log(rows);
}

main();
// export async function updateGoogle() {
// 	try {
// 		const url = `https://sheets.googleapis.com/v4/spreadsheets/1N18vFBkeo7PH6jNJc791I07vrZdMYYKOg1o5qrRIITA`;
// 		const res = await fetch(url);
// 		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
// 		const data = await res.json();
// 		return returnAll ? [res, data, method] : data;
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
// updateGoogle();
