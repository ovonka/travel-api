import { createTestServer } from '../../testUtils/bootstrapTestServer.js';

describe('GraphQL Activity Query', () => {
  let server;
  let url;

  beforeAll(async () => {
    ({ server, url } = await createTestServer());
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return ranked activities for a given city', async () => {
    const query = `
      query GetRankedActivities($city: String!) {
        getRankedActivities(city: $city) {
          name
          score
          reason
        }
      }
    `;

    const variables = { city: 'Cape Town' };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await res.json();

    expect(errors).toBeUndefined();
    expect(Array.isArray(data.getRankedActivities)).toBe(true);
    expect(data.getRankedActivities.length).toBeGreaterThan(0);

    const first = data.getRankedActivities[0];
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('score');
    expect(typeof first.score).toBe('number');
  });

  it('should return empty list for an invalid city', async () => {
    const query = `
      query GetRankedActivities($city: String!) {
        getRankedActivities(city: $city) {
          name
          score
          reason
        }
      }
    `;

    const variables = { city: 'InvalidCity!!' };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await res.json();

    expect(errors).toBeUndefined();
    expect(data.getRankedActivities).toEqual([]);
  });
});
