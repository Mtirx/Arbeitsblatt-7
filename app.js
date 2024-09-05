const apiKey = 'e3d6dce0e5f3b7fec01b1c155425527e';
const locationInput = document.getElementById('location-input');
const addLocationBtn = document.getElementById('add-location');
const locationsTable = document.getElementById('locations-table');

addLocationBtn.addEventListener('click', async () => {
    const location = locationInput.value;
    if (location) {
        const weatherData = await fetchWeatherData(location);
        if (weatherData) {
            addLocationToTable(location, weatherData);
        } else {
            alert('Location not found or API error');
        }
    }
    locationInput.value = '';
});


async function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            return {
                temp: data.main.temp,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}


function addLocationToTable(location, weatherData) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${location}</td>
        <td>${weatherData.temp}°C</td>
        <td>${weatherData.temp_min}°C</td>
        <td>${weatherData.temp_max}°C</td>
        <td><span class="trash-icon" onclick="removeLocation(this)">🗑️</span></td>
    `;
    
    locationsTable.appendChild(row);
}


function removeLocation(element) {
    const row = element.parentNode.parentNode;
    locationsTable.removeChild(row);
}
