/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/js/modules/calculator.js":
/*!***************************************!*\
  !*** ./dist/js/modules/calculator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculator)
/* harmony export */ });
function calculator() {
  //Calculator

  const resultElement = document.querySelector('.calculating__result span');
  let gender, height, weight, age, ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = ' female';
    localStorage.setItem('gender', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('gender')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function calcCalories() {
    if (!gender || !height || !weight || !age || !ratio) {
      resultElement.textContent = '____ ';
      return;
    }

    if ((gender = 'female')) {
      resultElement.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      resultElement.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcCalories();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          gender = e.target.getAttribute('id');
          localStorage.setItem('gender', e.target.getAttribute('id'));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcCalories();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation(
    '.calculating__choose_big div',
    'calculating__choose-item_active'
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcCalories();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}


/***/ }),

/***/ "./dist/js/modules/cards.js":
/*!**********************************!*\
  !*** ./dist/js/modules/cards.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.js */ "./dist/js/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, desc, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 2.56;
      this.changeCurrency();
    }
    changeCurrency() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `      
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">
        ${this.desc}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">????????:</div>
        <div class="menu__item-total"><span>${this.price}</span> ??/????????</div>
      </div>  
      `;
      this.parent.append(element);
    }
  }

  // getResource('http://localhost:3000/menu').then((data) => createCard(data));

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement('div');
  //     const currentPrice = price * 2.56;

  //     element.classList.add('menu__item');

  //     element.innerHTML = `
  //     <img src=${img} alt=${altimg} />
  //     <h3 class="menu__item-subtitle">${title}</h3>
  //     <div class="menu__item-descr">
  //       ${descr}
  //     </div>
  //     <div class="menu__item-divider"></div>
  //     <div class="menu__item-price">
  //       <div class="menu__item-cost">????????:</div>
  //       <div class="menu__item-total"><span>${currentPrice}</span> ??/????????</div>
  //     </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //   });
  // }

  (0,_services_services_js__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container'
      ).render();
    });
  });

  // axios.get('http://localhost:3000/menu').then((data) => {
  //   data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       '.menu .container'
  //     ).render();
  //   });
  // });

  // new MenuCard(
  //   'img/tabs/vegy.jpg',
  //   'vegy',
  //   '???????? "????????????"',
  //   '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!',
  //   9,
  //   '.menu .container',
  //   'menu__item'
  // ).render();

  // new MenuCard(
  //   'img/tabs/elite.jpg',
  //   'elite',
  //   '???????? ????????????????????',
  //   `?? ???????? ???????????????????? ???? ????????????????????
  //   ???? ???????????? ???????????????? ????????????
  //   ????????????????, ???? ?? ???????????????????????? ????????????????????
  //   ????????. ?????????????? ????????,
  //   ????????????????????????, ???????????? -
  //   ?????????????????????? ???????? ?????? ???????????? ??
  //   ????????????????!`,

  //   20,
  //   '.menu .container',
  //   'menu__item'
  // ).render();

  // new MenuCard(
  //   'img/tabs/post.jpg',
  //   'post',
  //   '???????? "??????????????"',
  //   `???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????.`,
  //   16,
  //   '.menu .container',
  //   'menu__item'
  // ).render();
}


/***/ }),

/***/ "./dist/js/modules/forms.js":
/*!**********************************!*\
  !*** ./dist/js/modules/forms.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./dist/js/modules/modal.js");
/* harmony import */ var _services_services_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services.js */ "./dist/js/services/services.js");



function forms(formSelector, modalTimerId) {
  //Forms

  const formElements = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/spinner.svg',
    success: '??????????????! ?????????? ???? ?? ???????? ????????????????!',
    failure: '??????-???? ?????????? ???? ??????...',
  };

  formElements.forEach((item) => {
    bindPostData(item);
  });

  

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display:block;
      margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      (0,_services_services_js__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      // xhr.addEventListener('load', () => {
      //   if (xhr.status === 200) {
      //     console.log(xhr.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModalHandler)('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>??</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModalHandler)('.modal');
    }, 4000);
  }
}


/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModalHandler": () => (/* binding */ closeModalHandler),
/* harmony export */   "openModalHandler": () => (/* binding */ openModalHandler)
/* harmony export */ });
function closeModalHandler(modalSelector) {
  const modalElement = document.querySelector(modalSelector);
  modalElement.classList.add('hide');
  modalElement.classList.remove('show');
  document.body.style.overflow = '';
}

function openModalHandler(modalSelector, modalTimerId) {
  const modalElement = document.querySelector(modalSelector);
  modalElement.classList.add('show');
  modalElement.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal

  const modalTriggerElements = document.querySelectorAll(triggerSelector);
  const modalElement = document.querySelector(modalSelector);

  modalTriggerElements.forEach((el) => {
    el.addEventListener('click', () =>
      openModalHandler(modalSelector, modalTimerId)
    );
  });

  modalElement.addEventListener('click', (e) => {
    if (
      e.target === modalElement ||
      e.target.getAttribute('data-close') == ''
    ) {
      closeModalHandler(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalElement.classList.contains('show')) {
      closeModalHandler(modalSelector);
    }
  });

  function modalAfterScrollHandler() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalHandler(modalSelector, modalTimerId);
      window.removeEventListener('scroll', modalAfterScrollHandler);
    }
  }

  window.addEventListener('scroll', modalAfterScrollHandler);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCouter,
  currentCounter,
  wrapper,
  field,
}) {
  //Slider-1
  const slidesElements = document.querySelectorAll(container);
  const sliderElement = document.querySelector(slide);
  const prevArrowEl = document.querySelector(prevArrow);
  const nextArrowEl = document.querySelector(nextArrow);
  const totalSlides = document.querySelector(totalCouter);
  const currentSlide = document.querySelector(currentCounter);
  const slidesWrapperEl = document.querySelector(wrapper);
  const slidesInnerEl = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapperEl).width;

  let slideIndex = 1;
  let offset = 0;

  if (slidesElements.length < 10) {
    totalSlides.textContent = `0${slidesElements.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    totalSlides.textContent = slidesElements.length;
    currentSlide.textContent = slideIndex;
  }

  slidesInnerEl.style.width = 100 * slidesElements.length + '%';
  slidesInnerEl.style.display = 'flex';
  slidesInnerEl.style.transition = '0.5s all';

  slidesWrapperEl.style.overflow = 'hidden';

  slidesElements.forEach((slide) => {
    slide.style.width = width;
  });

  sliderElement.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  sliderElement.append(indicators);

  for (let i = 0; i < slidesElements.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  function addZeroToSlider() {
    if (slideIndex < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }
  }
  function wichDotIsActive() {
    dots.forEach((dot) => {
      dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = 1;
  }

  nextArrowEl.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slidesElements.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesInnerEl.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slidesElements.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZeroToSlider();

    wichDotIsActive();
  });

  prevArrowEl.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slidesElements.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesInnerEl.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slidesElements.length;
    } else {
      slideIndex--;
    }

    addZeroToSlider();

    wichDotIsActive();
  });

  dots.forEach((dot) =>
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesInnerEl.style.transform = `translateX(-${offset}px)`;

      addZeroToSlider();
      wichDotIsActive();
    })
  );

  // showSlides(slideIndex);

  // if (slidesElements.length < 10) {
  //   totalSlides.textContent = `0${slidesElements.length}`;
  // } else {
  //   totalSlides.textContent = slidesElements.length;
  // }

  // function showSlides(n) {
  //   if (n > slidesElements.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slidesElements.length;
  //   }

  //   slidesElements.forEach((slide) => {
  //     slide.classList.add('hide');
  //   });

  //   slidesElements[slideIndex - 1].classList.remove('hide');
  //   slidesElements[slideIndex - 1].classList.add('show');

  //   if (slidesElements.length < 10) {
  //     currentSlide.textContent = `0${slideIndex}`;
  //   } else {
  //     currentSlide.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prevArrowEl.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // nextArrowEl.addEventListener('click', () => {
  //   plusSlides(1);
  // });
}


/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  //Tabs

  const tabContentElements = document.querySelectorAll(tabsContentSelector);
  const tabHeaderItemElements = document.querySelectorAll(tabsSelector);
  const tabHeaderParentElement = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContentElements.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabHeaderItemElements.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContentElements[i].classList.add('show', 'fade');
    tabContentElements[i].classList.remove('hide');
    tabHeaderItemElements[i].classList.add(activeClass);
  }

  tabHeaderParentElement.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabHeaderItemElements.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}


/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function timer(id, deadline) {
  //Timer

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor(((t / 1000) * 60 * 60) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function addZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setTimer(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setTimer(id, deadline);
}


/***/ }),

/***/ "./dist/js/services/services.js":
/*!**************************************!*\
  !*** ./dist/js/services/services.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });

  return await res.json();
};
const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} with status ${res.status}`);
  }

  return await res.json();
};





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
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator.js */ "./dist/js/modules/calculator.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards.js */ "./dist/js/modules/cards.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms.js */ "./dist/js/modules/forms.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal.js */ "./dist/js/modules/modal.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider.js */ "./dist/js/modules/slider.js");
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs.js */ "./dist/js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer.js */ "./dist/js/modules/timer.js");









window.addEventListener('DOMContentLoaded', function () {
  const modalTimerId = setTimeout(
    () => (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModalHandler)('.modal', modalTimerId),
    50000
  );

  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_5__["default"])(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader',
    'tabheader__item_active'
  );
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-07-01');
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_calculator_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slide',
    slide: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCouter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map