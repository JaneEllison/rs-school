'use strict';
const cellSize = 100;
let field = document.createElement ('div');
let numbers = [...Array(15).keys()];
let seconds = 0;
let timerOn = false;
let moveCount = 0;
let moveCountOn = false;
let timeFinish = '';
let soundOn = false;

//create elements
const createElements = () => {
  const wrapper = document.createElement ('div');
  const navigation = document.createElement ('div');
  const buttonRestart = document.createElement ('button');
  const buttonSound = document.createElement ('button');
  const info = document.createElement ('div');
  const soundElement = document.createElement ('div');
  
  //add class for elements
  wrapper.classList.add ('wrapper');
  navigation.classList.add ('navigation');
  buttonRestart.classList.add ('button', 'btn__restart');
  buttonSound.classList.add ('button', 'btn__sound', 'on');
  info.classList.add ('info');
  field.classList.add ('field');
  soundElement.classList.add ('play-sound');
  soundElement.classList.add ('hidden');
  
  //add text in button
  buttonRestart.innerText = 'Start';
  buttonSound.innerHTML = `<i class="material-icons">music_note</i>`;;
  info.innerHTML = `
  <span class="time">Time: 00:00:00</span>
  <span class = 'moves'>Moves: ${moveCount}</span>`;
  soundElement.innerHTML = `<audio class="audio" src="./assets/sound/move.mp3"></audio>`
  
  //add Childs
  document.body.append(wrapper);
  wrapper.append (navigation, info, field, soundElement);
  navigation.append (buttonRestart, buttonSound);  
};

//init game
const init = () => {
  createElements();
  createField();

  const buttonSound = document.querySelector('.btn__sound');
  const buttonRestart = document.querySelector('.btn__restart');

  buttonSound.addEventListener ('click', () => {
  buttonSound.classList.toggle ('on');

  if(buttonSound.classList.contains ('on')){
    buttonSound.innerHTML = `<i class="material-icons">music_note</i>`;;
  } else {
    buttonSound.innerHTML = `<i class="material-icons">music_off</i>`;;
  }
  });

  buttonRestart.addEventListener('click', () => {
  buttonRestart.innerText = 'Restart';
  field.textContent = '';
  moveCount = 0;
  let moves = document.querySelector ('.moves')
  moves.innerHTML = `Moves: ${moveCount}`;
  startNewGame();
  });
}

//create field
function createField () {
  //cell move
  function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);
    const buttonSound = document.querySelector('.btn__sound');
  

    if (leftDiff + topDiff > 1) {
      return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cell.left;
    empty.top = cell.top;

    cell.left = emptyLeft;
    cell.top = emptyTop;

    if (!timerOn) {
      timerOn = true;
      setTimer()
    }

    if(buttonSound.classList.contains ('on')){
      setSound();
    }

    //end og the game
    const isFunished = cells.every(cell => {
      return cell.value  === cell.top * 4 + cell.left;
    });

    if (isFunished) {
      alert(`Поздравляю! Вы выйграли. Ваш результат: Time: ${timeFinish}. Moves: ${moveCount}. `);
    }
  };

  //empty cell
  const empty = {
    value: 15,
    top: 3,
    left: 3
  };

  //create calls array
  const cells = [];

  for (let i = 0; i < 15; i++) {
    const cell = document.createElement ('div');
    const value = numbers[i];

    cell.className = 'cell';
    cell.innerHTML = value + 1;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push ({
      id: i,
      value: value,
      left: left,
      top: top,
      element: cell
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field.append(cell);

    cell.addEventListener ('click', () => {
      move(i);
      setMoves();
    });
  };

  addBg ();

  function addBg () {
    let urlBg = `../gem-puzzle/assets/img/bg.jpg`;
  
    for (let i = 0; i < 15; i++) {
      let cell = cells[i]; 
      let idBg = +cell.value;
  
      let bgTop = Math.floor(idBg / 4) * cellSize;
      let bgLeft = (idBg % 4) * cellSize;

      cell.element.style.background = `url(${urlBg})`;
      cell.element.style.backgroundSize = "400px";
      cell.element.style.backgroundPosition = `left -${bgLeft}px top -${bgTop}px`;
    }
  };

  cells.push(empty);
}; 

function startNewGame() {
  randomSort(numbers);
  createField();

  if (timerOn) {
    timerZeroed();    
  } else {
    timerOn = true;
    setTimer()
  }

  if (moveCountOn) {
    let moves = document.querySelector ('.moves')
    moves.innerHTML = `Moves: ${moveCount}`;
  } else {
    moveCountOn = true;
  }
}

function randomSort (numbers) {
  numbers.sort(() => Math.random() - 0.5);
  let sum = 1;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i; j < numbers.length; j++) {
      if (numbers[i] > numbers[j]) {
        sum++;
      }
    }
  }

  sum++;
  
  if (sum % 2 === 0) {
    return numbers;
  } else {
    randomSort(numbers);
  } 
     
  return numbers;
};

function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

function setTimer () {
  const time = document.querySelector ('.time');
  let hour = parseInt(seconds / 3600 % 24);
  let min = parseInt(seconds / 60 % 60);
  let sec = parseInt(seconds % 60);
  time.innerHTML = `Time: ${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  timeFinish = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;

  seconds++;
  let timeout = setTimeout(setTimer, 1000);
};

function timerZeroed() {
  const time = document.querySelector ('.time');
  seconds = 0;
  time.innerHTML = "Time: 00:00:00";
};

function setMoves () {
  let moves = document.querySelector ('.moves')
 
  moveCount += 1;
  moves.innerHTML = `Moves: ${moveCount}`;
};

function setSound () {
  const audio = document.querySelector(".audio");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
};

window.addEventListener('DOMContentLoaded', init);

