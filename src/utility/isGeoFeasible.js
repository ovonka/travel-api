// Open-Meteo endpoints:
// Elevation API: https://api.open-meteo.com/v1/elevation
// Marine API: https://marine-api.open-meteo.com/v1/marine

const ELEVATION_URL = 'https://api.open-meteo.com/v1/elevation';
const MARINE_URL = 'https://marine-api.open-meteo.com/v1/marine';

// simple in-memory caches
const elevationCache = new Map(); // "lat,lon" -> number|null
const marineCache = new Map();    // "lat,lon" -> { hasMarine:boolean, waveMax:number }

const roundKey = (lat, lon) => `${lat.toFixed(3)},${lon.toFixed(3)}`;

async function getElevation(lat, lon) {
  const key = roundKey(lat, lon);
  if (elevationCache.has(key)) return elevationCache.get(key);

  try {
    const res = await fetch(`${ELEVATION_URL}?latitude=${lat}&longitude=${lon}`);
    if (!res.ok) {
      elevationCache.set(key, null);
      return null;
    }
    const data = await res.json();
    const elevation = data?.elevation?.[0] ?? null;
    elevationCache.set(key, elevation);
    return elevation;
  } catch {
    elevationCache.set(key, null);
    return null;
  }
}

async function getMarineSignal(lat, lon) {
  const key = roundKey(lat, lon);
  if (marineCache.has(key)) return marineCache.get(key);

  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'wave_height',
    timezone: 'auto',
  });

  try {
    const res = await fetch(`${MARINE_URL}?${params.toString()}`);
    if (!res.ok) {
      const result = { hasMarine: false, waveMax: 0 };
      marineCache.set(key, result);
      return result;
    }

    const data = await res.json();
    const waveArr = data?.hourly?.wave_height;

    if (!Array.isArray(waveArr) || waveArr.length === 0) {
      const result = { hasMarine: false, waveMax: 0 };
      marineCache.set(key, result);
      return result;
    }

    let max = 0;
    for (const v of waveArr) {
      if (typeof v === 'number' && v > max) max = v;
    }

    const result = { hasMarine: max > 0, waveMax: max };
    marineCache.set(key, result);
    return result;
  } catch {
    const result = { hasMarine: false, waveMax: 0 };
    marineCache.set(key, result);
    return result;
  }
}

// Geo-only rules: true/false/null (null => unknown)
const activityRules = {
  // marine-dependent
  surfing: async (lat, lon) => {
    const marine = await getMarineSignal(lat, lon);
    return marine ? marine.hasMarine : null;
  },
  sailing: async (lat, lon) => {
    const marine = await getMarineSignal(lat, lon);
    return marine ? marine.hasMarine : null;
  },
  snorkeling: async (lat, lon) => {
    const marine = await getMarineSignal(lat, lon);
    return marine ? marine.hasMarine : null;
  },
  'scuba diving': async (lat, lon) => {
    const marine = await getMarineSignal(lat, lon);
    return marine ? marine.hasMarine : null;
  },
  'beach day': async (lat, lon) => {
    const marine = await getMarineSignal(lat, lon);
    return marine ? marine.hasMarine : null;
  },

  // elevation-dependent
  skiing: async (lat, lon) => {
    const elevation = await getElevation(lat, lon);
    if (elevation == null) return null;
    return elevation >= 1200;
  },
  snowboarding: async (lat, lon) => {
    const elevation = await getElevation(lat, lon);
    if (elevation == null) return null;
    return elevation >= 1200;
  },
  mountaineering: async (lat, lon) => {
    const elevation = await getElevation(lat, lon);
    if (elevation == null) return null;
    return elevation >= 1500;
  },
  paragliding: async (lat, lon) => {
    const elevation = await getElevation(lat, lon);
    if (elevation == null) return null;
    return elevation >= 500;
  },

  // generally feasible anywhere
  hiking: async () => true,
  cycling: async () => true,
  running: async () => true,
  photography: async () => true,
  'indoor sightseeing': async () => true,
  'outdoor sightseeing': async () => true,
  'café hopping': async () => true,
};

// public API
export async function isGeoFeasibleByCoords(lat, lon, activityName) {
  const name = (activityName || '').toLowerCase().trim();
  const rule = activityRules[name];

  if (!rule) return { feasible: true, reason: null };

  const result = await rule(lat, lon);

  // conservative fallback if unknown
  if (result === null) return { feasible: true, reason: null };

  if (result === true) return { feasible: true, reason: null };

  // geo block reason messaging
  if (['surfing', 'sailing', 'snorkeling', 'scuba diving', 'beach day'].includes(name)) {
    return { feasible: false, reason: 'Not feasible: requires ocean/coast access.' };
  }
  if (['skiing', 'snowboarding', 'mountaineering', 'paragliding'].includes(name)) {
    return { feasible: false, reason: 'Not feasible: requires higher elevation/mountains.' };
  }

  return { feasible: false, reason: 'Not feasible in this location.' };
}
