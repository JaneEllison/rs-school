// DOM Elements
const time = document.querySelector ('.time'),
  greeting = document.querySelector ('.greeting'),
  name = document.querySelector ('.name'),
  focus = document.querySelector ('.focus');

//Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  //Set AM or PM
  const amPm = hour >=12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  //Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

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

  if(hour < 12 && hour > 6) {
    //Morning
    document.body.style.backgroundImage = "url('assets/images/morning/01.jpg";
    greeting.textContent = 'Good Morning';
  
  } else if (hour >= 12 && hour < 18) {
    //Afternoon
    document.body.style.backgroundImage = "url('assets/images/day/01.jpg";
    greeting.textContent = 'Good Day';

  } else if (hour >= 18 && hour <= 23) {
    //Evening
    document.body.style.backgroundImage = "url('assets/images/evening/01.jpg";
    greeting.textContent = 'Good Evening';
    
  } else {
    document.body.style.backgroundImage = "url('assets/images/night/01.jpg";
    greeting.textContent = 'Good Nigth';
    document.body.style.color = 'white';
  }
};

// Get Name
function getName() {
  if(localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]' ;
  } else {
    name.textContent = localStorage.getItem('name');
  }
};

//Set Name 
function setName(e) {
  if (e.type = 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

//Set Focus 
function setFocus(e) {
  if (e.type = 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if(localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]' ;
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
};

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


//Run
showTime();
setBgGreet();
getName();
getFocus();