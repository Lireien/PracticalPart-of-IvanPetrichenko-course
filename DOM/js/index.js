/* Задания на урок:
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const advElements = document.querySelectorAll('.promo__adv img');
  const posterElement = document.querySelector('.promo__bg');
  const genreElement = posterElement.querySelector('.promo__genre');
  const interactiveListElement = document.querySelector(
    '.promo__interactive-list'
  );
  const addingFormElement = document.querySelector('form.add');
  const formInputElement = addingFormElement.querySelector('.adding__input');
  const formCheckboxElement =
    addingFormElement.querySelector('[type="checkbox"]');

  addingFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let newFilm = formInputElement.value;
    let favFilm = formCheckboxElement.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`;
      }
      movieDB.movies.push(newFilm);
      movieDB.movies.sort();
      sortArr(movieDB.movies);
      formInputElement.value = '';
      createMovieList(movieDB.movies, interactiveListElement);
    }
    if (favFilm) {
      console.log('Добавляем любимый фильм');
    }
    console.log(movieDB);
  });

  const movieDB = {
    movies: [
      'Логан',
      'Лига справедливости',
      'Ла-ла лэнд',
      'Одержимость',
      'Скотт Пилигрим против...',
    ],
  };

  const deleteAdv = (arr) => {
    arr.forEach((item) => {
      item.remove();
    });
  };

  const makeChanges = () => {
    genreElement.textContent = 'Драма';
    posterElement.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => {
    arr.sort();
  };

  function createMovieList(movies, parent) {
    interactiveListElement.innerHTML = '';
    sortArr(movies);

    movies.forEach((movie, i) => {
      parent.innerHTML += `
                <li class="promo__interactive-item">
                  ${i + 1}. ${movie}
                  <div class="delete"></div>
                </li>
  `;
    });
    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        console.log(e.target);
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMovieList(movies, parent);
      });
    });
  }

  deleteAdv(advElements);
  makeChanges();
  createMovieList(movieDB.movies, interactiveListElement);
});
