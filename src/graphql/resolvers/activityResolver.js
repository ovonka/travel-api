import { getRankedActivities } from '../../services/activityService.js';

export const activityResolvers = {
  Query: {
    getRankedActivities: async (_, { city }) => {
      return await getRankedActivities(city);
    },
  },
};
