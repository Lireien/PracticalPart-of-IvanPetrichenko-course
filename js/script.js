// Написать функцию flattenAndSort(arr), которая принимает в качестве аргумент двумерный массив, состоящих из чисел. Функция возвращает отсортированный сведенный одномерный массив. Пример:
// [[3, 2, 1], [4, 6, 5], [], [9, 7, 8]] => [1, 2, 3, 4, 5, 6, 7, 8, 9]

// const arr = [[3, 2, 1], [4, 6, 5], [], [9, 7, 8]];
// const [firstEl, , secondEl] = arr;
// console.log(
//   firstEl, secondEl
// );
// function flattenAndSort(arr) {
//   let newArr = arr.flat();
//   console.log(newArr);
//   return newArr.sort(function(a,b) {
//     return a - b;
//   });

  
// }
// console.log(flattenAndSort(arr));


// Написать ф-ю, с помощью которой можно будет делать ф-ю прибавления числа
// const addTwo = sumFn(2);
// addTwo(5) -> 7

function sumFn (n) {
  return function(x) {
    return x + n;
  };
}
let addTwo = sumFn(8);
console.log(addTwo(6));