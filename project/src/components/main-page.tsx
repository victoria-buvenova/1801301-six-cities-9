import { useSelector } from 'react-redux';
import { CITIES_LIST } from '../mocks/offers';
import { getCurrentCity } from '../selectors/get-current-city';
import { Props } from './app/app-props';
import CitiesList from './cities/cities-list';
import Map from './map/map';
import OffersList from './offers/offers-list';

type MainPageProps = Props & { setActive: (value: number | undefined) => void, active: number | undefined }

function MainPage(props: MainPageProps): JSX.Element {
  const { offers, active, setActive } = props;
  const currentCity = useSelector(getCurrentCity);

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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList citiesList={CITIES_LIST} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${props.offers.length} places to stay in ${currentCity}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
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
        </div>
      </main>
    </div>
  );
}

export default MainPage;
