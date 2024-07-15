const apiKey = '0830e2cfad884b1c913184454240907';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

const locationInputElement = document.getElementById('location-input');
const searchButtonElement = document.getElementById('search-button');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');
const weatherIconContainerElement = document.getElementById('weather-icon-container');
const containerElement = document.getElementById('container');
const weatherInfoElement = document.getElementById('weather-info');

searchButtonElement.addEventListener('click', () => {
    const location = locationInputElement.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?key=${apiKey}&q=${location}`;

    fetch(url)
       .then(response => response.json())
       .then(data => {
            const weatherCondition = data.current.condition.text;
            const weatherIconUrl = data.current.condition.icon;

            locationElement.textContent = data.location.name;
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            descriptionElement.textContent = weatherCondition;
            weatherIconElement.src = weatherIconUrl;

            // Add animation effects
            containerElement.classList.add('animate');
            weatherInfoElement.classList.add('animate');
            weatherIconContainerElement.classList.add('animate');

            // Add color schemes based on weather conditions
            switch (weatherCondition) {
                case 'Clear':
                    document.body.classList.add('sunny');
                    break;
                case 'Cloudy':
                    document.body.classList.add('cloudy');
                    break;
                case 'Rain':
                case 'Drizzle':
                case 'Mist':
                    document.body.classList.add('rainy');
                    break;
                case 'Snow':
                    document.body.classList.add('snowy');
                    break;
                default:
                    document.body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
            }
        })
       .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}