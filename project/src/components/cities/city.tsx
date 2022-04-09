import { useDispatch, useSelector } from 'react-redux';
import { getCurrentCity } from '../../selectors/get-current-city';
import { cityChange } from '../../store/action';
import { MouseEvent } from 'react';

type CityProps = { cityName: string }

function City(props: CityProps) {
  const { cityName } = props;
  const currentCityName = useSelector(getCurrentCity);
  const dispatch = useDispatch();
  const handleCityClick = (evt: MouseEvent<HTMLAnchorElement>, selectedCityName: string) => {
    evt.preventDefault();
    dispatch(cityChange(selectedCityName));
  };

  return (
    <li className="locations__item">
      <a onClick={(evt) => handleCityClick(evt, cityName)} className={`locations__item-link tabs__item ${cityName === currentCityName ? 'tabs__item--active' : ''}`} href="#work-in-progress">
        <span>{cityName}</span>
      </a>
    </li>
  );
}

export default City;
