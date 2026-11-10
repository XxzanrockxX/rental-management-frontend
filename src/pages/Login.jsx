import './Login.css';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="login">
      <section className="login__container">
        <div className="login__brand">
          <h1 className="login__name">ADVANCE</h1>
          <p className="login__subtitle">RENT A CAR</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="login__title">Iniciar sesión</h2>

          <label className="login__label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="login__input"
            id="email"
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
            autoComplete="username"
            required
          />

          <label className="login__label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="login__input"
            id="password"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
          />

          <button className="login__button" type="submit">
            Iniciar sesión
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
