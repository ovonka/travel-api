import { createTestServer } from '../testUtils/bootstrapTestServer.js';
import fetch from 'node-fetch';

describe('GraphQL City Query', () => {
    let url;
    let server;

    beforeAll(async () => {
        const serverInfo = await createTestServer();
        url = serverInfo.url;
        server = serverInfo.server;
    });
    afterAll(async () => {
  await server.stop(); // cleanup
})

    it('should return suggested cities for a partial query', async () => {
        const query = `
      query {
  suggestCities(query: "cape") {
    name
    country
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
        expect(data.suggestCities).toBeInstanceOf(Array);
        expect(data.suggestCities[0]).toHaveProperty('name');

    });
});
