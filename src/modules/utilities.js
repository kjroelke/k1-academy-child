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

/** Outputs Copyright String to `div` with ID of 'copyright'
 * @param {string} brandName - The name of the brand that claims copyright
 * @output The HTML
 */
export function myCopyright(brandName) {
	const copyright = document.getElementById('copyright');
	const thisYear = new Date().getFullYear();
	copyright.innerHTML = `<p>&copy; ${thisYear} ${brandName} All Rights Reserved.`;
}
