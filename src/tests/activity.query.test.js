import { createTestServer } from '../testUtils/bootstrapTestServer.js';
import fetch from 'node-fetch';

let server;
let url;

beforeAll(async () => {
  ({ server, url } = await createTestServer());
});

afterAll(async () => {
  await server.stop();
});

describe('GraphQL Activity Query', () => {
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

    const variables = { city: "Cape Town" };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await res.json();

    expect(errors).toBeUndefined();
    expect(data.getRankedActivities).toBeInstanceOf(Array);
    expect(data.getRankedActivities.length).toBeGreaterThan(0);
    expect(data.getRankedActivities[0]).toHaveProperty('name');
    expect(data.getRankedActivities[0]).toHaveProperty('score');
    expect(typeof data.getRankedActivities[0].score).toBe('number');
  });
});
