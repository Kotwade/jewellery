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
