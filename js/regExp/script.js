'use strict';

// new RegExp ('pattern', 'flags');
// /pattern/f

const ans = prompt('Введите Ваше имя');

const reg = /n/i;

//classes
// \d - digits,
// \w - words,
//\s - spaces
//\D - not digits,
//\W - not words


//flags
// i - независимо от регистра,
// g - найти несколько вхождений
// m - многострочный режим

console.log(ans.search(reg));
console.log(ans.match(reg));

const pass = prompt('Passwors');
console.log(pass.replace(/./g, '*')); 

console.log('12-34-56'.replace(/-/g, ':')); //заменит все - на :
