import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCity } from '../../selectors/get-current-city';
import { cityChangeAction } from '../../store/action';

type CityProps = { cityName: string }

function City(props: CityProps) {
  const { cityName } = props;
  const currentCityName = useSelector(getCurrentCity);
  const dispatch = useDispatch();
  const handleCityClick = (selectedCityName: string) => {
    dispatch(cityChangeAction(selectedCityName));
  };

  return (
    <li className="locations__item">
      <a onClick={() => handleCityClick(cityName)} className={`locations__item-link tabs__item ${cityName === currentCityName ? 'tabs__item--active' : ''}`} href="#work-in-progress">
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default City;
