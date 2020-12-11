import '@/styles/styles.css';
import DATA from '@/scripts/cards.js';
import Route from '@/scripts/route.js';
import Router from '@/scripts/router.js';

(function () {
  function initRouter() {
    var router = new _scripts_router_js__WEBPACK_IMPORTED_MODULE_3__.default([new _scripts_route_js__WEBPACK_IMPORTED_MODULE_2__.default('mainpage', 'pages/main_page.html', true)]);
  }

  initRouter();
})();

const container = document.querySelector('.main__container');
let HASH = window.location.hash.substr(1);

const getHash = () => {
  return HASH = window.location.hash.substr(1);
};

const menuBtn = document.querySelector('.button__toggle_menu');
const menu = document.querySelector('.navigation__menu');

const closeMenu = () => {
  document.onclick = function (e) {
    if (e.target !== menu && e.target !== menuBtn) {
      menu.classList.remove('visible');
      menuBtn.classList.remove('on');
    }
  };
};

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('on');
  menu.classList.toggle('visible');
  closeMenu();
});

//build Cards
const buildCard = item => {
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

  cardContainer.addEventListener('click', event => {
    if (!isGameModePlay && event.target !== rotateCardBtn) {
      playAydio(item.audioSrc);
    }
  });
  rotateCardBtn.addEventListener('click', () => {
    frontCard.style.transform = "rotateY(180deg)";
    backCard.style.transform = "rotateY(360deg)";
  });
  cardContainer.addEventListener('mouseleave', () => {
    frontCard.style.transform = "rotateY(0deg)";
    backCard.style.transform = "rotateY(180deg)";
  });

  container.append(cardContainer);
  cardContainer.append(card);
  card.append(frontCard);
  frontCard.append(
    cardImageFront,
    cardTitleEn,
    rotateCardBtn
  );
  card.append(backCard);
  backCard.append(
    cardImageBack,
    cardTitleRu
  );
};

const switchInput = document.querySelector('.switch__input');
const gameModeTrain = document.querySelector('.play');
const gameModePlay = document.querySelector('.train');
const switchContainer = document.querySelector('.switch__container');
const mainContainer = document.querySelector('.main__container');

// let currentCards;
let countClick = 0;
let isGameModePlay;
let audio;
// let isAnswerCorrect;
// let isGameStarted;
// let currentArr;
// let randomCard;

const getCards = (data, hash) => {
  return data.filter(item => item.category === hash);
};

const craeteCards = (cards) => {
  const cardsData = getCards(cards, HASH);
  return cardsData.map(item => buildCard(item));
}; 

const playAydio = (url) => {
  if (!audio) audio = new Audio();
  audio.src = url;
  audio.load();
  audio.play();
};

const addGameButtons = () => {
  const startGameBtn = document.createElement('div');
  startGameBtn.className = 'start__game_btn';
  startGameBtn.innerText = 'START GAME';
  switchContainer.before(startGameBtn);

  const repeatWordBtn = document.createElement('div');
  repeatWordBtn.className = 'repeat__word_btn';
  repeatWordBtn.innerText = 'REPEAT';
  switchContainer.before(repeatWordBtn);
};

const changeMode = (modePlay) => {
  const navigationMenu = document.querySelector('.navigation__menu');
  const rotateCardBtn = document.querySelectorAll('.rotate__card');
  const cardHeaderEn = document.querySelectorAll('.card__header_en');
  const cardImg = document.querySelectorAll('.card__img');
  const cardContainer = document.querySelectorAll('.card__container');
  const startGameBtn = document.querySelector('.start__game_btn');
  const markLine = document.querySelector('.mark__line_container');
  changeStartButtons();

  if (modePlay) {
    if (HASH !== 'mainpage' && HASH !== "") {
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
    createMarkLine();
    markLine.classList.add('game__mode');

  } else {
    startGameBtn.classList.remove('game__mode');
    navigationMenu.classList.remove('game__mode');
    cardContainer.forEach(card => {
      card.classList.remove('game__mode');
      card.classList.remove('disable');
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
    markLine.remove();
  }
};

const changeStartButtons = () => {
  const startGameBtn = document.querySelector('.start__game_btn');
  const repeatWordBtn = document.querySelector('.repeat__word_btn');

  if (isGameModePlay) {
    startGameBtn.addEventListener('click', () => {
      startGameBtn.classList.remove('game__mode');
      repeatWordBtn.classList.add('game__mode');
    })
  } else {
    repeatWordBtn.classList.remove('game__mode');
  }
};

const createMarkLine = () => {
  const markLine = document.createElement('div');
  markLine.className = 'mark__line_container';
  mainContainer.appendChild(markLine);
}

const addMarks = (isAnswerCorrect) => {
  const markLine = document.querySelector('.mark__line_container');
  const mark = document.createElement('div');

  if (isAnswerCorrect) {
    mark.className = 'fa fa-star checked';
  } else {
    mark.className = 'fa fa-star';
  }
  markLine.appendChild(mark);
}

const init = () => {
  let hash = HASH;
  const cards = {
    data: DATA,
    hash
  };

  craeteCards(cards.data);

  const getRandomCards = (data, hash) => {
    let cardsCategory = data.filter(item => item.category === hash);

    let randomCardsArray = cardsCategory.sort(function(){
      return Math.random() - 0.5;
    });
    
    //check correct answer

    let currentCard = randomCardsArray[countClick];
    let currentWord = currentCard.word;
    const cardDiscr = document.querySelectorAll('.card__discr');
    cardDiscr.forEach(card => {
      card.addEventListener('click', event => {
        let cardElemText;

        if (event.target.closest('.front__card') !== null) {
          cardElemText = event.target.closest('.front__card').parentElement.firstElementChild.firstElementChild.nextElementSibling.innerHTML;
        }
        ;
        checkCardCorrect(cardElemText, currentWord);
      });
    });

    
    const repeatWordBtn = document.querySelector('.repeat__word_btn');
    repeatWordBtn.addEventListener('click', () => {
      currentCard = randomCardsArray[countClick];
      currentWord = currentCard.word;
      playAydio(currentCard.audioSrc);
    });

    const checkCardCorrect = (text, word) => {
      if (text === word) {
        playAydio('assets/audio/correct.mp3');
        countClick = countClick + 1;
        currentCard = randomCardsArray[countClick];
        currentWord = currentCard.word;
        let correctCard = event.target.closest('.card__container');
        correctCard.classList.add('disable');
        setTimeout(playAydio, 1000, currentCard.audioSrc);
        addMarks(true);
      } else {
        playAydio('assets/audio/wrong.mp3');
        addMarks(false);
      }

      return countClick;
    };

    return randomCardsArray;
  };

  const startGameBtn = document.querySelector('.start__game_btn');
  startGameBtn.addEventListener('click', () => {
    countClick = 0;
    
    let randomCards = getRandomCards(cards.data, HASH);
    let randomCard = randomCards[countClick];
    playAydio(randomCard.audioSrc);
  });

}; 

switchInput.addEventListener('click', () => {
  if (!isGameModePlay) {
    gameModeTrain.classList.add('hide');
    gameModePlay.classList.remove('hide');
    isGameModePlay = true;
  } else {
    gameModeTrain.classList.remove('hide');
    gameModePlay.classList.add('hide');
    isGameModePlay = false;
  }
  changeMode(isGameModePlay);
});

addGameButtons();

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => {
  container.innerHTML = '';
  getHash();
  init();
  changeMode(isGameModePlay);
});


