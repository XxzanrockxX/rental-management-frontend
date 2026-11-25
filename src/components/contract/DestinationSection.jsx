export default function DestinationSection({
  destination,
  onDestinationChange,
  locationLoading,
  locations,
  onLocationSelect,
  locationError,
  locationDescription,
}) {
  return (
<section className="trip-destination">

  <h2>DESTINO DEL VIAJE</h2>

  <div className="trip-field">

    <label htmlFor="trip-destination">Lugar de destino</label>

    <input

      id="trip-destination"

      type="text"
       required

      placeholder="Escriba la ciudad o destino"

      value={destination}

      onChange={onDestinationChange}

      autoComplete="off"

    />

  </div>

  {locationLoading && (

    <p className="trip-status">

      Buscando ubicaciones...

    </p>

  )}

  {locations.length > 0 && (

    <ul className="trip-suggestions">

      {locations.map((location) => (

        <li

          key={`${location.name}-${location.latitude}-${location.longitude}`}

        >

          <button

            type="button"

            onClick={() => onLocationSelect(location)}

          >

            <span>{location.name}</span>

            <small>

              {[location.admin1, location.country]

                .filter(Boolean)

                .join(', ')}

            </small>

          </button>

        </li>

      ))}

    </ul>

  )}

  {locationError && (

    <p className="trip-status trip-status--error" role="alert">

      {locationError}

    </p>

  )}

  <div className="trip-location">

    <span className="trip-location__label">

      UBICACIÓN DEL DESTINO

    </span>

    <p>{locationDescription}</p>

  </div>

</section>
  );
}
