import { suggestCities } from '../services/cityService.js';

describe('suggestCities', () => {
  it('should return city suggestions for a valid query', async () => {
    // This test calls the live API, expecting a valid city to return data.
    const results = await suggestCities('Cape Town');
    
    // We expect an array to be returned.
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
    // We test with a query that should not return any results.
    const results = await suggestCities('InvalidCityName!!');
    
    // We expect an empty array in this case.
    expect(results).toEqual([]);
  });

  it('should return an empty array for an empty query', async () => {
    // We test for a case where the user provides an empty string.
    const results = await suggestCities('');

    // We expect no results to be returned.
    expect(results).toEqual([]);
  });
});