export default function DamagePanel({ markingMode, setMarkingMode, damageMarkers, setDamageMarkers, onDamageImageClick }) {
  return (
<div className="damage-panel">

  <div className="damage-panel__actions">

    <button

      type="button"

      className={`damage-mark-button ${

        markingMode ? 'damage-mark-button--active' : ''

      }`}

      onClick={() => setMarkingMode((previous) => !previous)}

      aria-pressed={markingMode}

    >

      MARCAR RASPONES Y ABOLLADURAS DEL VEHÍCULO

    </button>

    <button

      type="button"

      className="damage-refresh-button"

      onClick={() => setDamageMarkers([])}

    >

      REFRESCAR

    </button>

  </div>

  <div

    className={`damage-panel__drawing ${

      markingMode ? 'damage-panel__drawing--marking' : ''

    }`}

    onClick={onDamageImageClick}

    role="group"

    aria-label="Imagen del vehículo para marcar daños"

  >

    <img

      src="/images/vehicle-damage-views.png"

      alt="Vistas de automóvil, camioneta y SUV para señalar daños"

    />

    {damageMarkers.map((marker, index) => (

      <span

        key={`${marker.x}-${marker.y}-${index}`}

        className="damage-marker"

        style={{

          left: `${marker.x}%`,

          top: `${marker.y}%`,

        }}

        aria-label={`Daño marcado ${index + 1}`}

      />

    ))}

  </div>

</div>
  );
}
