'use strict';
var ESC_KEY = 'Escape';

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

document.addEventListener('keydown', function (evt) {
  if (evt.key === ESC_KEY && pageHeader.classList.contains('page-header--opened')) {
    pageHeader.classList.remove('page-header--opened');
    pageBody.classList.remove('page-body--opened');
  }
});

const swiper = new Swiper('.swiper-container', {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 30
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamickBullets: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
});

// Попапы

var popup = document.querySelector('.cart-popup');

if (popup) {
  var popupOpen = document.querySelector('.info__button');
  var popupButton = popup.querySelector('.cart-popup__shopping');
  var popupClose = popup.querySelector('.cart-popup__button-cross');
  var overlay = document.querySelector('.overlay');

  var onCartPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeCartPopup();
    }
  };

  var openPopup = function () {
    popup.classList.remove('cart-popup--hidden');
    overlay.classList.remove('overlay--hidden');
    popupButton.focus();
    document.addEventListener('keydown', onCartPopupEscPress);
  };

  var closeCartPopup = function () {
    popup.classList.add('cart-popup--hidden');
    overlay.classList.add('overlay--hidden');
    document.removeEventListener('keydown', onCartPopupEscPress);
  };

  popupOpen.addEventListener('click', openPopup);

  popupClose.addEventListener('click', closeCartPopup);

  overlay.addEventListener('click', closeCartPopup);
};

var login = document.querySelector('.login-popup');

if (login) {
  var popupOpen = document.querySelector('.page-header__login-link');
  var popupOpenMobile = document.querySelector('.main-nav__login');
  var popupClose = login.querySelector('.login-popup__button-close');
  var overlay = document.querySelector('.overlay');

  var onLoginPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeLoginPopup();
    }
  };

  var openPopup = function (evt) {
    evt.preventDefault();
    login.classList.remove('login-popup--hidden');
    overlay.classList.remove('overlay--hidden');
    pageBody.classList.add('page-body--modal-opened');
    document.addEventListener('keydown', onLoginPopupEscPress);
   };

  var closeLoginPopup = function () {
    login.classList.add('login-popup--hidden');
    overlay.classList.add('overlay--hidden');
    pageBody.classList.remove('page-body--modal-opened');
    document.removeEventListener('keydown', onLoginPopupEscPress);
  };

  popupOpen.addEventListener('click', openPopup);

  popupOpenMobile.addEventListener('click', openPopup);

  popupClose.addEventListener('click', closeLoginPopup);

  overlay.addEventListener('click', closeLoginPopup);
}

var filter = document.querySelector('.filter');

if (filter) {
  var popupOpen = document.querySelector('.catalog-button');
  var popupClose = filter.querySelector('.filter__button-close');
  var overlay = document.querySelector('.overlay');

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  var openPopup = function () {
    filter.classList.add('filter--open');
    overlay.classList.remove('overlay--hidden');
    pageBody.classList.add('page-body--modal-opened');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    filter.classList.remove('filter--open');
    overlay.classList.add('overlay--hidden');
    pageBody.classList.remove('page-body--modal-opened');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  popupOpen.addEventListener('click', openPopup);

  popupClose.addEventListener('click', closePopup);

  overlay.addEventListener('click', closePopup);
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
  var button = evt.currentTarget;
  var accordionPane = button.nextElementSibling;

  if (button.classList.contains('accordion__toggle--inactive')) {
    showPane(button, accordionPane);
  } else {
    hidePane(button, accordionPane);
  }
};

Array.prototype.forEach.call(accordionItems, function (accordion) {
  var accordionToggleButton = accordion.querySelector('.accordion__toggle');
  var accordionPane = accordion.querySelector('.accordion__pane');
  hidePane(accordionToggleButton, accordionPane);
  accordionToggleButton.addEventListener('click', toggleAccordion);
});

// Проверка WebP

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
  if (support) {
    document.body.classList.add('webp');
  }
});
