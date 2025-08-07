import { getWeatherForecast } from './weatherService.js';
import { getActivities } from '../utility/activities.js'

export const getRankedActivities = async (city) => {
  const weatherData = await getWeatherForecast(city);
  if (!weatherData || !weatherData.length) return [];

  const todayWeather = weatherData[0];
  if (!todayWeather) return [];
  
  // activities from the utility function
  const activities = getActivities();

  const ranked = activities.map(({ name, criteria }) => {
    let score = 0;
    const reasons = [];
    
    criteria.forEach(c => {
      if (c.condition(todayWeather)) {
        score += c.score;
        reasons.push(c.reason);
      }
    });

    return {
      name,
      score,
      reason: reasons.length > 0
        ? reasons.join(', ')
        : 'Not ideal based on today\'s forecast',
    };
  });
 // ranked in a descending order based on score
  return ranked.sort((a, b) => b.score - a.score);
};
