export default function TravelRecommendation({
  weatherLoading = false,
  weatherError,
  selectedLocation,
  departureDate,
  weather,
  createTravelRecommendation,
  readOnly = false,
  savedRecommendation = '',
}) {
  const recommendation = readOnly
    ? savedRecommendation
    : weather
      ? createTravelRecommendation(weather)
      : '';

  return (
    <section className="trip-recommendation">
      <h2>RECOMENDACIÓN DE VIAJE</h2>

      {!readOnly && weatherLoading && (
        <p className="trip-status">
          Consultando pronóstico del clima...
        </p>
      )}

      {!readOnly && weatherError && (
        <p
          className="trip-status trip-status--error"
          role="alert"
        >
          {weatherError}
        </p>
      )}

      <textarea
        id="trip-recommendation"
        placeholder={
          !readOnly && !selectedLocation
            ? 'Primero seleccione el destino del viaje...'
            : !readOnly && !departureDate
              ? 'Seleccione la fecha de salida para consultar el clima...'
              : 'Aquí aparecerá la recomendación del viaje...'
        }
        value={recommendation}
        rows="3"
        readOnly
      />
    </section>
  );
}
