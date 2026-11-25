import FuelNeedleGauge from './FuelNeedleGauge';

const equipmentLeft = ['Antena', 'Aros de magnesio', 'Espejos', 'Neblineros', 'Parachoque', 'Rollback', 'Parrilla', 'Estribos'];
const equipmentRight = ['Tapacubos', 'Llanta de emergencia', 'Herramientas', 'Tapa de combustible', 'Radio', 'Encendedor', 'Moquetas', 'A.C.'];

function EquipmentList({ items, prefix }) {
  return (
    <div className="equipment-list">
      {items.map((item, index) => (
        <label className="equipment-item" key={item}>
          <span>{item}</span>
          <input type="checkbox" name={`${prefix}-${index}`} aria-label={item} />
        </label>
      ))}
    </div>
  );
}

export default function EquipmentSection({ fuelLevel, setFuelLevel }) {
  return (
    <section className="equipment-section">
<div className="equipment-panel">

  <h2>EQUIPAMIENTO DEL VEHÍCULO</h2>

  <div className="equipment-columns">

    <EquipmentList items={equipmentLeft} prefix="left" />

    <EquipmentList items={equipmentRight} prefix="right" />

  </div>

</div>
<div className="fuel-panel">

  <h2>COMBUSTIBLE</h2>

  <FuelNeedleGauge />

  <div className="fuel-gauge">

    {Array.from({ length: 10 }, (_, index) => (

      <button

        key={index}

        type="button"

        className={

          index < fuelLevel

            ? 'fuel-box fuel-box--active'

            : 'fuel-box'

        }

        onClick={() => setFuelLevel(index + 1)}

        aria-label={`Nivel de combustible ${index + 1} de 10`}

        aria-pressed={index < fuelLevel}

      />

    ))}

  </div>

  <div className="fuel-labels">

    <span>E</span>

    <span>F</span>

  </div>

</div>
    </section>
  );
}
