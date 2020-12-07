// import '@/styles/styles.css'
// import DATA from '@/scripts/cards.js';
// import CATEGORIES from '@/scripts/cards.js';

(function () {
  function initRouter() {
    var router = new Router([
      new Route('mainpage', 'main_page.html', true),            
    ]);
  }
  initRouter();
}());

const container = document.querySelector ('.main__container');
let HASH = window.location.hash.substr(1);

const getHash = () => {
  return HASH = window.location.hash.substr(1);
};

const menuBtn = document.querySelector ('.button__toggle_menu');
const menu = document.querySelector ('.navigation__menu');

const closeMenu = () => {
  document.onclick = function (e) {
    if(e.target !== menu && e.target !== menuBtn) {
      console.log('неправильно работает закрытие меню');
      menu.classList.remove('visible');
      menuBtn.classList.remove('on');
    }
  };
};

menuBtn.addEventListener ('click', (e) =>{
  menuBtn.classList.toggle ('on');
  menu.classList.toggle ('visible');
  closeMenu();
});

const buildCard = (item) => {
  const cardContainer = document.createElement('div');
  const card = document.createElement('div');
  const frontCard = document.createElement('div');
  const cardImageFront = document.createElement('div');
  const cardImageBack = document.createElement('div');
  const cardTitleEn = document.createElement('div');
  const rotateCardBtn = document.createElement('div');
  const backCard = document.createElement('div');
  const cardTitleRu = document.createElement('div');

  cardContainer.className = 'card__container';
  card.className = 'card__discr';
  frontCard.className = 'front__card';
  cardImageFront.className = 'img_block';
  cardImageBack.className = 'img_block';
  cardTitleEn.className = 'card__header_en';
  rotateCardBtn.className = 'rotate_card';
  backCard.className = 'back__card';
  cardTitleRu.className = 'card__header_ru';

  cardTitleEn.innerText = item.word;
  cardImageFront.innerHTML = `<img src="${item.image}" class="card__img">`;
  cardImageBack.innerHTML = `<img src="${item.image}" class="card__img">`;
  cardTitleRu.innerText = item.translation;

  cardContainer.addEventListener ('click', ()=> {
    playAydio(`./${item.audioSrc}`);
  });

  rotateCardBtn.addEventListener ('click', () => {
    frontCard.style.transform = "rotateY(180deg)";
    backCard.style.transform = "rotateY(360deg)";
  });

  cardContainer.addEventListener ('mouseleave', ()=> {
    frontCard.style.transform = "rotateY(0deg)";
    backCard.style.transform = "rotateY(180deg)";
  });

  container.appendChild(cardContainer);
  cardContainer.appendChild(card);
  card.appendChild(frontCard);
  frontCard.appendChild(cardImageFront);
  frontCard.appendChild(cardTitleEn);
  frontCard.appendChild(rotateCardBtn);
  card.appendChild(backCard);
  backCard.appendChild(cardImageBack);
  backCard.appendChild(cardTitleRu);
};

const init = () => {
  let hash = HASH
  const cards = {
    data: DATA,
    hash
  };

  const getCards = (data, hash) => {
    return data.filter(item => item.category === hash)
  };

  const craeteCards = () => {
    const cardsData = getCards (cards.data, HASH);

    return cardsData.map(item => buildCard(item));
  };

  craeteCards();
};

//game mode
let switchInput = document.querySelector ('.switch__input');
let gameModeTrain = document.querySelector ('.play');
let gameModePlay = document.querySelector ('.train');
let startGame = false;

switchInput.addEventListener ('click', () =>{
  if (!startGame) {
    gameModeTrain.classList.add ('hide');
    gameModePlay.classList.remove ('hide');
    startGame = true;
    // changeMode();
  } else {
    gameModeTrain.classList.remove ('hide');
    gameModePlay.classList.add ('hide');
    startGame = false;
     // changeMode();
  }
});

let audio;
function playAydio(url) {
  if(!audio) audio = new Audio(); 
  audio.src = url;
  audio.load();
  audio.play();
};

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => {
  container.innerHTML = '';
  getHash();
  init();
});

