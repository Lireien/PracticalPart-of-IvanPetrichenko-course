function closeModalHandler(modalSelector) {
  const modalElement = document.querySelector(modalSelector);
  modalElement.classList.add('hide');
  modalElement.classList.remove('show');
  document.body.style.overflow = '';
}

function openModalHandler(modalSelector, modalTimerId) {
  const modalElement = document.querySelector(modalSelector);
  modalElement.classList.add('show');
  modalElement.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal

  const modalTriggerElements = document.querySelectorAll(triggerSelector);
  const modalElement = document.querySelector(modalSelector);

  modalTriggerElements.forEach((el) => {
    el.addEventListener('click', () =>
      openModalHandler(modalSelector, modalTimerId)
    );
  });

  modalElement.addEventListener('click', (e) => {
    if (
      e.target === modalElement ||
      e.target.getAttribute('data-close') == ''
    ) {
      closeModalHandler(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalElement.classList.contains('show')) {
      closeModalHandler(modalSelector);
    }
  });

  function modalAfterScrollHandler() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModalHandler(modalSelector, modalTimerId);
      window.removeEventListener('scroll', modalAfterScrollHandler);
    }
  }

  window.addEventListener('scroll', modalAfterScrollHandler);
}

export default modal;
export { closeModalHandler };
export { openModalHandler };
