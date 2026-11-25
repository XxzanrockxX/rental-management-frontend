export default function ObservationsPanel({
  readOnly = false,
  values = {},
}) {
  const getValue = (field) => (
    readOnly ? values[field] ?? '' : undefined
  );

  return (
    <div className="observations-panel">
      <h2>OBSERVACIONES</h2>

      <textarea
        id="vehicle-observations"
        rows="7"
        placeholder="Describa el estado del vehículo y sus novedades..."
        readOnly={readOnly}
        value={getValue('vehicle-observations')}
      />

      <div className="observation-field">
        <label htmlFor="kilometers-traveled">
          KM RECORRIDO
        </label>

        <input
          id="kilometers-traveled"
          type="number"
          readOnly={readOnly}
          value={getValue('kilometers-traveled')}
        />
      </div>

      <div className="observation-field">
        <label htmlFor="delivered-by">
          QUIÉN ENTREGA
        </label>

        <input
          id="delivered-by"
          type="text"
          readOnly={readOnly}
          value={getValue('delivered-by')}
        />
      </div>

      <div className="observations-note">
        <h2>NOTA</h2>

        <p>
          LA RENTADORA NO SE RESPONSABILIZA POR OBJETOS PERDIDOS DENTRO
          DEL VEHÍCULO UNA VEZ SEA ENTREGADO A UN NUEVO ARRENDATARIO.
        </p>

        <p>
          EL ARRENDATARIO SE COMPROMETE A ENTREGAR EL VEHÍCULO A LA HORA
          ESTIPULADA EN LA HOJA DE RECEPCIÓN Y EN LAS CONDICIONES EN QUE
          LA RENTADORA SE LO ENTREGA.
        </p>

        <p className="contract-declaration">
          DECLARO HABER RECIBIDO EL VEHÍCULO EN LAS CONDICIONES INDICADAS.
          MEDIANTE EL PRESENTE DOCUMENTO MANIFIESTO MI CONFORMIDAD Y ME
          COMPROMETO A CANCELAR CUALQUIER DAÑO QUE SE PRODUZCA MIENTRAS
          TENGA EL VEHÍCULO.
        </p>

        <div className="client-signature">
          <span>FIRMA DEL CLIENTE</span>

          <div className="client-signature__line" />
        </div>
      </div>
    </div>
  );
}
