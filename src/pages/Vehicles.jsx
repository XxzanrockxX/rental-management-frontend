import { useState } from 'react';
import Header from '../components/Header';
import './Vehicles.css';

const STORAGE_KEY = 'advance-rent-a-car-vehicles';

function Vehicles() {
  const [feedback, setFeedback] = useState({
    type: '',
    message: '',
  });

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const vehicle = {
      'vehicle-brand': formData.get('vehicle-brand').trim(),
      'vehicle-model': formData.get('vehicle-model').trim(),
      'vehicle-year': formData.get('vehicle-year').trim(),
      'vehicle-color': formData.get('vehicle-color').trim(),
      'vehicle-plate': formData.get('vehicle-plate').trim().toUpperCase(),
      'vehicle-chassis': formData.get('vehicle-chassis').trim(),
      'vehicle-engine': formData.get('vehicle-engine').trim(),
      createdAt: new Date().toISOString(),
      createdBy: sessionStorage.getItem('advance-current-user') || '',
    };

    try {
      const savedVehicles = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]'
      );

      if (!Array.isArray(savedVehicles)) {
        throw new Error('El almacenamiento de vehículos tiene un formato inválido.');
      }

      const duplicatePlate = savedVehicles.some(
        (savedVehicle) => (
          savedVehicle['vehicle-plate']?.toUpperCase() === vehicle['vehicle-plate']
        )
      );

      if (duplicatePlate) {
        setFeedback({
          type: 'error',
          message: 'Ya existe un vehículo registrado con esa placa.',
        });
        return;
      }

      savedVehicles.push(vehicle);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVehicles));

      form.reset();

      setFeedback({
        type: 'success',
        message: 'Vehículo registrado correctamente.',
      });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: `No se pudo registrar el vehículo: ${error.message}`,
      });
    }
  }

  return (
    <div className="vehicles-page">
      <Header />

      <main className="vehicles-page__content">
        <div className="vehicles-page__heading">
          <h1>Registro de vehículos</h1>
          <p>Ingresa los datos del vehículo que llega a la rentadora.</p>
        </div>

        <form className="vehicles-form" onSubmit={handleSubmit}>
          <section className="vehicles-form__section">
            <h2>DATOS DEL VEHÍCULO</h2>

            <div className="vehicles-form__grid">
              <div className="vehicles-form__field">
                <label htmlFor="vehicle-brand">Marca</label>
                <input
                  id="vehicle-brand"
                  name="vehicle-brand"
                  type="text"
                  placeholder="Ingrese marca del vehículo"
                  required
                />
              </div>

              <div className="vehicles-form__field">
                <label htmlFor="vehicle-model">Modelo</label>
                <input
                  id="vehicle-model"
                  name="vehicle-model"
                  type="text"
                  placeholder="Ingrese modelo del vehículo"
                  required
                />
              </div>

              <div className="vehicles-form__field">
                <label htmlFor="vehicle-year">Año</label>
                <input
                  id="vehicle-year"
                  name="vehicle-year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  placeholder="Ej. 2024"
                  required
                />
              </div>

              <div className="vehicles-form__field">
                <label htmlFor="vehicle-color">Color</label>
                <input
                  id="vehicle-color"
                  name="vehicle-color"
                  type="text"
                  placeholder="Ingrese color del vehículo"
                  required
                />
              </div>

              <div className="vehicles-form__field">
                <label htmlFor="vehicle-plate">Placas</label>
                <input
                  id="vehicle-plate"
                  name="vehicle-plate"
                  type="text"
                  placeholder="Ingrese número de placa"
                  required
                />
              </div>

              <div className="vehicles-form__field">
                <label htmlFor="vehicle-chassis">Chasis</label>
                <input
                  id="vehicle-chassis"
                  name="vehicle-chassis"
                  type="text"
                  placeholder="Ingrese número de chasis"
                  required
                />
              </div>

              <div className="vehicles-form__field">
                <label htmlFor="vehicle-engine">Motor</label>
                <input
                  id="vehicle-engine"
                  name="vehicle-engine"
                  type="text"
                  placeholder="Ingrese número de motor"
                  required
                />
              </div>
            </div>
          </section>

          {feedback.message && (
            <p
              className={`vehicles-form__feedback vehicles-form__feedback--${feedback.type}`}
              role="status"
            >
              {feedback.message}
            </p>
          )}

          <div className="vehicles-form__actions">
            <button type="submit">
              Registrar vehículo
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Vehicles;
