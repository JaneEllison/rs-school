// DOM Elements
const time = document.querySelector ('.time'),
  greeting = document.querySelector ('.greeting'),
  name = document.querySelector ('.name'),
  focus = document.querySelector ('.focus'),
  dayOfTheWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  playIcon = document.querySelector ('.play__icon'),
  weatherIcon =  document.querySelector ('.weather_icon'),
  temperature = document.querySelector('.temperature'),
  humidity = document.querySelector('.humidity'),
  cityInput = document.querySelector('.city'),
  wind = document.querySelector('.wind');


let bgCollection = ['night/04', 'night/18', 'night/09', 'night/07', 'night/08', 'night/19', 'morning/01', 'morning/04', 'morning/18', 'morning/08', 'morning/10', 'morning/12', 'day/02', 'day/04', 'day/05', 'day/20', 'day/09', 'day/12', 'evening/16', 'evening/10', 'evening/18', 'evening/07', 'evening/08', 'evening/19'],
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
      const imagesOfHours = curentBgCollection.slice(6,12);

      imagesOfHours.push(imagesOfHours[0]);
      imagesOfHours.shift();
      curentBgCollection.splice(6, 6, imagesOfHours);
      
      bgCollection = curentBgCollection.flat();
      localStorage.setItem('backgroundCollection', bgCollection);
    } else if (hour >= 12 && hour < 18) {
      const imagesOfHours = curentBgCollection.slice(12, 18);
      
      imagesOfHours.push(imagesOfHours[0]);
      imagesOfHours.shift();

      curentBgCollection.splice(12, 6, imagesOfHours);
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
};

//Get Weather 
async function getWeather() {
  let city = localStorage.getItem('cityInput');

  const API_WEATHER = '91e2628fa9db2e79ace3516645c64da8';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${API_WEATHER}&units=metric`;
  const res = await fetch(url);

  if (!(res.ok)) {
    alert('Try to choose city again, please.');
    cityInput.textContent = '[Enter your city]' ;
    localStorage.setItem ('cityInput', '[Enter your city]');
    temperature.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';
    weatherIcon.style.display = 'none';

  } else {
    const data = await res.json();

    weatherIcon.style.display = 'flex';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed.toFixed(0)} m/s`;
  }
}

// Get City
function getCity() {
  if(localStorage.getItem('cityInput') === null) {
    cityInput.textContent = '[Enter your city]' ;
    localStorage.setItem ('cityInput', '[Enter your city]');
  } else {
    cityInput.textContent = localStorage.getItem('cityInput');
  }
  getWeather();
};

//Set City 
function setCity(event) {
  if (event.type === 'keypress') {
    //Make sure enter is pressed
    if (event.which == 13 || event.keyCode == 13) {
      if (event.target.innerText.trim() === '') {
        event.preventDefault();
        cityInput.textContent = localStorage.getItem('cityInput');
      } else {
        localStorage.setItem('cityInput', event.target.innerText);
        cityInput.blur();
      }
    }
  } else {
    if (event.target.innerText.trim() === '') {
      cityInput.textContent = localStorage.getItem('cityInput');
    } else {
      localStorage.setItem('cityInput', event.target.innerText);
      cityInput.blur();
    }
    getWeather();
  }

}

cityInput.addEventListener('keypress', setCity);
cityInput.addEventListener('blur', setCity);
cityInput.addEventListener('click', (event) => {
  event.target.innerText = '';
  cityInput.focus();
})

//Run
showTime();
getName();
getFocus();
getCity();
