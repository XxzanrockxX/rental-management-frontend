
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchLocation(city) {
  if (!city || !city.trim()) {
    throw new Error('Debes ingresar una ciudad o destino.');
  }

  const params = new URLSearchParams({
    name: city.trim(),
    count: '5',
    language: 'es',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error('No se pudo consultar la ubicación.');
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('No se encontró el destino indicado.');
  }

  return data.results.map((location) => ({
    name: location.name,
    country: location.country,
    admin1: location.admin1 || '',
    latitude: location.latitude,
    longitude: location.longitude,
  }));
}

export async function getWeatherForecast(latitude, longitude, date) {
  if (
    typeof latitude !== 'number'
    || typeof longitude !== 'number'
    || !date
  ) {
    throw new Error('La ubicación y la fecha son obligatorias.');
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'wind_speed_10m_max',
    ].join(','),
    start_date: date,
    end_date: date,
    timezone: 'auto',
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error('No se pudo consultar el pronóstico del clima.');
  }

  const data = await response.json();

  if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
    throw new Error('No hay pronóstico disponible para esa fecha.');
  }

  return {
    date: data.daily.time[0],
    weatherCode: data.daily.weather_code[0],
    maxTemperature: data.daily.temperature_2m_max[0],
    minTemperature: data.daily.temperature_2m_min[0],
    precipitationProbability: data.daily.precipitation_probability_max[0],
    maxWindSpeed: data.daily.wind_speed_10m_max[0],
  };
}

