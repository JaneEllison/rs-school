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

const container = document.querySelector('.main__container');
let HASH = window.location.hash.substr(1);

const getHash = () => {
  return HASH = window.location.hash.substr(1);
};

const menuBtn = document.querySelector('.button__toggle_menu');
const menu = document.querySelector('.navigation__menu');

const closeMenu = () => {
  document.onclick = function (event) {
    if (event.target !== menu && event.target !== menuBtn) {
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
  frontCard.append(cardImageFront, cardTitleEn, rotateCardBtn);
  card.append(backCard);
  backCard.append(cardImageBack, cardTitleRu);
};

const switchInput = document.querySelector('.switch__input');
const gameModeTrain = document.querySelector('.play');
const gameModePlay = document.querySelector('.train');
const switchContainer = document.querySelector('.switch__container');
const mainContainer = document.querySelector('.main__container'); 

let countClick = 0;
let isGameModePlay;
let audio; 
let isGameStarted;
let randomCardsArray;
let rightClick = 0;
let wrongClick = 0;

const getCards = (data, hash) => {
  return data.filter(item => item.category === hash);
};

const craeteCards = cards => {
  const cardsData = getCards(cards, HASH);
  return cardsData.map(item => buildCard(item));
};

const playAydio = url => {
  if (!audio) audio = new Audio();

  audio.src = url;
  audio.load();

  setTimeout(function () {      
    audio.play();
 }, 150);
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

const changeMode = modePlay => {
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

    markLine.classList.add('game__mode');
  } else {
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
    
    markLine.classList.remove('game__mode');
    markLine.innerHTML = "";

  }
};

const changeStartButtons = () => {
  const startGameBtn = document.querySelector('.start__game_btn');
  const repeatWordBtn = document.querySelector('.repeat__word_btn');

  if (isGameModePlay) {
    startGameBtn.addEventListener('click', () => {
      startGameBtn.classList.remove('game__mode');
      repeatWordBtn.classList.add('game__mode');
      isGameStarted = true;
      createMarkLine();
    });
  } else {
    repeatWordBtn.classList.remove('game__mode');
  }
};

const createMarkLine = () => {
  const markLine = document.createElement('div');
  markLine.className = 'mark__line_container';
  mainContainer.appendChild(markLine);
};

const addMarks = isAnswerCorrect => {

  if(isGameStarted) {
    const markLine = document.querySelector('.mark__line_container');
    const mark = document.createElement('div');
  
    if (isAnswerCorrect) {
      mark.className = 'fa fa-star checked';
      if (rightClick === 8) {
        finishGame();
      }
    } else {
      mark.className = 'fa fa-star';
    }
  
    markLine.appendChild(mark);
  }
};

const finishGame = () => {
  const appContainer = document.querySelector('.app__container');

  document.body.classList.add('lock')
  const gameOver = document.createElement('div');
  gameOver.className = 'game__over';

  if(wrongClick === 0) {
    gameOver.innerText = 'u Win :)';
    gameOver.classList.add('win__card');
    
    let src = 'assets/audio/win.mp3';
    setTimeout(playAydio, 1000, src);
  } else {
    gameOver.innerText = 'u Lose :(';
    gameOver.classList.add('lose__card');

    let src = 'assets/audio/lose.mp3';
    setTimeout(playAydio, 1000, src);
  }
  appContainer.prepend(gameOver);


  const restartButton = document.createElement('div');
  restartButton.className = 'restart__button';
  restartButton.innerText = 'Start new game';
  gameOver.append(restartButton);


  restartButton.addEventListener ('click', ()=> {
    refresh();
  })
}

const refresh = () => {
  setTimeout(function () {
      location.reload()
  }, 1000);
}

const init = () => {
  let hash = HASH;
  const cards = {
    data: DATA,
    hash
  };
  craeteCards(cards.data);

  const navigationLink = document.querySelectorAll ('.navigation__link') 
  navigationLink.forEach (link => {
    let textLink = link.innerText
    let linkHash = textLink.replace(/\s/g, '');
    if (linkHash === HASH) {
      link.classList.add ('current')
    }
  })

  let getRandomCards = (data, hash) => {
    let cardsCategory = data.filter(item => item.category === hash);
    randomCardsArray = cardsCategory.sort(function () {
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
        };

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
      if (word == 'undefined' || text === word && isGameStarted) {
        countClick = countClick + 1;
        rightClick = rightClick + 1;
        
        if(countClick > 7) {
          currentCard = randomCardsArray[countClick-1];
          currentWord = currentCard.word;
        } else {
          currentCard = randomCardsArray[countClick];
          currentWord = currentCard.word;
          setTimeout(playAydio, 1000, currentCard.audioSrc);
        }

        let correctCard = event.target.closest('.card__container');
        correctCard.classList.add('disable');

        addMarks(true);
        playAydio('assets/audio/correct.mp3');

      } else {
        addMarks(false);
        wrongClick = wrongClick + 1;
        playAydio('assets/audio/wrong.mp3');

      }
      return countClick;
    };
    return randomCardsArray;
  };

  const startGameBtn = document.querySelector('.start__game_btn');

  startGameBtn.addEventListener('click', () => {
    countClick = 0;
    wrongClick = 0;
    rightClick = 0;

    let randomCards = getRandomCards(cards.data, HASH);
    let randomCard = randomCards[countClick];
    playAydio(randomCard.audioSrc);
  });
};

switchInput.addEventListener('click', () => {
  isGameStarted = false;

  if (!isGameModePlay) {
    gameModeTrain.classList.add('hide');
    gameModePlay.classList.remove('hide');
    isGameModePlay = true;
  } else {
    if (HASH !== '') {
      refresh();
    }
    gameModeTrain.classList.remove('hide');
    gameModePlay.classList.add('hide');
    isGameModePlay = false;
  }

  changeMode(isGameModePlay);
  changeStartButtons();
});

addGameButtons();
createMarkLine();

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => {
  refresh()
  container.innerHTML = '';
  getHash();
  init();
});
