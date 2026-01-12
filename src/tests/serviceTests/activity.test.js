import { getRankedActivities } from '../../services/activityService.js';

describe('getRankedActivities (service)', () => {
  it('should return ranked activities for a valid city', async () => {
    const result = await getRankedActivities('Cape Town');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((activity) => {
      expect(activity).toHaveProperty('name');
      expect(activity).toHaveProperty('score');
      expect(activity).toHaveProperty('reason');
      expect(typeof activity.score).toBe('number');
    });
  });

  it('should return an empty array for an invalid city', async () => {
    const result = await getRankedActivities('InvalidCity!!');
    expect(result).toEqual([]);
  });

  it('should return an empty array for an empty city', async () => {
    const result = await getRankedActivities('');
    expect(result).toEqual([]);
  });
});
