import axios from 'axios';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';

export async function getWeatherForecast(city) {
  try {
    const geoResponse = await axios.get(GEOCODING_API, {
      params: { name: city, count: 1 },
    });

    const location = geoResponse.data?.results?.[0];
    if (!location) return [];

    const { latitude, longitude } = location;

    const weatherResponse = await axios.get(FORECAST_API, {
      params: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,windspeed_10m_max,weathercode',
        timezone: 'auto',
      },
    });

    const data = weatherResponse.data.daily;

    return data.time.map((date, index) => ({
      date,
      temperature: data.temperature_2m_max[index],
      windspeed: data.windspeed_10m_max[index],
      weatherCode: data.weathercode[index],
    }));
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    return [];
  }
}
