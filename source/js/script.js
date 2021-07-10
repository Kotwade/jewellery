'use strict';
var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');
var pageBody = document.querySelector('.page-body');

pageHeader.classList.remove('page-header--nojs');

if (headerToggle) {
  headerToggle.addEventListener('click', function () {
    pageHeader.classList.toggle('page-header--opened');
    pageBody.classList.toggle('page-body--opened');
  });
}

const swiper = new Swiper('.swiper-container', {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
});

//Попапы

var popup = document.querySelector('.cart-popup');

if (popup) {
  var ESC_KEY = 'Escape';
  var popupOpen = document.querySelector('.info__button');
  var popupClose = popup.querySelector('.cart-popup__button-cross');
  var overlay = document.querySelector('.overlay');

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var openPopup = function () {
    popup.classList.remove('cart-popup--hidden');
    overlay.classList.remove('overlay--hidden');
    pageBody.classList.add('page-body--opened');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    popup.classList.add('cart-popup--hidden');
    overlay.classList.add('overlay--hidden');
    pageBody.classList.remove('page-body--opened');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  popupOpen.addEventListener('click', function () {
    openPopup();
  });

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  overlay.addEventListener('click', function () {
    popup.classList.add('cart-popup--hidden');
    overlay.classList.add('overlay--hidden');
  });
};

// Аккордеон

var accordionItems = document.querySelectorAll('.accordion');
var accordionPanes = document.querySelectorAll('.accordion__pane');

var hidePane = function (button, pane) {
  button.classList.add('accordion__toggle--inactive');
  pane.classList.add('accordion__pane--hidden');
};

var showPane = function (button, pane) {
  button.classList.remove('accordion__toggle--inactive');
  pane.classList.remove('accordion__pane--hidden');
};

var toggleAccordion = function (evt) {
  Array.prototype.forEach.call(accordionPanes, function (accordionPane) {
    var button = accordionPane.closest('.accordion').querySelector('.accordion__toggle');
    if (button === evt.target && !button.classList.contains('accordion__toggle--inactive') || button !== evt.target) {
      hidePane(button, accordionPane);
    } else if (button === evt.target) {
      showPane(button, accordionPane);
    }
  });
};

Array.prototype.forEach.call(accordionItems, function (accordion) {
  var accordionToggleButton = accordion.querySelector('.accordion__toggle');
  var accordionPane = accordion.querySelector('.accordion__pane');
  hidePane(accordionToggleButton, accordionPane);
  accordionToggleButton.addEventListener('click', toggleAccordion);
});
