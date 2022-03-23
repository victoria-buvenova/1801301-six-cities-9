import { useParams } from 'react-router-dom';
import { offers } from '../../mocks/offers';
import { offersNearby } from '../../mocks/offers-nearby';
import { reviews } from '../../mocks/reviews';
import CommentsForm from '../comments-form';
import Map from '../map/map';
import OffersList from '../offers/offers-list';
import ReviewsList from '../reviews/reviews-list';
import { PropertyInside } from './property-inside';
import { PropertyMark } from './property-mark';

const RATING_PRECISION = 1;
const PER_CENT = 100;
const HIGHEST_RATING = 5;

type RoomProps = { setActive: (value: number | undefined) => void, active: number | undefined }

const formatRating = (rating: number) => rating.toFixed(RATING_PRECISION);
const computeRatingPercent = (rating: number) => `${Math.round(rating * PER_CENT / HIGHEST_RATING)}%`;
const formatBedrooms = (bedrooms: number) => bedrooms === 1 ? `${bedrooms} bedroom` : `${bedrooms} bedrooms`;
const formatAdults = (maxAdults: number) => maxAdults === 1 ? `Max ${maxAdults} adult` : `Max ${maxAdults} adults`;
const formatPrice = (price: number) => price.toFixed(0);

function Room(props: RoomProps): JSX.Element {
  const { active, setActive } = props;
  const params = useParams();
  const currentId = params.id;
  const offer = offers.find((element) => element.id === Number(currentId));
  if (typeof offer === 'undefined') {
    throw new Error();
  }
  const { isPremium, title, rating, type, bedrooms, maxAdults, price, goods } = offer;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
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

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              <div className="property__image-wrapper">
                <img className="property__image" src="img/room.jpg" alt="Studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-02.jpg" alt="Studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-03.jpg" alt="Studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/studio-01.jpg" alt="Studio" />
              </div>
              <div className="property__image-wrapper">
                <img className="property__image" src="img/apartment-01.jpg" alt="Studio" />
              </div>
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <PropertyMark isPremium={isPremium} />
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: computeRatingPercent(rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{formatRating(rating)}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {formatBedrooms(bedrooms)}
                </li>
                <li className="property__feature property__feature--adults">
                  {formatAdults(maxAdults)}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{formatPrice(price)}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <PropertyInside goods={goods} />
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <CommentsForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            < Map city={offers[0].city} points={offersNearby.map((offerNearby) => (
              {
                latitude: offerNearby.location.latitude,
                longitude: offerNearby.location.longitude,
                zoom: offerNearby.location.zoom,
                isActive: offerNearby.id === active,
              }
            ))}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              className='near-places__list'
              cardClassName='near-places__card'
              offers={offersNearby}
              active={active}
              setActive={setActive}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
