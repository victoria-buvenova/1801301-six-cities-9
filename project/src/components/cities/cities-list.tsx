import City from './city';

type CitiesListProps = { citiesList: Array<string> }

function CitiesList(props: CitiesListProps) {
  const { citiesList } = props;
  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((city) => (
        <City city={city} key={city} />
      ))}
    </ul>
  );
}

export default CitiesList;
