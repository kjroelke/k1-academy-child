/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/customSales.js":
/*!************************************!*\
  !*** ./src/modules/customSales.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customSalesApp": () => (/* binding */ customSalesApp)
/* harmony export */ });
// Init
function customSalesApp() {
  // 1. Clear Notice
  view.clearNotice(); // 2. Load Form

  model._getCourses();

  view.showCourses(model.state.courses); // 3. Listen For Submit

  view.addHandlerRender(controller.submitForm); // 4. onSubmit (view)
  // 4a. Show Spinner (view)
  // 4b. Do AJAXing (control, model)
  // 5.
} // Controller

const controller = {
  submitForm: function (ev) {
    ev.preventDefault();
    console.log('Submitted!');
  }
}; // MODEL

const model = {
  state: {
    courses: []
  },
  _getCourses: async function () {
    try {
      const res = await fetch('https://k1academy.local/wp-json/llms/v1/courses');
      const data = await res.json();
      const courseContainer = document.querySelector('.the-courses');
      data.forEach(el => {
        const course = {
          id: el.id,
          link: el.permalink,
          status: el.status,
          name: el.title.rendered
        };
        this.state.courses.push(course);
      });
      console.log(this.state);
    } catch (err) {
      alert(err);
    }
  }
}; // View

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
    courses.forEach(course => {
      const courseDisplay = `
			<div class="course">
				<input type="checkbox" value="${course.id}" name="${course.name}" id="${course.name}"><label>${course.name}</label>
			</div>
			`;
      courseContainer.insertAdjacentHTML('afterbegin', courseDisplay);
    });
  }
};

/***/ }),

/***/ "./src/modules/studentDashboard.js":
/*!*****************************************!*\
  !*** ./src/modules/studentDashboard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dashboardControl": () => (/* binding */ dashboardControl)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/modules/utilities.js");

function dashboardControl() {
  const navItems = (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.querySelector)('.llms-sd-item', true);
  navItems.forEach((el, i) => {
    if (el.children.length < 1) return;
    el.children[1].style.display = 'none';
  });
}

/***/ }),

/***/ "./src/modules/utilities.js":
/*!**********************************!*\
  !*** ./src/modules/utilities.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myCopyright": () => (/* binding */ myCopyright),
/* harmony export */   "querySelector": () => (/* binding */ querySelector)
/* harmony export */ });
/** Shorthand for Query Selector Function.
 * @param selector {string} CSS Selector. Must include class ('.') marker if needed
 * @param  [all] {boolean} optional to call querySelectorAll.
 * @return {Element} HTML Element
 * */
function querySelector(selector) {
  let all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return all === false ? document.querySelector(selector) : document.querySelectorAll(selector);
}
/** Outputs Copyright String to `div` with ID of 'copyright'
 * @param {string} brandName - The name of the brand that claims copyright
 * @output The HTML
 */

function myCopyright(brandName) {
  const copyright = document.getElementById('copyright');
  const thisYear = new Date().getFullYear();
  copyright.innerHTML = `<p>&copy; ${thisYear} ${brandName} All Rights Reserved.`;
}

/***/ }),

/***/ "./sass/main.scss":
/*!************************!*\
  !*** ./sass/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ "./sass/main.scss");
/* harmony import */ var _modules_customSales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/customSales */ "./src/modules/customSales.js");
/* harmony import */ var _modules_studentDashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/studentDashboard */ "./src/modules/studentDashboard.js");
/* harmony import */ var _modules_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/utilities */ "./src/modules/utilities.js");





function init() {
  (0,_modules_utilities__WEBPACK_IMPORTED_MODULE_3__.myCopyright)('Kingdom One');
  (0,_modules_studentDashboard__WEBPACK_IMPORTED_MODULE_2__.dashboardControl)();
  if (window.location.pathname === '/sales/') (0,_modules_customSales__WEBPACK_IMPORTED_MODULE_1__.customSalesApp)();
}

init();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map