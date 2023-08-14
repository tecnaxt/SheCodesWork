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
  celsTemp = response.data.main.temp;
  miniTemp = response.data.main.temp_min;
  maxiTemp = response.data.main.temp_max;

  celsUnit.classList.add("active");
  fahrUnit.classList.remove("active");

  cityName.innerHTML = response.data.name + ", " + response.data.sys.country;
  nowTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min)+ "°" ;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max) + "°";
  humid.innerHTML = response.data.main.humidity + "%";
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + " Km/H";
  descriptor.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function convertToFahr(event) {
  event.preventDefault();
  let convertedFahrTemp = document.querySelector(".nowTemp");
  let convertedFahrMin = document.querySelector("#min");
  let convertedFahrMax = document.querySelector("#max");
  let fahrFormula = (celsTemp * 9) / 5 + 32;
  let fahrMin = (miniTemp * 9) / 5 + 32;
  let fahrMax = (maxiTemp * 9) / 5 + 32;

  celsUnit.classList.remove("active");
  fahrUnit.classList.add("active");
  convertedFahrTemp.innerHTML = Math.round(fahrFormula);
  convertedFahrMin.innerHTML = Math.round(fahrMin) + "°";;
  convertedFahrMax.innerHTML = Math.round(fahrMax) + "°";;
}

function convertToCels(event) {
  let convertedCelsTemp = document.querySelector(".nowTemp");
  let convertedCelsMin = document.querySelector("#min");
  let convertedCelsMax = document.querySelector("#max");

  celsUnit.classList.add("active");
  fahrUnit.classList.remove("active");
  convertedCelsTemp.innerHTML = Math.round(celsTemp);
  convertedCelsMin.innerHTML = Math.round(miniTemp) + "°";;
  convertedCelsMax.innerHTML = Math.round(maxiTemp) + "°";;
}

let fahrUnit = document.querySelector("#fahr-link");
fahrUnit.addEventListener("click", convertToFahr);

let celsUnit = document.querySelector("#cels-link");
celsUnit.addEventListener("click", convertToCels);

let celsTemp = null;
let miniTemp = null;
let maxiTemp = null;

let currLocatButton = document.querySelector(".currLocatButton");
currLocatButton.addEventListener("click", getCurrLocat);

let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSearch);

searchInputCity("Polokwane");
