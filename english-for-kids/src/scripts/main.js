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

  cardContainer.className = 'card__container';
  card.className = 'card__discr';
  frontCard.className = 'front__card';
  cardImageFront.className = 'img__block';
  cardImageBack.className = 'img__block';
  cardTitleEn.className = 'card__header_en';
  rotateCardBtn.className = 'rotate__card';
  backCard.className = 'back__card';
  cardTitleRu.className = 'card__header_ru';

  cardTitleEn.innerText = item.word;
  cardImageFront.innerHTML = `<img src="${item.image}" class="card__img">`;
  cardImageBack.innerHTML = `<img src="${item.image}" class="card__img">`;
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
  let hash = HASH;
  const cards = {
    data: DATA,
    hash
  };

  const getCards = (data, hash) => {
    return data.filter(item => item.category === hash);
  };

  const craeteCards = () => {
    const cardsData = getCards(cards.data, HASH);
    return cardsData.map(item => buildCard(item));
  }; 
  
  //get random audio 
  let countClick = 0;

  const getRandomCards = (data, hash) => {
    let cardsCategory = data.filter(item => item.category === hash);
    let arrCards = [];

    cardsCategory.forEach(cards => {
      return arrCards.push(cards);
    });

    let randomCardsArray = [...arrCards];

    for (let i = 0; i < 8; i++) {
      for (let j = randomCardsArray.length; j > 0; j--) {
        let randomInd = [Math.floor(Math.random() * j)];
        const randomElement = randomCardsArray.splice(randomInd, 1)[0];
        randomCardsArray.push(randomElement);
      }
    };

    //check correct answer
    let currentCard = randomCardsArray[countClick];
    let currentWord = currentCard.word;
    const cardDiscr = document.querySelectorAll('.card__discr');
    
    cardDiscr.forEach(card => {
      card.addEventListener('click', event => {
        let cardElemText;
        console.log(countClick);

        if (event.target.closest('.front__card') !== null) {
          cardElemText = event.target.closest('.front__card').parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
        };
        checkCardCorrect(cardElemText, currentWord);
      });
    });
    return randomCardsArray;
  };

  const checkCardCorrect = (cardElemText, currentWord) => {
    if (cardElemText === currentWord) {
      playAydio('assets/audio/correct.mp3');
      countClick = countClick + 1;
      console.log('yep');

    } else {
      playAydio('assets/audio/wrong.mp3');
      console.log('nope');
    }
    return countClick;
  };

  const startGameBtn = document.querySelector('.start__game_btn');
  startGameBtn.addEventListener('click', () => {

    let randomCards = getRandomCards(cards.data, HASH);
    let randomCard = randomCards[countClick];  

    playAydio(randomCard.audioSrc);

    startGameBtn.classList.remove('game__mode');
    repeatWordBtn.classList.add('game__mode');

    repeatWordBtn.addEventListener('click', () => {
      playAydio(randomCard.audioSrc);
    });
  });
  craeteCards();
}; 

//game mode
const switchInput = document.querySelector('.switch__input');
const gameModeTrain = document.querySelector('.play');
const gameModePlay = document.querySelector('.train');
const switchContainer = document.querySelector('.switch__container');
let isGameModePlay;

switchInput.addEventListener('click', () => {

  if (!isGameModePlay) {
    gameModeTrain.classList.add('hide');
    gameModePlay.classList.remove('hide');
    isGameModePlay = true;
  } else {
    gameModeTrain.classList.remove('hide');
    gameModePlay.classList.add('hide');
    repeatWordBtn.classList.remove('game__mode');
    isGameModePlay = false;
  }

  changeMode(isGameModePlay);
}); 

//add Start game button
const startGameBtn = document.createElement('div');
startGameBtn.className = 'start__game_btn';
startGameBtn.innerText = 'START GAME';
switchContainer.before(startGameBtn); 

const repeatWordBtn = document.createElement('div');
repeatWordBtn.className = 'repeat__word_btn';
repeatWordBtn.innerText = 'REPEAT';
switchContainer.before(repeatWordBtn);

//change Mode
const changeMode = modePlay => {
  const navigationMenu = document.querySelector('.navigation__menu');
  const rotateCardBtn = document.querySelectorAll('.rotate__card');
  const cardHeaderEn = document.querySelectorAll('.card__header_en');
  const cardImg = document.querySelectorAll('.card__img');
  const cardContainer = document.querySelectorAll('.card__container');
  const startGameBtn = document.querySelector('.start__game_btn');

  if (modePlay) {
    if(HASH !== 'mainpage' && HASH !== ""){
      startGameBtn.classList.add('game__mode');
    }

    navigationMenu.classList.add('game__mode');

    cardContainer.forEach(card => {
      card.classList.add('game__mode');
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
    startGameBtn.classList.remove('game__mode');
    navigationMenu.classList.remove('game__mode');
    
    cardContainer.forEach(card => {
      card.classList.remove('game__mode');
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
}; 

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
  const repeatWordBtn = document.querySelector ('.repeat__word_btn')
  repeatWordBtn.classList.remove('game__mode');
});



