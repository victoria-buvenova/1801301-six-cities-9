import { useSelector } from 'react-redux';
import { CITIES, CITIES_LIST } from '../../constants';
import { getCurrentCity } from '../../selectors/get-current-city';
import { getLoadingState } from '../../selectors/get-loading-state';
import { Props } from '../app/app-props';
import CitiesList from '../cities-list/cities-list';
import Header from '../header/header';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import SortingTypes from '../sorting-types/sorting-types';
import Spinner from '../spinner/spinner';
import MainEmpty from './main-empty';

type MainPageProps = Props & { setActive: (value: number | undefined) => void, active: number | undefined }

function MainPage(props: MainPageProps): JSX.Element {
  const { offers, active, setActive } = props;
  const currentCity = useSelector(getCurrentCity);
  const loading = useSelector(getLoadingState);

  return (
    <div className="page page--gray page--main">
      <Header />
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
                    <Map city={CITIES[currentCity]} points={offers.map((offer) => (
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
