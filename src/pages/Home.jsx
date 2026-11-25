import Header from '../components/Header';
import MenuCard from '../components/MenuCard';

function Home() {
  return (
    <div className="home">
      <Header />

      <main className="home__content">
        <section className="home__menu" aria-label="Menú principal">
          <MenuCard
            icon="📄"
            title="Nuevo contrato"
            description="Registrar un nuevo alquiler"
            to="/contrato"
          />

          <MenuCard
            icon="📁"
            title="Archivos"
            description="Consultar contratos anteriores"
            to="/archivos"
          />

          <MenuCard
            icon="🚗"
            title="Registro de vehículos"
            description="Administrar vehículos de la empresa"
            to="/vehiculos"
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
