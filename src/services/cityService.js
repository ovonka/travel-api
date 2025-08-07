import axios from 'axios';
// getting the city suggestions from the Open Meteo API
export const suggestCities = async (query) => {
  const BASE_URL = process.env.OPEN_METEO_BASE_URL || 'https://geocoding-api.open-meteo.com/v1';

  const url = `${BASE_URL}/search?name=${encodeURIComponent(query)}&count=5`;
  try {
    const { data } = await axios.get(url);

    if (!data.results) return [];

    return data.results.map((city) => ({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      country: city.country,
    }));
  } catch (err) {
    console.error('Error fetching city suggestions:', err.message);
    return [];
  }
};
