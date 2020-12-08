import '@/styles/styles.css';
import DATA from '@/scripts/cards.js';
import Route from '@/scripts/route.js';
import Router from '@/scripts/router.js';

(function () {
  function initRouter() {
    var router = new Router([
      new Route('mainpage', 'pages/main_page.html', true),          
    ]);
  }
  initRouter();
}());

const container = document.querySelector ('.main_container');
let HASH = window.location.hash.substr(1);

const getHash = () => {
  return HASH = window.location.hash.substr(1);
};

const menuBtn = document.querySelector ('.button_toggle_menu');
const menu = document.querySelector ('.navigation_menu');

const closeMenu = () => {
  document.onclick = function (e) {
    if(e.target !== menu && e.target !== menuBtn) {
      menu.classList.remove('visible');
      menuBtn.classList.remove('on');
    }
  };
};

menuBtn.addEventListener ('click', () =>{
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

  cardContainer.className = 'card_container';
  card.className = 'card_discr';
  frontCard.className = 'front_card';
  cardImageFront.className = 'img_block';
  cardImageBack.className = 'img_block';
  cardTitleEn.className = 'card_header_en';
  rotateCardBtn.className = 'rotate_card';
  backCard.className = 'back_card';
  cardTitleRu.className = 'card_header_ru';

  cardTitleEn.innerText = item.word;
  cardImageFront.innerHTML = `<img src="${item.image}" class="card_img">`;
  cardImageBack.innerHTML = `<img src="${item.image}" class="card_img">`;
  cardTitleRu.innerText = item.translation;

  cardContainer.addEventListener ('click', (event)=> {
    if(!isGameModePlay && event.target !== rotateCardBtn) {
      playAydio(`${item.audioSrc}`);
    }
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
const switchInput = document.querySelector ('.switch_input');
const gameModeTrain = document.querySelector ('.play');
const gameModePlay = document.querySelector ('.train');
const switchContainer = document.querySelector ('.switch_container')
let isGameModePlay;

switchInput.addEventListener ('click', () =>{
  if (!isGameModePlay) {
    gameModeTrain.classList.add ('hide');
    gameModePlay.classList.remove ('hide');
    isGameModePlay = true;
  } else {
    gameModeTrain.classList.remove ('hide');
    gameModePlay.classList.add ('hide');
    isGameModePlay = false;
  }

  changeMode(isGameModePlay);
});

//add Start game button
const startGameBtn = document.createElement('div');
startGameBtn.className = 'start_game_btn';
startGameBtn.innerText = 'START GAME';
switchContainer.before(startGameBtn);

//change Mode
const changeMode = (modePlay) => {
  const navigationMenu = document.querySelector('.navigation_menu');
  const rotateCardBtn = document.querySelectorAll('.rotate_card');
  const cardHeaderEn = document.querySelectorAll('.card_header_en');
  const cardImg = document.querySelectorAll('.card_img');
  const cardContainer = document.querySelectorAll('.card_container');
  const startGameBtn = document.querySelector('.start_game_btn');  

  if (modePlay) { 
    startGameBtn.classList.add ('game_mode');
    
    navigationMenu.classList.add ('game_mode')
    cardContainer.forEach(card => {
      card.classList.add ('game_mode');
    });
    rotateCardBtn.forEach(button => {
      button.style.display = "none";
    });
    cardHeaderEn.forEach(text => {
      text.style.display = "none";
    });
    cardImg.forEach(img => {
      img.style.height = "90%";
    });
  } else {
    startGameBtn.classList.remove ('game_mode');

    navigationMenu.classList.remove ('game_mode')
    cardContainer.forEach(card => {
      card.classList.remove ('game_mode');
    });
    rotateCardBtn.forEach(button => {
      button.style.display = "flex";
    });
    cardHeaderEn.forEach(text => {
      text.style.display = "block";
    });
    cardImg.forEach(img => {
      img.style.height = "80%";
    });
  }
}

//add audio
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
  changeMode(isGameModePlay);
});


