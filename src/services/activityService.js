import { getWeatherForecast } from './weatherService.js';
import { getActivities } from '../utility/activities.js';
import { isGeoFeasibleByCoords } from '../utility/isGeoFeasible.js';

export const getRankedActivities = async (city) => {
  const weatherData = await getWeatherForecast(city);
  if (!weatherData?.forecast?.length) return [];

  const todayWeather = weatherData.forecast[0];
  const activities = getActivities();

  const ranked = await Promise.all(
    activities.map(async ({ name, criteria }) => {
      const geo = await isGeoFeasibleByCoords(weatherData.latitude, weatherData.longitude, name);

      if (!geo.feasible) {
        return {
          name,
          score: 0,
          reason: geo.reason || 'Not feasible in this location',
        };
      }

      let score = 0;
      const reasons = [];

      criteria.forEach((c) => {
        if (c.condition(todayWeather)) {
          score += c.score;
          reasons.push(c.reason);
        }
      });

      return {
        name,
        score,
        reason: reasons.length > 0 ? reasons.join(', ') : "Not ideal based on today's forecast",
      };
    })
  );

  return ranked.sort((a, b) => b.score - a.score);
};
