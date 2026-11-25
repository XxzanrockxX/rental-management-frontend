export default function ContractSave({ saveFeedback, isSaving }) {
  return (
<div className="contract-save">
  {saveFeedback.message && (
    <p
      className={`contract-save__feedback contract-save__feedback--${saveFeedback.type}`}
      role={saveFeedback.type === 'error' ? 'alert' : 'status'}
    >
      {saveFeedback.message}
    </p>
  )}

  <button
    className="contract-save__button"
    type="submit"
    disabled={isSaving}
  >
    {isSaving && <span className="contract-save__spinner" aria-hidden="true" />}
    {isSaving ? 'GUARDANDO CONTRATO...' : 'GUARDAR CONTRATO'}
  </button>
</div>
  );
}
