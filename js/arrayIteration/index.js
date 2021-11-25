'use strict';

//filter

const names = ['Ivan', 'Ann', 'Julianna', 'Katerina'];

const shortNames = names.filter((name) => {
  return name.length < 5;
});

console.log(shortNames);

// map
const answers = ['iVAN', 'AnN', 'JuliaNNA'];

const result = answers.map((item) => item.toLowerCase());
console.log(result);

//every/some

const some = [4, 'qwq', 'fcca'];
const every = [4, 1, 3455];

console.log(some.some((item) => typeof item === 'number'));
console.log(some.every((item) => typeof item === 'number'));
console.log(every.every((item) => typeof item === 'number'));

// reduce

const arr = [4, 5, 1, 3, 2, 6];

const res = arr.reduce((sum, current) => sum + current);
console.log(res);

const strArr = ['apple', 'pear', 'plum'];
const newStr = strArr.reduce((sum, current) => `${sum}, ${current}`);
console.log(newStr);

//example

const obj = {
  ana: 'persone',
  dia: 'persone',
  dog: 'animal',
  cat: 'animal',
};

const newArr = Object.entries(obj)
  .filter((elem) => elem[1] === 'persone')
  .map((item) => item[0]);
console.log(newArr);
