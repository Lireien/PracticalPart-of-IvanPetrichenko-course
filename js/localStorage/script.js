'use strict';

// localStorage.setItem('number', 5);
// localStorage.removeItem('number');
// console.log(localStorage.getItem('number'));

const checkboxElement = document.querySelector('#checkbox');
const formElement = document.querySelector('form');
const changeBtnElement = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {
  checkboxElement.checked = true;
}
if (localStorage.getItem('bg') === 'changed') {
  formElement.style.backgroundColor = 'red';
}

changeBtnElement.addEventListener('click', () => {
  if (localStorage.getItem('bg') === 'changed') {
    localStorage.removeItem('bg');
    formElement.style.backgroundColor = '#fff';
  } else {
    localStorage.setItem('bg', 'changed');
    formElement.style.backgroundColor = 'red';
  }
});

checkboxElement.addEventListener('change', () => {
  localStorage.setItem('isChecked', true);
});

const person = {
  name: 'Alex',
  age: 25,
};

const serializedPerson = JSON.stringify(person);
localStorage.setItem('Alex', serializedPerson);

console.log(localStorage.getItem('Alex'));
