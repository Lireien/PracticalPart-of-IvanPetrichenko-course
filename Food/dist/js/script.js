window.addEventListener('DOMContentLoaded', () => {
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
});
