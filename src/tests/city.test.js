import { suggestCities } from '../services/cityService.js';

describe('City Service', () => {
  it('returns suggestions for a valid city query', async () => {
    const results = await suggestCities('Cape Town');
    expect(Array.isArray(results)).toBe(true);
    if (results.length > 0) {
      expect(results[0]).toHaveProperty('name');
      expect(results[0]).toHaveProperty('latitude');
      expect(results[0]).toHaveProperty('longitude');
    }
  });
});
