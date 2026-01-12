export const getActivities = () => {
  return [
    {
      name: 'Surfing',
      criteria: [
        { condition: (w) => w.weatherCode < 45, score: 5, reason: 'Clear skies are good for visibility.' },
        { condition: (w) => w.temperature > 20, score: 3, reason: 'Warm temperatures make surfing more comfortable.' },
        { condition: (w) => w.windspeed > 10 && w.windspeed < 40, score: 2, reason: 'Moderate wind creates good waves.' },
      ],
    },

    {
      name: 'Skiing',
      criteria: [
        { condition: (w) => w.temperature >= -10 && w.temperature <= 0, score: 5, reason: 'Cold temperatures are essential for snow.' },
        { condition: (w) => w.windspeed < 20, score: 5, reason: 'Low wind makes for a safer and more comfortable ride.' },
      ],
    },

    {
      name: 'Indoor sightseeing',
      criteria: [
        { condition: (w) => w.weatherCode >= 50, score: 5, reason: 'Poor weather makes staying indoors a good idea.' },
        { condition: (w) => w.temperature < 5, score: 3, reason: 'Cold weather is a great reason to visit a museum.' },
        { condition: (w) => w.windspeed > 40, score: 2, reason: 'High winds can be unpleasant outdoors.' },
      ],
    },

    {
      name: 'Outdoor sightseeing',
      criteria: [
        { condition: (w) => w.weatherCode < 50, score: 5, reason: 'Good weather is perfect for exploring.' },
        { condition: (w) => w.temperature > 15, score: 3, reason: 'Warm, pleasant temperatures are best.' },
        { condition: (w) => w.windspeed < 20, score: 2, reason: 'Low wind speeds are ideal for a leisurely walk.' },
      ],
    },

    {
      name: 'Hiking',
      criteria: [
        { condition: (w) => w.weatherCode < 50, score: 5, reason: 'Clear/okay weather is best for hiking.' },
        { condition: (w) => w.temperature >= 12 && w.temperature <= 26, score: 3, reason: 'Mild temperatures are ideal for hiking.' },
        { condition: (w) => w.windspeed < 25, score: 2, reason: 'Low to moderate wind keeps hiking comfortable.' },
      ],
    },

    {
      name: 'Cycling',
      criteria: [
        { condition: (w) => w.weatherCode < 50, score: 5, reason: 'Dry weather is safer for cycling.' },
        { condition: (w) => w.temperature >= 15 && w.temperature <= 28, score: 3, reason: 'Comfortable temperatures improve endurance.' },
        { condition: (w) => w.windspeed < 20, score: 2, reason: 'Low wind reduces fatigue and improves safety.' },
      ],
    },

    {
      name: 'Picnicking',
      criteria: [
        { condition: (w) => w.weatherCode < 45, score: 5, reason: 'Clear skies make picnics enjoyable.' },
        { condition: (w) => w.temperature >= 18 && w.temperature <= 30, score: 3, reason: 'Warm weather suits outdoor meals.' },
        { condition: (w) => w.windspeed < 25, score: 2, reason: 'Lower wind keeps things pleasant and manageable.' },
      ],
    },

    {
      name: 'Running',
      criteria: [
        { condition: (w) => w.weatherCode < 55, score: 4, reason: 'Less rain improves running conditions.' },
        { condition: (w) => w.temperature >= 10 && w.temperature <= 24, score: 4, reason: 'Cool-to-mild temperatures are best for running.' },
        { condition: (w) => w.windspeed < 30, score: 2, reason: 'High wind can make running unpleasant.' },
      ],
    },

    {
      name: 'Photography',
      criteria: [
        { condition: (w) => w.weatherCode < 55, score: 4, reason: 'Less rain helps keep gear safe and usable.' },
        { condition: (w) => w.weatherCode >= 1 && w.weatherCode <= 3, score: 3, reason: 'Partly cloudy skies can give great lighting.' },
        { condition: (w) => w.windspeed < 25, score: 3, reason: 'Lower wind makes shots steadier and conditions calmer.' },
      ],
    },

    // 10) Café hopping / Food tasting (indoor-friendly)
    {
      name: 'Café hopping',
      criteria: [
        { condition: (w) => w.weatherCode >= 50, score: 5, reason: 'Bad weather is perfect for indoor food experiences.' },
        { condition: (w) => w.temperature < 12, score: 3, reason: 'Cool weather makes indoor activities more appealing.' },
        { condition: (w) => w.windspeed > 25, score: 2, reason: 'Windy days are better spent indoors.' },
      ],
    },
  ];
};
