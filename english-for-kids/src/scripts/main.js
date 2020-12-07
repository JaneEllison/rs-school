// import '@/styles/styles.css'
// import DATA from '@/scripts/cards.js';
// import CATEGORIES from '@/scripts/cards.js';

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
    if(!isGameModePlay) {
      playAydio(`./${item.audioSrc}`);
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
const switchInput = document.querySelector ('.switch__input');
const gameModeTrain = document.querySelector ('.play');
const gameModePlay = document.querySelector ('.train');
const switchContainer = document.querySelector ('.switch__container')
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
startGameBtn.className = 'start__game_btn';
startGameBtn.innerText = 'START GAME';
switchContainer.before(startGameBtn);

//change Mode
const changeMode = (modePlay) => {
  const categoriesBg = document.querySelectorAll('.categories__bg');
  const navigationMenu = document.querySelector('.navigation__menu');
  const rotateCardBtn = document.querySelectorAll('.rotate_card');
  const cardHeaderEn = document.querySelectorAll('.card__header_en');
  const cardImg = document.querySelectorAll('.card__img');
  const cardContainer = document.querySelectorAll('.card__container');
  const startGameBtn = document.querySelector('.start__game_btn');  

  if (modePlay) { 
    startGameBtn.classList.add ('game__mode');
    
    categoriesBg.forEach(cardBg => {
      cardBg.style.background = "linear-gradient(180deg,#31b869,#8fe2b1 40%)";
    });
    navigationMenu.classList.add ('game__mode');

    cardContainer.forEach(card => {
      card.classList.add ('game__mode');
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
    startGameBtn.classList.remove ('game__mode');

    categoriesBg.forEach(cardBg => {
      cardBg.style.background = "linear-gradient(180deg, rgb(255, 197, 72),#dfff85 40%)";
    });
    navigationMenu.classList.remove ('game__mode');

    cardContainer.forEach(card => {
      card.classList.remove ('game__mode');
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

(function () {
  function initRouter() {
    var router = new Router([
      new Route('mainpage', 'main_page.html', true),          
    ]);
  }
  initRouter();
}());
