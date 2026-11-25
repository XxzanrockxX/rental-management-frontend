export default function DateAndMileage({
  readOnly = false,
  values = {},
  departureDate,
  onDepartureDateChange,
  departureTime,
  onDepartureTimeChange,
}) {
  const getValue = (field) => (
    readOnly ? values[field] ?? '' : undefined
  );

  return (
    <section className="contract-dates">
      <div className="contract-date-group">
        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="departure-date">Fecha de salida</label>
            <input
              id="departure-date"
              type="date"
              required={!readOnly}
              readOnly={readOnly}
              value={readOnly ? getValue('departure-date') : departureDate}
              onChange={readOnly ? undefined : onDepartureDateChange}
            />
          </div>
        </div>

        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="departure-time">Hora</label>
            <input
              id="departure-time"
              type="time"
              required={!readOnly}
              readOnly={readOnly}
              value={readOnly ? getValue('departure-time') : departureTime}
              onChange={readOnly ? undefined : onDepartureTimeChange}
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
              readOnly={readOnly}
              value={getValue('arrival-date')}
            />
          </div>
        </div>

        <div className="contract-field">
          <div className="contract-field__content">
            <label htmlFor="arrival-time">Hora</label>
            <input
              id="arrival-time"
              type="time"
              readOnly={readOnly}
              value={getValue('arrival-time')}
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
            required={!readOnly}
            readOnly={readOnly}
            placeholder="Kilometraje"
            value={getValue('departure-kms')}
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
            readOnly={readOnly}
            placeholder="Kilometraje"
            value={getValue('arrival-kms')}
          />
        </div>
      </div>
    </section>
  );
}
