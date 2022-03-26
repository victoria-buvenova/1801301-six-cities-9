import City from './city';

type CitiesListProps = { citiesList: Array<string> }

function CitiesList(props: CitiesListProps) {
  const { citiesList } = props;
  return (
    <ul className="locations__list tabs__list">
      {citiesList.map((cityName) => (
        <City cityName={cityName} key={cityName} />
      ))}
    </ul>
  );
}

export default CitiesList;
