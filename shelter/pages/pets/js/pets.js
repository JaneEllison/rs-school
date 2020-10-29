const wrapperMobile = document.querySelector('.wrapper__mobile');
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.m__menu_button');
const headerOverlay = document.querySelector('.header__overlay');

const buttonClick = () => {
  wrapperMobile.classList.toggle('wrapper__mobile_active');
  menu.classList.toggle('menu__visible');
  menuBtn.classList.toggle('m__menu_button_rotate');
  headerOverlay.classList.toggle('header__overlay_visible');
  document.body.classList.toggle('lock');
}

menuBtn.addEventListener('click', buttonClick);
headerOverlay.addEventListener('click', buttonClick);