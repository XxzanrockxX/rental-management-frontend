export function getWeatherDescription(code) {

  const descriptions = {

    0: 'Despejado',

    1: 'Mayormente despejado',

    2: 'Parcialmente nublado',

    3: 'Nublado',

    45: 'Niebla',

    48: 'Niebla con escarcha',

    51: 'Llovizna ligera',

    53: 'Llovizna moderada',

    55: 'Llovizna intensa',

    56: 'Llovizna helada ligera',

    57: 'Llovizna helada intensa',

    61: 'Lluvia ligera',

    63: 'Lluvia moderada',

    65: 'Lluvia intensa',

    66: 'Lluvia helada ligera',

    67: 'Lluvia helada intensa',

    71: 'Nevada ligera',

    73: 'Nevada moderada',

    75: 'Nevada intensa',

    77: 'Granos de nieve',

    80: 'Chubascos ligeros',

    81: 'Chubascos moderados',

    82: 'Chubascos intensos',

    85: 'Chubascos de nieve ligeros',

    86: 'Chubascos de nieve intensos',

    95: 'Tormenta eléctrica',

    96: 'Tormenta con granizo ligero',

    99: 'Tormenta con granizo intenso',

  };

  return descriptions[code] || 'Condiciones meteorológicas variables';

}

export function createTravelRecommendation(weather) {

  const description = getWeatherDescription(weather.weatherCode);

  const recommendations = [];

  if (weather.precipitationProbability >= 50) {

    recommendations.push(

      'Existe una probabilidad considerable de lluvia. Conduzca con precaución, reduzca la velocidad y mantenga mayor distancia de seguridad.'

    );

  } else if (weather.precipitationProbability >= 25) {

    recommendations.push(

      'Existe posibilidad de lluvia. Se recomienda conducir con precaución.'

    );

  }

  if (weather.maxWindSpeed >= 40) {

    recommendations.push(

      'Se esperan vientos fuertes. Sujete firmemente el volante y tenga cuidado en zonas abiertas.'

    );

  }

  if (weather.maxTemperature >= 34) {

    recommendations.push(

      'Se esperan temperaturas elevadas. Manténgase hidratado y revise el sistema de refrigeración del vehículo.'

    );

  }

  if (weather.minTemperature <= 8) {

    recommendations.push(

      'Se esperan temperaturas bajas. Tenga precaución ante posibles condiciones de frío en la vía.'

    );

  }

  if ([45, 48].includes(weather.weatherCode)) {

    recommendations.push(

      'Se prevé niebla. Reduzca la velocidad y utilice las luces adecuadas.'

    );

  }

  if ([95, 96, 99].includes(weather.weatherCode)) {

    recommendations.push(

      'Se esperan tormentas eléctricas. Extreme las precauciones y evite detenerse en zonas expuestas.'

    );

  }

  if (recommendations.length === 0) {

    recommendations.push(

      'No se identifican condiciones meteorológicas especialmente adversas. Mantenga siempre una conducción responsable y respete las señales de tránsito.'

    );

  }

  return [

    `Pronóstico: ${description}.`,

    `Temperatura: ${weather.minTemperature} °C a ${weather.maxTemperature} °C.`,

    `Probabilidad máxima de precipitación: ${weather.precipitationProbability ?? 'No disponible'}%.`,

    `Viento máximo: ${weather.maxWindSpeed} km/h.`,

    '',

    'RECOMENDACIONES:',

    ...recommendations,

  ].join('\n');

}
