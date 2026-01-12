import { createTestServer } from '../../testUtils/bootstrapTestServer.js';

describe('GraphQL Weather Query', () => {
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

  it('should return weather forecast list for a valid city', async () => {
    const query = `
      query {
        getWeatherForecast(city: "Cape Town") {
          date
          temperature
          windspeed
          weatherCode
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
    expect(Array.isArray(data.getWeatherForecast)).toBe(true);

    if (data.getWeatherForecast.length > 0) {
      expect(data.getWeatherForecast[0]).toHaveProperty('temperature');
    }
  });

  it('should return empty list for an invalid city', async () => {
    const query = `
      query {
        getWeatherForecast(city: "InvalidCityName!!") {
          date
          temperature
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
    expect(data.getWeatherForecast).toEqual([]);
  });
});
