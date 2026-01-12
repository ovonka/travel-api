import { getWeatherForecast } from '../../services/weatherService.js';

export const weatherResolvers = {
  Query: {
    getWeatherForecast: async (_, { city }) => {
      const result = await getWeatherForecast(city);
      return result?.forecast ?? [];
    },
  },
};
