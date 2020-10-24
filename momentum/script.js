// DOM Elements
const time = document.querySelector ('.time'),
  greeting = document.querySelector ('.greeting'),
  name = document.querySelector ('.name'),
  focus = document.querySelector ('.focus'),
  dayOfTheWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  playIcon = document.querySelector ('.play__icon');

let bgCollection = ['night/01', 'night/03', 'night/09', 'night/07', 'night/15', 'night/18', 'morning/01', 'morning/03', 'morning/04', 'morning/07', 'morning/09', 'morning/11', 'day/02', 'day/04', 'day/06', 'day/08', 'day/10', 'day/12', 'evening/05', 'evening/10', 'evening/13', 'evening/15', 'evening/17', 'evening/03'],
  bgIndex,
  startHours;

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
  time.innerHTML = `<span id='hours'>${addZero(hour)}</span><span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} <br> ${monthes[month]} ${day}<span>, </span>${dayOfTheWeeks[dayOfTheWeek]}`;
};

//Add Zero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0': '') + n;
};

setInterval(()=> {showTime(); changeBg()}, 1000);

//Change Background
function changeBg() {
  let curentHoursElement = document.getElementById('hours');
  let curentHours = curentHoursElement.textContent;
  if (startHours != curentHours) {
    startHours = curentHours;
    setBackground();
  }
};

function saveStartHours(){
  let today = new Date();
  return today.getHours();
}

//Set Background

function setBackground() {
  showRandomImages();

  let today = new Date(),
    hour = today.getHours();
  
  bgIndex = hour;

  if(hour >= 6 && hour < 12 ) {
    const img = document.createElement('img');
    img.src = `./assets/images/${bgCollection[hour]}.jpg`;

    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`
    }
    greeting.textContent = 'Good Morning,';  
  } else if (hour >= 12 && hour < 18) {
    const img = document.createElement('img');
    img.src = `./assets/images/${bgCollection[hour]}.jpg`;

    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`
    }
    greeting.textContent = 'Good Day,';  
  } else if (hour >= 18 && hour <= 23) {
    const img = document.createElement('img');
    img.src = `./assets/images/${bgCollection[hour]}.jpg`;

    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`
    }
    greeting.textContent = 'Good Evening,';  
  } else {
    const img = document.createElement('img');
    img.src = `./assets/images/${bgCollection[hour]}.jpg`;

    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`
    }
    greeting.textContent = 'Good Night,';  
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

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', (event) => {
  event.target.innerText = '';
  focus.focus();
});

//Show all Bg-s
playIcon.addEventListener ('click', () =>{
  bgIndex += 1;

  if (bgIndex === 24) {
    bgIndex = 0;
  }

  const img = document.createElement('img');
  img.src = `./assets/images/${bgCollection[bgIndex]}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  };
})

//show Random bg
function showRandomImages() {
  let curentBgCollection = localStorage.getItem('backgroundCollection');

  if(!curentBgCollection) {
    localStorage.setItem('backgroundCollection', bgCollection);
  } else {
    curentBgCollection = curentBgCollection.split(',');
    const hour = new Date ().getHours();

    if(hour >= 6 && hour < 12 ) {
      const imagesOfHours = curentBgCollection.slice(6,13);

      imagesOfHours.push(imagesOfHours[0]);
      imagesOfHours.shift();
      curentBgCollection.splice(6, 7, imagesOfHours);

      bgCollection = curentBgCollection.flat();
      localStorage.setItem('backgroundCollection', bgCollection);
    } else if (hour >= 12 && hour < 18) {
      const imagesOfHours = curentBgCollection.slice(13, 18);
      
      imagesOfHours.push(imagesOfHours[0]);
      imagesOfHours.shift();

      curentBgCollection.splice(13, 5, imagesOfHours);
      bgCollection = curentBgCollection.flat();
      localStorage.setItem('backgroundCollection', bgCollection);
    } else if (hour >= 18 && hour <= 23) {
      const imagesOfHours = curentBgCollection.slice(18);

      imagesOfHours.push(imagesOfHours[0]);
      imagesOfHours.shift();

      curentBgCollection.splice(18, 6, imagesOfHours);
      bgCollection = curentBgCollection.flat();
      localStorage.setItem('backgroundCollection', bgCollection);
    } else {
      const imagesOfHours = curentBgCollection.slice(0, 6);

      imagesOfHours.push(imagesOfHours[0]);
      imagesOfHours.shift();

      curentBgCollection.splice(0, 6, imagesOfHours);
      bgCollection = curentBgCollection.flat();
      localStorage.setItem('backgroundCollection', bgCollection);
    }
  }
}

//Run
showTime();
setBackground();
getName();
getFocus();