import { useSelector } from 'react-redux';
import { CITIES_LIST } from '../../constants';
import { getCurrentCity } from '../../selectors/get-current-city';
import { getLoadingState } from '../../selectors/get-loading-state';
import { Props } from '../app/app-props';
import CitiesList from '../cities/cities-list';
import Map from '../map/map';
import OffersList from '../offers/offers-list';
import SortingTypes from '../sorting/sorting-types';
import Spinner from '../spinner/spinner';
import MainEmpty from './main-empty';

type MainPageProps = Props & { setActive: (value: number | undefined) => void, active: number | undefined }

function MainPage(props: MainPageProps): JSX.Element {
  const { offers, active, setActive } = props;
  const currentCity = useSelector(getCurrentCity);
  const loading = useSelector(getLoadingState);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="#work-in-progress">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#work-in-progress">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#work-in-progress">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList citiesList={CITIES_LIST} />
          </section>
        </div>
        <div className="cities">
          {offers.length > 0 &&
            (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{`${props.offers.length} places to stay in ${currentCity}`}</b>
                  <SortingTypes />
                  <OffersList
                    className='cities__places-list tabs__content' offers={offers}
                    active={active}
                    setActive={setActive}
                    cardClassName='cities__place-card'
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    < Map city={offers[0].city} points={offers.map((offer) => (
                      {
                        latitude: offer.location.latitude,
                        longitude: offer.location.longitude,
                        zoom: offer.location.zoom,
                        isActive: offer.id === active,
                      }
                    ))}
                    />
                  </section>
                </div>
              </div>
            )}
          {!loading && !offers.length && <MainEmpty />}
          {loading && <Spinner />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
