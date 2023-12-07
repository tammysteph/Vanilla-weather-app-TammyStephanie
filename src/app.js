function getTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  currentTemperature.innerHTML = `${temperature}`;
  let currentWeather = document.querySelector("#current-weather");
  let searchedWeather = response.data.condition.description;
  currentWeather.innerHTML = `Weather: ${searchedWeather}`;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  let currentWind = response.data.wind.speed;
  windSpeed.innerHTML = `${currentWind} km/h`;
  let showCity = document.querySelector("#current-city");
  let currentCity = response.data.city;
  showCity.innerHTML = currentCity;
  let mainWeatherIcon = document.querySelector("#main-icon");
  let currentWeatherIcon = response.data.condition.icon_url;
  mainWeatherIcon.innerHTML = `<img src="${currentWeatherIcon}" width="80px" />`;
  let dateElement = document.querySelector("#current-day");
  let localDate = new Date(response.data.time * 1000);
  dateElement.innerHTML = formatDate(localDate);

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

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
  let month = months[date.getMonth()];

  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
}

function executeTemp(city) {
  let apiKey = "40650d4bb3o2af2ba3e724cb1t7e50cb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function handleSearchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  executeTemp(cityInput.value);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSearchInput);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "40650d4bb3o2af2ba3e724cb1t7e50cb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast-section");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${
          day.condition.icon_url
        }" class="weather-forecast-icon" width="80px" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }

    forecast.innerHTML = forecastHtml;
  });
}

executeTemp("Rome");
