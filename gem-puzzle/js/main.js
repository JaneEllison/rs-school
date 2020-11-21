'use strict';
//создание элементов
const wrapper = document.createElement ('div');
const navigation = document.createElement ('div');
const buttonRestart = document.createElement ('button');
const buttonSound = document.createElement ('button');
const info = document.createElement ('div');

const cellSize = 100;
let field = document.createElement ('div');
let numbers = [...Array(15).keys()];
let seconds = 0;
let timerOn = false;
let moveCount = 0;
let moveCountOn = false;
let timeFinish = '';

//добавление элементам классов
wrapper.classList.add ('wrapper');
navigation.classList.add ('navigation');
buttonRestart.classList.add ('button', 'btn__restart');
buttonSound.classList.add ('button', 'btn__sound');
info.classList.add ('info');
field.classList.add ('field');

//добавление в кнопки текста
buttonRestart.innerText = 'Start';
buttonSound.innerHTML = `<i class="material-icons">music_note</i>`;;
info.innerHTML = `
<span class="time">Time: 00:00:00</span>
<span class = 'moves'>Moves: ${moveCount}</span>`;

//добавление родительских эл-тов
document.body.appendChild(wrapper);
wrapper.appendChild (navigation);
wrapper.appendChild (info);
wrapper.appendChild (field);
navigation.appendChild (buttonRestart);
navigation.appendChild (buttonSound);

//создание самого поля
function createField () {
  //движение ячейки
  function move(index) {
    const cell = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

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

    //конец игры
    const isFunished = cells.every(cell => {
      return cell.value  === cell.top * 4 + cell.left;
    });

    if (isFunished) {
      alert(`Поздравляю! Вы выйграли. Ваш результат: ${timeFinish}. Moves: ${moveCount}. `);
    }
  };
  
  //пустая ячейка
  const empty = {
    value: 15,
    top: 3,
    left: 3
  };

  //создание массива ячеек
  const cells = [];

  for (let i = 0; i < 15; i++) {
    //значение ячейки
    const cell = document.createElement ('div');
    const value = numbers[i];

    cell.className = 'cell';
    cell.innerHTML = value + 1;

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push ({
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
  timeFinish = time.innerHTML;

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
}

window.addEventListener('DOMContentLoaded', createField);
buttonRestart.addEventListener('click', () => {
  buttonRestart.innerText = 'Restart';
  field.textContent = '';
  moveCount = 0;
  let moves = document.querySelector ('.moves')
  moves.innerHTML = `Moves: ${moveCount}`;
  startNewGame();
});

