const numbersBtn = document.querySelectorAll ('.number');
const operationsBtn = document.querySelectorAll ('.operator');
const decimalBtn = document.getElementById ('decimal');
const clearBtns = document.querySelectorAll ('.clear-btn');
const display = document.getElementById ('display');
const plusMinusBtn = document.getElementById ('plus-minus');

let MemoryCurrentNumber = 0 ; //текуцее значение
let MemoryNewNumber = false; //ввели новое число или нет
let MemoryPendingOperation = ''; //операция, которая ожидается

for (var i=0; i < numbersBtn.length; i++) {

  var numberBtn = numbersBtn[i];

  numberBtn.addEventListener('click', (event) => {
    numberPress (event.target.textContent);
  });
}

for (var i=0; i < operationsBtn.length; i++) {
  var operationBtn = operationsBtn[i];
  operationBtn.addEventListener('click', (event) => {
    operation(event.target.textContent);
  });

}

for (var i=0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', (event) => {
    clear(event.target.id);
  });
};

decimalBtn.addEventListener('click', decimal);

plusMinusBtn.addEventListener ('click', (event) => {
  plusMinus (event.target.textContent);
});

function plusMinus() {
  return display.value = - +(display.value);;
} 

function numberPress(number) {
  if (MemoryNewNumber){
    display.value = number;
    MemoryNewNumber = false;
  } else{
    if (display.value === '0') {
      display.value = number;
    } else{
      display.value += number;
    };
  };

};

function operation(op) {
  let localOperationMemory = display.value;

  if (MemoryNewNumber && 
      MemoryPendingOperation !== '=' && 
      MemoryPendingOperation !== '√x' &&
      MemoryPendingOperation !== '+/-'
    ) {
      display.value = Math.round(MemoryCurrentNumber * 1000000) / 1000000;
    } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === 'xn') {
      if (+localOperationMemory < 1 && 0 < +localOperationMemory){
        MemoryCurrentNumber = +Math.pow(Math.abs(MemoryCurrentNumber), localOperationMemory);
      } else {
        MemoryCurrentNumber = +Math.pow(MemoryCurrentNumber, localOperationMemory);
      }
    } else if (op === '√x') {
      if (+localOperationMemory <= 0){
        return display.value = 'Error';
      } else {
        MemoryCurrentNumber = +Math.sqrt(+localOperationMemory);
      }
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }

    display.value = Math.round(MemoryCurrentNumber * 1000000) / 1000000;
    MemoryPendingOperation = op;
  }
};


function clear(id) {
  if (id === 'ce') {
    display.value = 0;
    MemoryNewNumber = 'true';
  } else {
    MemoryNewNumber = 'true';
    display.value = 0;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
};

function decimal() {
  let localOperationMemory = display.value;

  if(MemoryNewNumber) {
    localOperationMemory = '0.'
    MemoryNewNumber = false;
  } else {
    if(localOperationMemory.indexOf('.') === -1){
      localOperationMemory += '.'
    }
  };

  display.value = localOperationMemory;
};


