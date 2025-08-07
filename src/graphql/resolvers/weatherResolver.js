import { getWeatherForecast } from '../../services/weatherService.js';

export const weatherResolvers = {
  Query: {
    getWeatherForecast: async (_, { city }) => {
      return await getWeatherForecast(city);
    }
  }
};
