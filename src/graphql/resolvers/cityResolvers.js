import { suggestCities } from '../../services/cityService.js';

export const cityResolvers = {
  Query: {
    suggestCities: async (_, { query }) => {
      return await suggestCities(query);
    },
  },
};
