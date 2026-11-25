import CustomerData from './CustomerData';
import VehicleData from './VehicleData';
import DateAndMileage from './DateAndMileage';
import DestinationSection from './DestinationSection';
import TravelRecommendation from './TravelRecommendation';
import EquipmentSection from './EquipmentSection';
import DamagePanel from './DamagePanel';
import ObservationsPanel from './ObservationsPanel';
import '../../pages/NewContract.css';

export default function ContractReadOnly({ contract }) {
  if (!contract) return null;

  const locationDescription = contract.selectedLocation
    ? [
      contract.selectedLocation.name,
      contract.selectedLocation.admin1,
      contract.selectedLocation.country,
    ].filter(Boolean).join(', ')
    : contract.destination || 'Ubicación no disponible.';

  return (
    <main className="new-contract">
      <header className="contract-header">
        <div className="contract-header__brand">
          <span className="contract-header__name">ADVANCE</span>
          <span className="contract-header__subtitle">RENT A CAR</span>
        </div>

        <div className="contract-header__info">
          <h1>CONTRATO DE ALQUILER</h1>
          <p>Formulario de recepción y entrega del vehículo</p>
        </div>
      </header>

      <div className="contract-form">
        <div className="contract-top-section">
          <div className="contract-left-column">
            <CustomerData
              readOnly
              values={contract}
            />

            <VehicleData
              readOnly
              values={contract}
            />
          </div>

          <div className="contract-right-column">
            <DateAndMileage
              readOnly
              values={contract}
            />

            <DestinationSection
              readOnly
              destination={contract.destination || ''}
              locationDescription={locationDescription}
            />

            <TravelRecommendation
              readOnly
              savedRecommendation={contract.travelRecommendation || ''}
            />
          </div>
        </div>

        <EquipmentSection
          readOnly
          fuelLevel={contract.fuelLevel || 0}
          equipment={contract.equipment || []}
        />

        <section className="vehicle-condition">
          <DamagePanel
            readOnly
            damageMarkers={contract.damageMarkers || []}
          />

          <ObservationsPanel
            readOnly
            values={contract}
          />
        </section>
      </div>
    </main>
  );
}
