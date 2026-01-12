import { createTestServer } from '../../testUtils/bootstrapTestServer.js';

describe('GraphQL City Query', () => {
  let url;
  let server;

  beforeAll(async () => {
    const serverInfo = await createTestServer();
    url = serverInfo.url;
    server = serverInfo.server;
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should return suggested cities for a partial query', async () => {
    const query = `
      query {
        suggestCities(query: "cape") {
          name
          country
          latitude
          longitude
        }
      }
    `;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const { data, errors } = await response.json();

    expect(errors).toBeUndefined();
    expect(Array.isArray(data.suggestCities)).toBe(true);

    if (data.suggestCities.length > 0) {
      expect(data.suggestCities[0]).toHaveProperty('name');
      expect(data.suggestCities[0]).toHaveProperty('latitude');
      expect(data.suggestCities[0]).toHaveProperty('longitude');
    }
  });
});
