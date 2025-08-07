import { getWeatherForecast } from '../services/weatherService.js';

describe('getWeatherForecast', () => {
  it('should return weather data for a valid city', async () => {
    const result = await getWeatherForecast('Cape Town');
    expect(Array.isArray(result)).toBe(true);
    if (result.length) {
      expect(result[0]).toHaveProperty('date');
      expect(result[0]).toHaveProperty('temperature');
      expect(result[0]).toHaveProperty('windspeed');
      expect(result[0]).toHaveProperty('weatherCode');
    }
  });

  it('should return an empty array for an invalid city', async () => {
    const result = await getWeatherForecast('InvalidCityName!!');
    expect(result).toEqual([]);
  });
});
