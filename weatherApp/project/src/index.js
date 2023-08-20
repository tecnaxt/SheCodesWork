let date = document.querySelector("#current-date");
let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
date.innerHTML = `${weekdays[now.getDay()]}, ${now.getDate()} ${
  months[now.getMonth()]
}`;

let time = document.querySelector("#current-time");
let minutes = now.getMinutes();
let hours = now.getHours();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

time.innerHTML = `${hours}:${minutes}`;

function fetchForecast(coordinates) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(displayForecast);
}

function updateCityInfo(response) {
  console.log(response);
  let cityName = document.querySelector("#city-name");
  let nowTemp = document.querySelector(".nowTemp");
  let minTemp = document.querySelector("#min");
  let maxTemp = document.querySelector("#max");
  let humid = document.querySelector("#humid");
  let windSpeed = document.querySelector("#wind");
  let descriptor = document.querySelector("#weatherDescription");
  let iconElement = document.querySelector("#mainWeatherIcon");

  cityName.innerHTML = response.data.name + ", " + response.data.sys.country;
  nowTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min) + "°";
  maxTemp.innerHTML = Math.round(response.data.main.temp_max) + "°";
  humid.innerHTML = response.data.main.humidity + "%";
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + " Km/H";
  descriptor.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  fetchForecast(response.data.coord);
}

function formatDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return weekdays[forecastDate.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast-columns");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (`${index}` < 5) {
      forecastHTML += `
                  <div class="col-2 col">
                  <strong>${formatDay(day.dt)}</strong>
                  <br />
                  <img
                    id="rangeWeatherIcon"
                    src="https://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }@2x.png"
                  />
                  <br />
                  <span class="range">
                    <span class="rangeMin">${Math.round(day.temp.min)}°</span>|
                    <span class="rangeMax">${Math.round(day.temp.max)}°</span>
                  </span>
                </div>
            `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchInputCity(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(updateCityInfo);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  searchInputCity(cityInput.value);
}

function currentLocationButton(position) {
  console.log(position);
  let lat = `${position.coords.latitude}`;
  let long = `${position.coords.longitude}`;
  let apiKey2 = "f3009e4852fa0a079dab291dabf020c4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey2}`;

  axios.get(url).then(updateCityInfo);
}

function getCurrLocat() {
  navigator.geolocation.getCurrentPosition(currentLocationButton);
}

function changeTheme(event) {
  event.preventDefault();
  let btnText = document.querySelector(".modeBtn");
  let swapStylesheet = document.querySelector(".theme-sheet");

  if (btnText.textContent.trim() === "Dark Mode") {
    swapStylesheet.setAttribute("href", "src/darkMode.css");
    btnText.textContent = "Light Mode";
  } else if (btnText.textContent === "Light Mode") {
    swapStylesheet.setAttribute("href", "src/styles.css");
    btnText.textContent = "Dark Mode";
  }
}

let currLocatButton = document.querySelector(".currLocatButton");
currLocatButton.addEventListener("click", getCurrLocat);

let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSearch);

let ModeButton = document.querySelector(".modeBtn");
ModeButton.addEventListener("click", changeTheme);

searchInputCity("Polokwane");
