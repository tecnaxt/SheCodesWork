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
console.log(descriptor)

  cityName.innerHTML = response.data.name + ", " + response.data.sys.country;
  nowTemp.innerHTML = Math.round(response.data.main.temp) + "°C";
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  humid.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  descriptor.innerHTML = response.data.weather[0].description;
   
}

function searchInputCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  //let cityName = document.querySelector("#city-name");
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  console.log(`${cityInput.value}`);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;

  axios.get(url).then(updateCityInfo);
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

let currLocatButton = document.querySelector(".currLocatButton");
currLocatButton.addEventListener("click", getCurrLocat);

let search = document.querySelector("#search-form");
search.addEventListener("click", searchInputCity);
