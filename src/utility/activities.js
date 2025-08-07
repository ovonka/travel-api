export const getActivities = () => {
  return [
    { 
      name: 'Surfing', 
      criteria: [
        { condition: w => w.weatherCode < 45, score: 5, reason: 'Clear skies are good for visibility.' },
        { condition: w => w.temperature > 20, score: 3, reason: 'Warm temperatures make surfing more comfortable.' },
        { condition: w => w.windspeed > 10 && w.windspeed < 40, score: 2, reason: 'Moderate wind creates good waves.' }
      ]
    },
    { 
      name: 'Skiing', 
      criteria: [
        { condition: w => w.temperature >= -10 && w.temperature <= 0, score: 5, reason: 'Cold temperatures are essential for snow.' },
        { condition: w => w.windspeed < 20, score: 5, reason: 'Low wind makes for a safer and more comfortable ride.' }
      ]
    },
    { 
      name: 'Indoor sightseeing', 
      criteria: [
        { condition: w => w.weatherCode >= 50, score: 5, reason: 'Poor weather makes staying indoors a good idea.' },
        { condition: w => w.temperature < 5, score: 3, reason: 'Cold weather is a great reason to visit a museum.' },
        { condition: w => w.windspeed > 40, score: 2, reason: 'High winds can be unpleasant outdoors.' }
      ]
    },
    { 
      name: 'Outdoor sightseeing', 
      criteria: [
        { condition: w => w.weatherCode < 50, score: 5, reason: 'Good weather is perfect for exploring.' },
        { condition: w => w.temperature > 15, score: 3, reason: 'Warm, pleasant temperatures are best.' },
        { condition: w => w.windspeed < 20, score: 2, reason: 'Low wind speeds are ideal for a leisurely walk.' }
      ]
    },
  ];
};
