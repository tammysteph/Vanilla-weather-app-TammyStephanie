function formatDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let minutes = now.getMinutes();
  let hours = now.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDate = `${day} ${hours}:${minutes}, ${month} ${now.getDate()}, ${now.getFullYear()}`;

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = formattedDate;
}

formatDate();

function forecastDays() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDayNumber = now.getDay();

  let dayPlusOne = days[(currentDayNumber + 1) % 7];
  let forecastDay1 = document.querySelector("#dayPlusOne");
  forecastDay1.innerHTML = dayPlusOne;

  let dayPlusTwo = days[(currentDayNumber + 2) % 7];
  let forecastDay2 = document.querySelector("#dayPlusTwo");
  forecastDay2.innerHTML = dayPlusTwo;

  let dayPlusThree = days[(currentDayNumber + 3) % 7];
  let forecastDay3 = document.querySelector("#dayPlusThree");
  forecastDay3.innerHTML = dayPlusThree;

  let dayPlusFour = days[(currentDayNumber + 4) % 7];
  let forecastDay4 = document.querySelector("#dayPlusFour");
  forecastDay4.innerHTML = dayPlusFour;

  let dayPlusFive = days[(currentDayNumber + 5) % 7];
  let forecastDay5 = document.querySelector("#dayPlusFive");
  forecastDay5.innerHTML = dayPlusFive;

  let dayPlusSix = days[(currentDayNumber + 6) % 7];
  let forecastDay6 = document.querySelector("#dayPlusSix");
  forecastDay6.innerHTML = dayPlusSix;
}

forecastDays();

/////

function getTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${temperature}`;
  let currentWeather = document.querySelector("#current-weather");
  let searchedWeather = response.data.condition.description;
  currentWeather.innerHTML = `Weather: ${searchedWeather}`;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = currentHumidity;
  let windSpeed = document.querySelector("#wind-speed");
  let currentWind = response.data.wind.speed;
  windSpeed.innerHTML = currentWind;
  let showCity = document.querySelector("#current-city");
  let currentCity = response.data.city;
  showCity.innerHTML = currentCity;
  let mainWeatherIcon = document.querySelector("#main-icon");
  let currentWeatherIcon = response.data.condition.icon_url;
  mainWeatherIcon.innerHTML = `<img src="${currentWeatherIcon}" width="70px" />`;
}

let apiKey = "40650d4bb3o2af2ba3e724cb1t7e50cb";
let cityInput = document.querySelector("#city-input");

function executeTemp(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", executeTemp);
