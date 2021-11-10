const btnElement = document.querySelector('.btn');
let timerId;
let count = 0;

function myAnimation() {
  const element = document.querySelector('.box');
  let position = 0;
  let movingBack = false;

  const id = setInterval(frame, 20);
  function frame() {
    if (position == 0) {
      movingBack = true;
    } else if (position == 300) {
      movingBack = false;
    }
    if (movingBack) {
      position++;
      element.style.top = position + 'px';
      element.style.left = position + 'px';
    } else {
      position --;
      element.style.top = position + 'px';
      element.style.left = position + 'px';
    }
  }
}
btnElement.addEventListener('click', myAnimation);

// btnElement.addEventListener('click', () => {
//   //timerId = setTimeout(logger, 2000);
//   timerId = setInterval(logger, 2000);
// });

// function logger() {
//   if (count === 3) {
//     clearInterval(timerId);
//   }
//   console.log('text');
//   count++;
// }

// recursive setTimeout

// let id = setTimeout(function log() {
//   console.log('recursion');
//   id = setTimeout(log, 1000);
// }, 1000);
