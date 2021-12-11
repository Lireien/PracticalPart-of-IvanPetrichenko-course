import calculator from './modules/calculator.js';
import cards from './modules/cards.js';
import forms from './modules/forms.js';
import modal from './modules/modal.js';
import slider from './modules/slider.js';
import tabs from './modules/tabs.js';
import timer from './modules/timer.js';
import { openModalHandler } from './modules/modal.js';

window.addEventListener('DOMContentLoaded', function () {
  const modalTimerId = setTimeout(
    () => openModalHandler('.modal', modalTimerId),
    50000
  );

  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader',
    'tabheader__item_active'
  );
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2022-07-01');
  cards();
  calculator();
  forms('form', modalTimerId);
  slider({
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
