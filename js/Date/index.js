'use strict';

//getters
// console.log(now.getFullYear());
// console.log(now.getMonth());
// console.log(now.getDate());
// console.log(now.getDay());
// console.log(now.getHours());
// console.log(now.getUTCHours());
// console.log(now.getTimezoneOffset());
// console.log(now.getTime());
const now = new Date();
//setters
console.log(now.setHours(18, 55)); //UTC
//new Date.parse('2021-11-10'); = new Date('2021-11-10');

let start = new Date();

for (let i = 0; i < 10000000; i++) {
  let some = i ** i;
}

let end = new Date ();

console.log(`Circle finished in ${end - start} mileseconds`);