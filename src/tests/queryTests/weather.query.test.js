import { createTestServer } from '../../testUtils/bootstrapTestServer.js';
import fetch from 'node-fetch';

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

  it('should return weather forecast for a valid city', async () => {
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
    expect(data.getWeatherForecast).toBeInstanceOf(Array);
    expect(data.getWeatherForecast[0]).toHaveProperty('temperature');
  });
});
