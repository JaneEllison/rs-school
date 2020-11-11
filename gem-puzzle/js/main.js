'use strict';

const field = document.querySelector('.field');
const cellSize = 100;

const empty = {
  top: 3,
  left: 3
};

const cells = [];
cells.push(empty);

function move(index) {

  const cell = cells[index+1];
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
}

for (let i = 0; i < 15; i++) {
  const cell = document.createElement ('div'); 
  cell.className = 'cell';
  cell.innerHTML = i+1;

  const left = i % 4;
  const top = (i - left) / 4;
  
  cells.push ({
    left: left,
    top: top,
    element: cell
  });

  cell.style.left = `${left * cellSize}px`;
  cell.style.top = `${top * cellSize}px`;

  field.append(cell);

  cell.addEventListener ('click', () => {
    move(i);
  })
  
};