export default function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  //Tabs

  const tabContentElements = document.querySelectorAll(tabsContentSelector);
  const tabHeaderItemElements = document.querySelectorAll(tabsSelector);
  const tabHeaderParentElement = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContentElements.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabHeaderItemElements.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContentElements[i].classList.add('show', 'fade');
    tabContentElements[i].classList.remove('hide');
    tabHeaderItemElements[i].classList.add(activeClass);
  }

  tabHeaderParentElement.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabHeaderItemElements.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
