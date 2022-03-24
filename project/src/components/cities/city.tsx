type CityProps = { city: string }

function City(props: CityProps) {
  const { city } = props;
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city === 'Paris' ? 'tabs__item--active' : ''}`} href="#work-in-progress">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default City;
