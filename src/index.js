function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windspeedElement = document.querySelector("#wind-speed");
	let timeElement = document.querySelector("#time");
	let date = new Date(response.data.time * 1000);
	let iconElement = document.querySelector("#icon");

	cityElement.innerHTML = response.data.city;
	timeElement.innerHTML = formatDate(date);
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
	temperatureElement.innerHTML = Math.round(temperature);
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function formatDate(date) {
	let minutes = date.getMinutes();
	let hours = date.getHours();
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
	if ((minutes, 10)) {
		minutes = `${minutes}`;
	}
	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	let apiKey = "80a798345to071a9579b530bbe0bf192";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
	axios.get(apiUrl).then(refreshWeather);
}
function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");
	searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("London");
