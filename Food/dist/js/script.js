window.addEventListener('DOMContentLoaded', function () {
  //Tabs

  const tabContentElements = document.querySelectorAll('.tabcontent');
  const tabHeaderItemElements = document.querySelectorAll('.tabheader__item');
  const tabHeaderParentElement = document.querySelector('.tabheader');

  function hideTabContent() {
    tabContentElements.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabHeaderItemElements.forEach((item) => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabContentElements[i].classList.add('show', 'fade');
    tabContentElements[i].classList.remove('hide');
    tabHeaderItemElements[i].classList.add('tabheader__item_active');
  }

  tabHeaderParentElement.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabHeaderItemElements.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const deadline = '2021-11-30';

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
  setTimer('.timer', deadline);

  //Modal

  const modalTriggerElements = document.querySelectorAll('[data-modal]');
  const modalElement = document.querySelector('.modal');

  function closeModalHandler() {
    modalElement.classList.add('hide');
    modalElement.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModalHandler() {
    modalElement.classList.add('show');
    modalElement.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTriggerElements.forEach((el) => {
    el.addEventListener('click', openModalHandler);
  });

  modalElement.addEventListener('click', (e) => {
    if (
      e.target === modalElement ||
      e.target.getAttribute('data-close') == ''
    ) {
      closeModalHandler();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalElement.classList.contains('show')) {
      closeModalHandler();
    }
  });

  const modalTimerId = setTimeout(openModalHandler, 50000);

  function modalAfterScrollHandler() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalHandler();
      window.removeEventListener('scroll', modalAfterScrollHandler);
    }
  }

  window.addEventListener('scroll', modalAfterScrollHandler);

  //Classes

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
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> р/день</div>
      </div>  
      `;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} with status ${res.status}`);
    }

    return await res.json();
  };

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
  //       <div class="menu__item-cost">Цена:</div>
  //       <div class="menu__item-total"><span>${currentPrice}</span> р/день</div>
  //     </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //   });
  // }

  // getResource('http://localhost:3000/menu').then((data) => {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
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

  axios.get('http://localhost:3000/menu').then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
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

  // new MenuCard(
  //   'img/tabs/vegy.jpg',
  //   'vegy',
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   '.menu .container',
  //   'menu__item'
  // ).render();

  // new MenuCard(
  //   'img/tabs/elite.jpg',
  //   'elite',
  //   'Меню “Премиум”',
  //   `В меню “Премиум” мы используем
  //   не только красивый дизайн
  //   упаковки, но и качественное исполнение
  //   блюд. Красная рыба,
  //   морепродукты, фрукты -
  //   ресторанное меню без похода в
  //   ресторан!`,

  //   20,
  //   '.menu .container',
  //   'menu__item'
  // ).render();

  // new MenuCard(
  //   'img/tabs/post.jpg',
  //   'post',
  //   'Меню "Постное"',
  //   `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
  //   16,
  //   '.menu .container',
  //   'menu__item'
  // ).render();

  //Forms

  const formElements = document.querySelectorAll('form');

  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...',
  };

  formElements.forEach((item) => {
    bindPostData(item);
  });

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

      postData('http://localhost:3000/requests', json)
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
    openModalHandler();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModalHandler();
    }, 4000);
  }

  //Slider-1
  const slidesElements = document.querySelectorAll('.offer__slide');
  const sliderElement = document.querySelector('.offer__slider');
  const prevArrowEl = document.querySelector('.offer__slider-prev');
  const nextArrowEl = document.querySelector('.offer__slider-next');
  const totalSlides = document.querySelector('#total');
  const currentSlide = document.querySelector('#current');
  const slidesWrapperEl = document.querySelector('.offer__slider-wrapper');
  const slidesInnerEl = document.querySelector('.offer__slider-inner');
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
});
