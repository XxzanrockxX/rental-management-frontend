
export default function CustomerData() {
  return (
    <section className="customer-data">
      <h2>DATOS PERSONALES</h2>

      <div className="customer-data__grid">
        <div className="customer-field customer-field--full">
          <label htmlFor="customer-name">Cliente</label>
          <input
            id="customer-name"
            type="text"
            placeholder="Ingrese nombres y apellidos"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="customer-id">CI</label>
          <input
            id="customer-id"
            type="text"
            placeholder="Ingrese número de cédula"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="customer-address">Dirección</label>
          <input
            id="customer-address"
            type="text"
            placeholder="Ingrese dirección del cliente"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="customer-email">E-mail</label>
          <input
            id="customer-email"
            type="email"
            placeholder="Ingrese correo electrónico"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="customer-phone">Teléfono</label>
          <input
            id="customer-phone"
            type="tel"
            placeholder="Ingrese número de teléfono"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="work-reference">Referencia laboral</label>
          <input
            id="work-reference"
            type="text"
            placeholder="Ingrese nombre de referencia laboral"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="work-reference-phone">Teléfono</label>
          <input
            id="work-reference-phone"
            type="tel"
            placeholder="Ingrese teléfono de referencia"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="personal-reference">Referencia personal</label>
          <input
            id="personal-reference"
            type="text"
            placeholder="Ingrese nombre de referencia personal"
            required
          />
        </div>

        <div className="customer-field">
          <label htmlFor="personal-reference-phone">Teléfono</label>
          <input
            id="personal-reference-phone"
            type="tel"
            placeholder="Ingrese teléfono de referencia"
            required
          />
        </div>
      </div>
    </section>
  );
}
