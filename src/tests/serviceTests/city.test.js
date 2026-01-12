import { suggestCities } from '../../services/cityService.js';

describe('suggestCities (service)', () => {
  it('should return city suggestions for a valid query', async () => {
    const results = await suggestCities('Cape Town');

    expect(Array.isArray(results)).toBe(true);

    if (results.length > 0) {
      const city = results[0];
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('latitude');
      expect(city).toHaveProperty('longitude');
      expect(city).toHaveProperty('country');
    }
  });

  it('should return an empty array for an invalid query', async () => {
    const results = await suggestCities('InvalidCityName!!');
    expect(results).toEqual([]);
  });

  it('should return an empty array for an empty query', async () => {
    const results = await suggestCities('');
    expect(results).toEqual([]);
  });
});
