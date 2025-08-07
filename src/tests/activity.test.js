import { getRankedActivities } from '../services/activityService.js';

describe('getRankedActivities', () => {
  it('should return ranked activities for a valid city', async () => {
    const result = await getRankedActivities('Cape Town');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(activity => {
      expect(activity).toHaveProperty('name');
      expect(activity).toHaveProperty('score');
      expect(activity).toHaveProperty('reason');
    });
  });

  it('should return an empty array for an invalid city', async () => {
    const result = await getRankedActivities('InvalidCity!!');
    expect(result).toEqual([]);
  });
});
