function MenuCard({ title, description, icon }) {
  return (
    <article className="menu-card">
      <div className="menu-card__icon" aria-hidden="true">
        {icon}
      </div>

      <div className="menu-card__content">
        <h2 className="menu-card__title">{title}</h2>
        <p className="menu-card__description">{description}</p>
      </div>
    </article>
  );
}

export default MenuCard;

