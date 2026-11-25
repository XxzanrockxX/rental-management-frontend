export default function DateAndMileage({
  departureDate,
  onDepartureDateChange,
  departureTime,
  onDepartureTimeChange,
}) {
  return (
    <section className="contract-dates">
      <div className="contract-date-group">
        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="departure-date">Fecha de salida</label>
            <input
              id="departure-date"
              type="date"
              required
              value={departureDate}
              onChange={onDepartureDateChange}
            />
          </div>
        </div>

        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="departure-time">Hora</label>
            <input
              id="departure-time"
              type="time"
              required
              value={departureTime}
              onChange={onDepartureTimeChange}
            />
          </div>
        </div>
      </div>

      <div className="contract-date-group">
        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="arrival-date">Fecha de llegada</label>
            <input
              id="arrival-date"
              type="date"
            />
          </div>
        </div>

        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="arrival-time">Hora</label>
            <input
              id="arrival-time"
              type="time"
            />
          </div>
        </div>
      </div>

      <div className="contract-field">
        <div className="contract-field__content">
          <label htmlFor="departure-kms">KMS salida</label>
          <input
            id="departure-kms"
            type="number"
            min="0"
            required
            placeholder="Kilometraje"
          />
        </div>
      </div>

      <div className="contract-field">
        <div className="contract-field__content">
          <label htmlFor="arrival-kms">KMS llegada</label>
          <input
            id="arrival-kms"
            type="number"
            min="0"
            placeholder="Kilometraje"
          />
        </div>
      </div>
    </section>
  );
}
