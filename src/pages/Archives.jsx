import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import ContractReadOnly from '../components/contract/ContractReadOnly';
import './Archives.css';

const STORAGE_KEY = 'advance-rent-a-car-contracts';

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getContractDate(contract) {
  const date = new Date(contract.createdAt);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  if (!value) return 'Fecha no disponible';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Fecha no disponible';

  return date.toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function getUserContracts(currentUser) {
  try {
    const savedContracts = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    if (!Array.isArray(savedContracts)) return [];

    return savedContracts
      .filter((contract) => contract.createdBy === currentUser)
      .sort((a, b) => (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
  } catch {
    return [];
  }
}

function getSearchableText(contract) {
  const date = getContractDate(contract);

  const dateText = date
    ? [
      date.toLocaleDateString('es-EC'),
      date.getFullYear(),
      MONTHS[date.getMonth()],
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
    ].join(' ')
    : '';

  return normalizeText([
    contract['customer-name'],
    contract['customer-id'],
    contract['vehicle-plate'],
    contract['vehicle-brand'],
    contract['vehicle-model'],
    contract['vehicle-year'],
    contract['departure-date'],
    contract['arrival-date'],
    contract.destination,
    contract.selectedLocation?.name,
    dateText,
  ].join(' '));
}

function Archives() {
  const currentUser = sessionStorage.getItem('advance-current-user');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [openedContractId, setOpenedContractId] = useState(null);

  const contracts = getUserContracts(currentUser);

  const availableYears = new Set();

  contracts.forEach((contract) => {
    const date = getContractDate(contract);

    if (date) availableYears.add(date.getFullYear());
  });

  const years = [...availableYears].sort((a, b) => b - a);

  const availableMonths = new Set();

  if (selectedYear !== null) {
    contracts.forEach((contract) => {
      const date = getContractDate(contract);

      if (date && date.getFullYear() === selectedYear) {
        availableMonths.add(date.getMonth());
      }
    });
  }

  const months = [...availableMonths].sort((a, b) => b - a);

  let visibleContracts = contracts;

  if (searchTerm.trim()) {
    const query = normalizeText(searchTerm);

    visibleContracts = visibleContracts.filter((contract) => (
      getSearchableText(contract).includes(query)
    ));
  } else {
    if (selectedYear !== null) {
      visibleContracts = visibleContracts.filter((contract) => {
        const date = getContractDate(contract);

        return date && date.getFullYear() === selectedYear;
      });
    }

    if (selectedMonth !== null) {
      visibleContracts = visibleContracts.filter((contract) => {
        const date = getContractDate(contract);

        return date
          && date.getMonth() === selectedMonth
          && date.getFullYear() === selectedYear;
      });
    }
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const isSearching = searchTerm.trim().length > 0;

  const goToYears = () => {
    setSelectedYear(null);
    setSelectedMonth(null);
    setOpenedContractId(null);
  };

  const goToMonths = () => {
    setSelectedMonth(null);
    setOpenedContractId(null);
  };

  const openYear = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null);
    setSearchTerm('');
    setOpenedContractId(null);
  };

  const openMonth = (month) => {
    setSelectedMonth(month);
    setSearchTerm('');
    setOpenedContractId(null);
  };

  return (
    <div className="archives">
      <Header />

      <main className="archives__content">
        <div className="archives__heading">
          <div>
            <h1>Archivos</h1>
            <p>Consulta los contratos que has realizado.</p>
          </div>
        </div>

        <div className="archives__search">
          <span className="archives__search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setOpenedContractId(null);
            }}
            placeholder="Buscar por fecha, cliente o vehículo..."
            aria-label="Buscar contratos por fecha, cliente o vehículo"
          />

          {searchTerm && (
            <button
              type="button"
              className="archives__clear"
              onClick={() => setSearchTerm('')}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>

        {!isSearching && (
          <nav className="archives__breadcrumbs" aria-label="Ubicación actual">
            <button type="button" onClick={goToYears}>
              Archivos
            </button>

            {selectedYear !== null && (
              <>
                <span>/</span>
                <button
                  type="button"
                  onClick={goToMonths}
                  disabled={selectedMonth === null}
                >
                  {selectedYear}
                </button>
              </>
            )}

            {selectedMonth !== null && (
              <>
                <span>/</span>
                <span>{MONTHS[selectedMonth]}</span>
              </>
            )}
          </nav>
        )}

        {isSearching ? (
          <section className="archives__section">
            <h2>Resultados de búsqueda</h2>
            <p className="archives__result-count">
              {visibleContracts.length}
              {' '}
              {visibleContracts.length === 1
                ? 'contrato encontrado'
                : 'contratos encontrados'}
            </p>

            <ContractList
              contracts={visibleContracts}
              openedContractId={openedContractId}
              setOpenedContractId={setOpenedContractId}
            />
          </section>
        ) : selectedMonth !== null ? (
          <section className="archives__section">
            <h2>Contratos de {MONTHS[selectedMonth]}</h2>

            <ContractList
              contracts={visibleContracts}
              openedContractId={openedContractId}
              setOpenedContractId={setOpenedContractId}
            />
          </section>
        ) : selectedYear !== null ? (
          <section className="archives__section">
            <h2>Meses de {selectedYear}</h2>

            {months.length > 0 ? (
              <div className="archives__folders">
                {months.map((month) => (
                  <button
                    type="button"
                    className="archives__folder"
                    key={month}
                    onClick={() => openMonth(month)}
                  >
                    <span className="archives__folder-icon" aria-hidden="true">
                      📁
                    </span>
                    <span>{MONTHS[month]}</span>
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState message="No hay contratos registrados en este año." />
            )}
          </section>
        ) : (
          <section className="archives__section">
            <h2>Carpetas</h2>

            {years.length > 0 ? (
              <div className="archives__folders">
                {years.map((year) => (
                  <button
                    type="button"
                    className="archives__folder"
                    key={year}
                    onClick={() => openYear(year)}
                  >
                    <span className="archives__folder-icon" aria-hidden="true">
                      📁
                    </span>
                    <span>{year}</span>
                  </button>
                ))}
              </div>
            ) : (
              <EmptyState message="Todavía no tienes contratos guardados." />
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function ContractList({
  contracts,
  openedContractId,
  setOpenedContractId,
}) {
  if (contracts.length === 0) {
    return <EmptyState message="No se encontraron contratos." />;
  }

  return (
    <div className="archives__contract-list">
      {contracts.map((contract) => {
        const isOpen = openedContractId === contract.id;

        return (
          <article className="archives__contract" key={contract.id}>
            <button
              type="button"
              className="archives__contract-button"
              onClick={() => setOpenedContractId(isOpen ? null : contract.id)}
              aria-expanded={isOpen}
            >
              <span className="archives__document-icon" aria-hidden="true">
                📄
              </span>

              <span className="archives__contract-main">
                <strong>
                  {contract['customer-name'] || 'Cliente sin nombre'}
                </strong>
                <span>
                  {contract['vehicle-plate'] || 'Sin placa'}
                  {' · '}
                  {contract['vehicle-brand'] || ''}
                  {' '}
                  {contract['vehicle-model'] || ''}
                </span>
              </span>

              <span className="archives__contract-date">
                {formatDate(contract.createdAt)}
              </span>

              <span className="archives__contract-arrow" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {isOpen && (
              <div className="archives__contract-details">
                <ContractReadOnly contract={contract} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="archives__empty">
      <span aria-hidden="true">📂</span>
      <p>{message}</p>
    </div>
  );
}

export default Archives;
