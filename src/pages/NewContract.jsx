import { useEffect, useState } from 'react';
import { getWeatherForecast, searchLocation } from '../services/weatherApi';
import { createTravelRecommendation } from '../utils/contractWeather';
import CustomerData from '../components/contract/CustomerData';
import VehicleData from '../components/contract/VehicleData';
import DateAndMileage from '../components/contract/DateAndMileage';
import DestinationSection from '../components/contract/DestinationSection';
import TravelRecommendation from '../components/contract/TravelRecommendation';
import EquipmentSection from '../components/contract/EquipmentSection';
import DamagePanel from '../components/contract/DamagePanel';
import ObservationsPanel from '../components/contract/ObservationsPanel';
import ContractSave from '../components/contract/ContractSave';
import './NewContract.css';

function getEcuadorDateTime() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Guayaquil',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
}

function NewContract() {
  const [fuelLevel, setFuelLevel] = useState(0);

  const [markingMode, setMarkingMode] = useState(false);

  const [damageMarkers, setDamageMarkers] = useState([]);

  const [destination, setDestination] = useState('');

  const [locations, setLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [locationLoading, setLocationLoading] = useState(false);

  const [locationError, setLocationError] = useState('');

  const [departureDate, setDepartureDate] = useState(
    () => getEcuadorDateTime().date
  );

  const [departureTime, setDepartureTime] = useState(
    () => getEcuadorDateTime().time
  );

  const [weather, setWeather] = useState(null);

  const [weatherLoading, setWeatherLoading] = useState(false);

  const [weatherError, setWeatherError] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const [saveFeedback, setSaveFeedback] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    if (
      destination.trim().length < 2
      || selectedLocation?.name === destination.trim()
    ) {
      return undefined;
    }

    let active = true;

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchLocation(destination);

        if (active) {
          setLocations(results);
        }
      } catch (error) {
        if (active) {
          setLocations([]);
          setLocationError(error.message);
        }
      } finally {
        if (active) {
          setLocationLoading(false);
        }
      }
    }, 400);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, [destination, selectedLocation]);

  useEffect(() => {
    if (!selectedLocation || !departureDate) {
      return undefined;
    }

    let active = true;

    async function fetchWeather() {
      try {
        const forecast = await getWeatherForecast(
          selectedLocation.latitude,
          selectedLocation.longitude,
          departureDate
        );

        if (active) {
          setWeather(forecast);
        }
      } catch (error) {
        if (active) {
          setWeatherError(error.message);
        }
      } finally {
        if (active) {
          setWeatherLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      active = false;
    };
  }, [selectedLocation, departureDate]);

  function handleDestinationChange(event) {
    const value = event.target.value;

    setDestination(value);
    setSelectedLocation(null);
    setLocations([]);
    setLocationLoading(value.trim().length >= 2);
    setLocationError('');
    setWeather(null);
    setWeatherLoading(false);
    setWeatherError('');
  }

  function handleLocationSelect(location) {
    setSelectedLocation(location);
    setDestination(location.name);
    setLocations([]);
    setLocationLoading(false);
    setLocationError('');
    setWeather(null);
    setWeatherLoading(Boolean(departureDate));
    setWeatherError('');
  }

  function handleDepartureDateChange(event) {
    const date = event.target.value;

    setDepartureDate(date);
    setWeather(null);
    setWeatherError('');
    setWeatherLoading(Boolean(selectedLocation && date));
  }

  function handleDepartureTimeChange(event) {
    setDepartureTime(event.target.value);
  }

  function handleDamageImageClick(event) {
    if (!markingMode) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;

    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setDamageMarkers((previousMarkers) => [
      ...previousMarkers,
      { x, y },
    ]);
  }

  async function handleSaveContract(event) {
    event.preventDefault();

    if (isSaving) return;

    const form = event.currentTarget;

    setSaveFeedback({ type: '', message: '' });

    if (!form.reportValidity()) return;

    const formValues = {};
    const fields = form.querySelectorAll('input, textarea, select');

    fields.forEach((field) => {
      if (!field.id || field.type === 'button' || field.type === 'submit') {
        return;
      }

      if (field.type === 'checkbox') {
        return;
      }

      formValues[field.id] = field.value.trim();
    });

    const arrivalDate = formValues['arrival-date'];
    const arrivalTime = formValues['arrival-time'];

    if (arrivalDate && arrivalTime) {
      const departureDateTime = `${formValues['departure-date']}T${formValues['departure-time']}`;
      const arrivalDateTime = `${arrivalDate}T${arrivalTime}`;

      if (arrivalDateTime < departureDateTime) {
        setSaveFeedback({
          type: 'error',
          message: 'La fecha y hora de llegada no pueden ser anteriores a la salida.',
        });

        form.querySelector('#arrival-date').focus();
        return;
      }
    }

    const departureKms = Number(formValues['departure-kms']);

    const arrivalKms = formValues['arrival-kms'] === ''
      ? null
      : Number(formValues['arrival-kms']);

    if (departureKms < 0 || (arrivalKms !== null && arrivalKms < departureKms)) {
      setSaveFeedback({
        type: 'error',
        message: 'Revise los kilometrajes: no pueden ser negativos y los KMS de llegada no pueden ser menores que los de salida.',
      });

      form.querySelector('#departure-kms').focus();
      return;
    }

    if (!selectedLocation) {
      setSaveFeedback({
        type: 'error',
        message: 'Seleccione un destino de la lista de ubicaciones sugeridas.',
      });

      form.querySelector('#trip-destination').focus();
      return;
    }

    const equipment = Array.from(
      form.querySelectorAll('.equipment-item input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.closest('label')?.querySelector('span')?.textContent?.trim())
      .filter(Boolean);

    const contract = {
      id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
      ...formValues,
      equipment,
      fuelLevel,
      damageMarkers,
      destination,
      selectedLocation,
      weather,
      travelRecommendation: weather ? createTravelRecommendation(weather) : '',
    };

    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 450));

      const storageKey = 'advance-rent-a-car-contracts';
      const savedContracts = JSON.parse(localStorage.getItem(storageKey) || '[]');

      if (!Array.isArray(savedContracts)) {
        throw new Error('El almacenamiento de contratos tiene un formato inválido.');
      }

      savedContracts.push(contract);
      localStorage.setItem(storageKey, JSON.stringify(savedContracts));

      setSaveFeedback({
        type: 'success',
        message: 'Contrato guardado correctamente en este navegador.',
      });
    } catch (error) {
      setSaveFeedback({
        type: 'error',
        message: error.name === 'QuotaExceededError'
          ? 'No hay espacio disponible en el navegador para guardar este contrato.'
          : `No se pudo guardar el contrato: ${error.message}`,
      });
    } finally {
      setIsSaving(false);
    }
  }

  const locationDescription = selectedLocation
    ? [
      selectedLocation.name,
      selectedLocation.admin1,
      selectedLocation.country,
    ].filter(Boolean).join(', ')
    : 'La ubicación encontrada aparecerá aquí.';

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

      <form className="contract-form" onSubmit={handleSaveContract}>
        <ContractSave saveFeedback={saveFeedback} isSaving={isSaving} />
        <div className="contract-top-section">
          <div className="contract-left-column">
            <CustomerData />
            <VehicleData />
          </div>

          <div className="contract-right-column">
            <DateAndMileage
              departureDate={departureDate}
              onDepartureDateChange={handleDepartureDateChange}
              departureTime={departureTime}
              onDepartureTimeChange={handleDepartureTimeChange}
            />

            <DestinationSection
              destination={destination}
              onDestinationChange={handleDestinationChange}
              locationLoading={locationLoading}
              locations={locations}
              onLocationSelect={handleLocationSelect}
              locationError={locationError}
              locationDescription={locationDescription}
            />

            <TravelRecommendation
              weatherLoading={weatherLoading}
              weatherError={weatherError}
              selectedLocation={selectedLocation}
              departureDate={departureDate}
              weather={weather}
              createTravelRecommendation={createTravelRecommendation}
            />
          </div>
        </div>

        <EquipmentSection
          fuelLevel={fuelLevel}
          setFuelLevel={setFuelLevel}
        />

        <section className="vehicle-condition">
          <DamagePanel
            markingMode={markingMode}
            setMarkingMode={setMarkingMode}
            damageMarkers={damageMarkers}
            setDamageMarkers={setDamageMarkers}
            onDamageImageClick={handleDamageImageClick}
          />

          <ObservationsPanel />
        </section>
      </form>
    </main>
  );
}

export default NewContract;
