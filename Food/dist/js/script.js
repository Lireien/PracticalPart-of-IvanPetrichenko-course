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
    const hours = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000 / 60 / 60) % 24);
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
  const modalCloseButtonEl = document.querySelector('[data-close]');

  function closeModalHandler() {
    modalElement.classList.toggle('show');
    document.body.style.overflow = '';
    clearInterval(modalTimerId);
  }

  function openModalHandler() {
    modalElement.classList.toggle('show');
    document.body.style.overflow = 'hidden';
  }

  modalTriggerElements.forEach((el) => {
    el.addEventListener('click', openModalHandler);
  });

  modalCloseButtonEl.addEventListener('click', closeModalHandler);

  modalElement.addEventListener('click', (e) => {
    if (e.target === modalElement) {
      closeModalHandler();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalElement.classList.contains('show')) {
      closeModalHandler();
    }
  });

  const modalTimerId = setTimeout(openModalHandler, 5000);

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
});
