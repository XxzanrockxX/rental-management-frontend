export default function TravelRecommendation({ weatherLoading, weatherError, selectedLocation, departureDate, weather, createTravelRecommendation }) {
  return (
<section className="trip-recommendation">

  <h2>RECOMENDACIÓN DE VIAJE</h2>

  {weatherLoading && (

    <p className="trip-status">

      Consultando pronóstico del clima...

    </p>

  )}

  {weatherError && (

    <p className="trip-status trip-status--error" role="alert">

      {weatherError}

    </p>

  )}

  <textarea

    id="trip-recommendation"

    placeholder={

      !selectedLocation

        ? 'Primero seleccione el destino del viaje...'

        : !departureDate

          ? 'Seleccione la fecha de salida para consultar el clima...'

          : 'Aquí aparecerá la recomendación del viaje...'

    }

    value={weather ? createTravelRecommendation(weather) : ''}

    rows="3"

    readOnly

  />

</section>
  );
}
