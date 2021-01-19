const body = document.querySelector('.page__body');

//ГЛАВНАЯ НАВИГАЦИЯ
if (body.querySelector('.nav')) {
  const nav = body.querySelector('.nav');
  const navToggle = nav.querySelector('.nav__toggle');

  nav.classList.add('nav--closed');
  nav.classList.remove('nav--nojs');

  navToggle.addEventListener('click', function(evt) {
    evt.preventDefault();

    if (nav.classList.contains('nav--closed')) {
      nav.classList.remove('nav--closed');
      nav.classList.add('nav--opened');

      console.log('Привет');

    } else {
      nav.classList.remove('nav--opened');
      nav.classList.add('nav--closed');
    }
  });
}


//СЛАЙДЕР
if (body.querySelector('.slider')) {

  const slider = body.querySelector('.slider');

  const btnBefore = slider.querySelector('.slider__btn--before');
  const btnAfter = slider.querySelector('.slider__btn--after');

  const btnRange = slider.querySelector('.slider__range-inner');
  const range = slider.querySelector('.slider__range');

  const slideBefore = slider.querySelector('.slider__slide-before');

  let widthBody;

  btnBefore.addEventListener('click', function(evt) {
    evt.preventDefault();
    slideBefore.classList.remove('disappear', 'appear');
    widthBody = body.clientWidth;
    slideBefore.style.width = 100 + '%'

    if (widthBody < 768) {
      btnRange.style.left = 0;
    }

    if (widthBody >= 768) {
      btnRange.style.left = 95 + '%';
    }
  });

  btnAfter.addEventListener('click', function(evt) {
    evt.preventDefault();

    slideBefore.classList.remove('disappear', 'appear');
    widthBody = body.clientWidth;
    slideBefore.style.width = 0;

    if (widthBody < 768) {
      btnRange.style.left = 44 + '%';
    }

    if (widthBody >= 768) {
      btnRange.style.left = 0;
    }
  });

  let rangeStart;
  let rangeEnd;
  let btnStart;
  let btnEnd;

  let nowLeft;
  let longBtnRange;

  let isPush = false;

  let slideStart;
  let nowSlideStart;

  btnStart = btnRange.getBoundingClientRect().left;
  btnEnd = btnRange.getBoundingClientRect().right;
  longBtnRange = btnEnd - btnStart;

  //Нажатие кнопки мыши
  btnRange.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    rangeStart = range.getBoundingClientRect().left;
    rangeEnd = range.getBoundingClientRect().right;
    slideStart = slideBefore.getBoundingClientRect().left;
    widthBody = body.clientWidth;
    nowSlideStart = rangeStart - slideStart;
    isPush = true;
  });

  //Выключение действия, если кнопка мыши отпущена
  body.addEventListener('mouseup', function(evt) {
    evt.preventDefault();
    ispush = false;
  });

  //Движение мыши
  body.addEventListener('mousemove', function(evt) {
    evt.preventDefault();

    if (evt.which === 1 && isPush === true) {
      let centerBtn = longBtnRange/2;
      nowLeft = evt.clientX - centerBtn;
      let nowStart = nowLeft - rangeStart;

      if (widthBody < 768 && nowLeft > rangeStart && nowLeft < rangeEnd - longBtnRange - 12) {
        let nowWidthSlide = nowStart*8;
        nowWidthSlide = nowWidthSlide + 'px';
        nowStart = nowStart + 'px';
        btnRange.style.left = nowStart;
        slideBefore.style.width = nowWidthSlide;
      }

      if (widthBody >= 768 && nowLeft >= rangeStart - 10 && nowLeft < rangeEnd - 25) {
        let nowWidthSlide = nowStart + (nowSlideStart + 17);
        nowWidthSlide = nowWidthSlide + 'px';

        slideBefore.classList.remove('disappear', 'appear');

        if (nowStart < 10) {
          slideBefore.classList.add('disappear');
        }

        if (nowLeft > rangeEnd - 35) {
          slideBefore.classList.add('appear');
        }

        nowStart = nowStart + 'px';

        btnRange.style.left = nowStart;
        slideBefore.style.width = nowWidthSlide;
      }
    }
  });

  //При изменении ширины экрана кнопка до tablet_width возвращается в исходное положение
  window.addEventListener('resize', function () {
    widthBody = body.clientWidth;
    slideBefore.classList.remove('disappear', 'appear');

    if (widthBody < 768) {
      btnRange.style.left = 0;
      slideBefore.style.width = 311 + 'px';
    }

    if (widthBody >= 768 && widthBody < 1440) {
      btnRange.style.left = 198 + 'px';
      slideBefore.style.width = 338 + 'px';
    }

    if (widthBody >= 1440) {
      btnRange.style.left = 198 + 'px';
      slideBefore.style.width = 392 + 'px';
    }
  });
}
