import { Offer } from '../app/app-props';
import { FavoritesCityPlace } from './favorites-city-place';

interface FavoritesCityProps{
  name: string;
  offers: Offer[];
}
export function FavoritesCity (props:FavoritesCityProps){
  const {name,offers} = props;
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#work-in-progress">
            <span>{name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.filter((offer)=>offer.city.name===name).map((offer)=><FavoritesCityPlace key={offer.id} offer={offer}/>)}
      </div>
    </li>

  );
}
