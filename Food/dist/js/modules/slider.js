export default function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCouter,
  currentCounter,
  wrapper,
  field,
}) {
  //Slider-1
  const slidesElements = document.querySelectorAll(container);
  const sliderElement = document.querySelector(slide);
  const prevArrowEl = document.querySelector(prevArrow);
  const nextArrowEl = document.querySelector(nextArrow);
  const totalSlides = document.querySelector(totalCouter);
  const currentSlide = document.querySelector(currentCounter);
  const slidesWrapperEl = document.querySelector(wrapper);
  const slidesInnerEl = document.querySelector(field);
  const width = window.getComputedStyle(slidesWrapperEl).width;

  let slideIndex = 1;
  let offset = 0;

  if (slidesElements.length < 10) {
    totalSlides.textContent = `0${slidesElements.length}`;
    currentSlide.textContent = `0${slideIndex}`;
  } else {
    totalSlides.textContent = slidesElements.length;
    currentSlide.textContent = slideIndex;
  }

  slidesInnerEl.style.width = 100 * slidesElements.length + '%';
  slidesInnerEl.style.display = 'flex';
  slidesInnerEl.style.transition = '0.5s all';

  slidesWrapperEl.style.overflow = 'hidden';

  slidesElements.forEach((slide) => {
    slide.style.width = width;
  });

  sliderElement.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  sliderElement.append(indicators);

  for (let i = 0; i < slidesElements.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  function addZeroToSlider() {
    if (slideIndex < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }
  }
  function wichDotIsActive() {
    dots.forEach((dot) => {
      dot.style.opacity = '.5';
    });
    dots[slideIndex - 1].style.opacity = 1;
  }

  nextArrowEl.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slidesElements.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesInnerEl.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slidesElements.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    addZeroToSlider();

    wichDotIsActive();
  });

  prevArrowEl.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slidesElements.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesInnerEl.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slidesElements.length;
    } else {
      slideIndex--;
    }

    addZeroToSlider();

    wichDotIsActive();
  });

  dots.forEach((dot) =>
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesInnerEl.style.transform = `translateX(-${offset}px)`;

      addZeroToSlider();
      wichDotIsActive();
    })
  );

  // showSlides(slideIndex);

  // if (slidesElements.length < 10) {
  //   totalSlides.textContent = `0${slidesElements.length}`;
  // } else {
  //   totalSlides.textContent = slidesElements.length;
  // }

  // function showSlides(n) {
  //   if (n > slidesElements.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slidesElements.length;
  //   }

  //   slidesElements.forEach((slide) => {
  //     slide.classList.add('hide');
  //   });

  //   slidesElements[slideIndex - 1].classList.remove('hide');
  //   slidesElements[slideIndex - 1].classList.add('show');

  //   if (slidesElements.length < 10) {
  //     currentSlide.textContent = `0${slideIndex}`;
  //   } else {
  //     currentSlide.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prevArrowEl.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // nextArrowEl.addEventListener('click', () => {
  //   plusSlides(1);
  // });
}
