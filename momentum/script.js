// но у мен яэто один метод
// где есть условие - если была перезагрузка - то берем рандомную. и запоминаем позицию
// если клик по кнопке  - берем след картинку





// DOM Elements
const time = document.querySelector ('.time'),
  greeting = document.querySelector ('.greeting'),
  name = document.querySelector ('.name'),
  focus = document.querySelector ('.focus'),
  dayOfTheWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    month = today.getMonth(),
    day = today.getDate(),
    dayOfTheWeek = today.getDay();

  //Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} <br> ${monthes[month]} ${day}<span>, </span>${dayOfTheWeeks[dayOfTheWeek]}`;

  setTimeout(showTime, 1000);
};

//Add Zero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0': '') + n;
};

//Set Background

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if(hour < 12 && hour >= 6) {
    //Morning
    document.body.style.backgroundImage = "url('assets/images/morning/01.jpg";
    greeting.textContent = 'Good Morning,';
  
  } else if (hour >= 12 && hour < 18) {
    //Afternoon
    document.body.style.backgroundImage = "url('assets/images/day/01.jpg";
    greeting.textContent = 'Good Day,';

  } else if (hour >= 18 && hour <= 23) {
    //Evening
    document.body.style.backgroundImage = "url('assets/images/evening/01.jpg";
    greeting.textContent = 'Good Evening,';
    
  } else {
    document.body.style.backgroundImage = "url('assets/images/night/01.jpg";
    greeting.textContent = 'Good Nigth,';
    document.body.style.color = 'white';
  }
};

// Get Name
function getName() {
  if(localStorage.getItem('userName') === null) {
    name.textContent = '[Enter your name]' ;
    localStorage.setItem ('userName', '[Enter your name]');
  } else {
    name.textContent = localStorage.getItem('userName');
  }
};

getName();

//Set Name 
function setName(event) {
  if (event.type === 'keypress') {
    //Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
      if (event.target.innerText.trim() === '') {
        event.preventDefault();
        name.textContent = localStorage.getItem('userName');
      } else {
        localStorage.setItem('userName', event.target.innerText);
        name.blur();
      }
    }
  } else {
    if (event.target.innerText.trim() === '') {
      name.textContent = localStorage.getItem('userName');
    } else {
      localStorage.setItem('userName', event.target.innerText);
      name.blur();
    }
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', (event) => {
  event.target.innerText = '';
  name.focus();
})

//Set Focus 
function setFocus(event) {
  if (event.type === 'keypress') {
    //Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) { 
      if (event.target.innerText.trim() === '') {
        event.preventDefault();
        focus.textContent = localStorage.getItem('userFocus');
      } else {
        localStorage.setItem('userFocus', event.target.innerText);
        focus.blur();
      }
    }
  } else {
    if (event.target.innerText.trim() === '') {
      focus.textContent = localStorage.getItem('userFocus');
    } else {
      localStorage.setItem('userFocus', event.target.innerText);
    }
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('userFocus') === null) {
    focus.textContent = '[Enter your focus]';
    localStorage.setItem('userFocus', '[Enter your focus]');
  } else {
    focus.textContent = localStorage.getItem('userFocus');
  }
}

// name.addEventListener('keypress', setName);
// name.addEventListener('blur', setName);
// name.addEventListener('click', (event) => {
//   event.target.innerText = '';
//   name.focus();
// });

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', (event) => {
  event.target.innerText = '';
  focus.focus();
});



//Run
showTime();
setBgGreet();
// getName();
getFocus();