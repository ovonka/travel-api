import { getWeatherForecast } from '../../services/weatherService.js';

describe('getWeatherForecast (service)', () => {
  it('should return weather data object for a valid city', async () => {
    const result = await getWeatherForecast('Cape Town');

    expect(result).not.toBeNull();
    expect(result).toHaveProperty('latitude');
    expect(result).toHaveProperty('longitude');
    expect(result).toHaveProperty('forecast');
    expect(Array.isArray(result.forecast)).toBe(true);
  });

  it('should return null for an invalid city', async () => {
    const result = await getWeatherForecast('InvalidCityName!!');
    expect(result).toBeNull();
  });

  it('should return null for an empty city string', async () => {
    const result = await getWeatherForecast('');
    expect(result).toBeNull();
  });
});
