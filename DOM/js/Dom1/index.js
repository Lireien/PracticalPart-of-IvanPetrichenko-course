/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const advElements = document.querySelectorAll('.promo__adv img');
const posterElement = document.querySelector('.promo__bg');
const genreElement = posterElement.querySelector('.promo__genre');
const interactiveListElement = document.querySelector(
  '.promo__interactive-list'
);

advElements.forEach((item) => {
  item.remove();
});

genreElement.textContent = 'Драма';
posterElement.style.backgroundImage = 'url("img/bg.jpg")';

interactiveListElement.innerHTML = '';

const movieDB = {
  movies: [
    'Логан',
    'Лига справедливости',
    'Ла-ла лэнд',
    'Одержимость',
    'Скотт Пилигрим против...',
  ],
};

movieDB.movies.sort();
movieDB.movies.forEach((movie, i) => {
  interactiveListElement.innerHTML += `
<li class="promo__interactive-item">
                ${i + 1}. ${movie}
                <div class="delete"></div>
              </li>
`;
});
