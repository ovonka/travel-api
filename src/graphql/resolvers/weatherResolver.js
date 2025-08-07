import { getWeatherForecast } from '../../services/weatherService.js';

export const weatherResolvers = {
  Query: {
    weather: async (_, { city }) => {
      return await getWeatherForecast(city);
    }
  }
};
