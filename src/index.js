// the current date and time
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${minutes}`;
}
document.querySelector("#time-day").innerHTML = `${day}    ${hour}:${min}`;

let date = now.getDate();
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
let month = months[now.getMonth()];
document.querySelector("#date").innerHTML = `${date} ${month}`;

// city searching
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  console.log(searchInput.value);

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `Searching for ${searchInput.value}...`;
  } else {
    h1.innerHTML = "null";
    alert(`Please, type a city`);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// convert to celsius or to fahrenheit

function transferToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", transferToFahrenheit);

function transferToCelsium(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 10;
}

let celsiumUnit = document.querySelector("#celsium-unit");
celsiumUnit.addEventListener("click", transferToCelsium);

// getting temperature for current location

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  let realTemp = document.querySelector("#temperature");
  let showWindHumidity = document.querySelector("#weather-details");
  let showDescription = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  h1.innerHTML = `Current temperature in ${city} is `;
  realTemp.innerHTML = `${temperature}`;
  showWindHumidity.innerHTML = `Humidity: ${humidity} % | Wind: ${wind} m/s`;
  showDescription.innerHTML = `Today it is ${description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "dc5fc09d21598fed891ba9762b2f9c32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentPosition);

//
