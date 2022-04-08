import { Offer, Props } from '../app/app-props';
import Header from '../header/header';
import { FavoritesCity } from './favorites-city';


const getUniqueCities = (offers: Offer[]): string[] => [...new Set(offers.map((offer) => offer.city.name))];
function Favorites(props: Props): JSX.Element {
  const { offers } = props;
  const cities = getUniqueCities(offers);
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => <FavoritesCity key={city} name={city} offers={offers} />)}
            </ul>
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
