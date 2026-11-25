export default function VehicleData({ readOnly = false, values = {} }) {
  return (
    <section className="vehicle-data">
      <h2>DATOS DEL VEHÍCULO</h2>

      <div className="vehicle-data__grid">
        <div className="customer-field">
          <label htmlFor="vehicle-brand">Marca</label>
          <input
            id="vehicle-brand"
            type="text"
            placeholder="Ingrese marca del vehículo"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-brand'] ?? '' : undefined}
          />
        </div>

        <div className="customer-field">
          <label htmlFor="vehicle-model">Modelo</label>
          <input
            id="vehicle-model"
            type="text"
            placeholder="Ingrese modelo del vehículo"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-model'] ?? '' : undefined}
          />
        </div>

        <div className="customer-field">
          <label htmlFor="vehicle-year">Año</label>
          <input
            id="vehicle-year"
            type="number"
            placeholder="Ej. 2024"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-year'] ?? '' : undefined}
          />
        </div>

        <div className="customer-field">
          <label htmlFor="vehicle-color">Color</label>
          <input
            id="vehicle-color"
            type="text"
            placeholder="Ingrese color del vehículo"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-color'] ?? '' : undefined}
          />
        </div>

        <div className="customer-field">
          <label htmlFor="vehicle-plate">Placas</label>
          <input
            id="vehicle-plate"
            type="text"
            placeholder="Ingrese número de placa"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-plate'] ?? '' : undefined}
          />
        </div>

        <div className="customer-field">
          <label htmlFor="vehicle-chassis">Chasis</label>
          <input
            id="vehicle-chassis"
            type="text"
            placeholder="Ingrese número de chasis"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-chassis'] ?? '' : undefined}
          />
        </div>

        <div className="customer-field">
          <label htmlFor="vehicle-engine">Motor</label>
          <input
            id="vehicle-engine"
            type="text"
            placeholder="Ingrese número de motor"
            required={!readOnly}
            readOnly={readOnly}
            value={readOnly ? values['vehicle-engine'] ?? '' : undefined}
          />
        </div>
      </div>
    </section>
  );
}
