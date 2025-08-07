import { describe, it, expect } from '@jest/globals';
import { suggestCities } from '../services/cityService.js';
import nock from 'nock';


const BASE_URL = 'https://geocoding-api.open-meteo.com';

describe('City Service - suggestCities', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns city suggestions for a valid query', async () => {
    const mockResponse = {
      results: [
        {
          name: 'Cape Town',
          latitude: -33.9258,
          longitude: 18.4232,
          country: 'South Africa',
        },
      ],
    };

    nock(BASE_URL)
      .get('/v1/search')
      .query({ name: 'Cape Town', count: 5 })
      .reply(200, mockResponse);

    const results = await suggestCities('Cape Town');

    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      name: 'Cape Town',
      latitude: -33.9258,
      longitude: 18.4232,
      country: 'South Africa',
    });
  });

  it('returns empty array when no cities are found', async () => {
    nock(BASE_URL)
      .get('/v1/search')
      .query({ name: 'InvalidCity', count: 5 })
      .reply(200, { results: [] });

    const results = await suggestCities('InvalidCity');

    expect(results).toEqual([]);
  });

  it('returns empty array on API error', async () => {
    nock(BASE_URL)
      .get('/v1/search')
      .query(true)
      .reply(500);

    const results = await suggestCities('Anything');

    expect(results).toEqual([]);
  });
});
