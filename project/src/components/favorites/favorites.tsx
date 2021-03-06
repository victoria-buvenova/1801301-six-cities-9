import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingState } from '../../selectors/get-loading-state';
import { fetchFavoritesAction } from '../../store/api-action';
import { Offer, Props } from '../app/app-props';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { FavoritesCity } from './favorites-city';


const getUniqueCities = (offers: Offer[]): string[] => [...new Set(offers.map((offer) => offer.city.name))];
function Favorites(props: Props): JSX.Element {
  const { offers } = props;
  const cities = getUniqueCities(offers);
  const loading = useSelector(getLoadingState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {cities.length > 0 ? (
              <ul className="favorites__list">
                {cities.map((city) => <FavoritesCity key={city} name={city} offers={offers} />)}
              </ul>
            ) : <p>Nothing yet saved</p>}
            {loading && <Spinner />}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default Favorites;
