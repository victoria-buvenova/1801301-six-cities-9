import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus, CITIES, Response } from '../../constants';
import { getCurrentCity } from '../../selectors/get-current-city';
import { getCurrentProperty } from '../../selectors/get-current-property';
import { getLoadingState } from '../../selectors/get-loading-state';
import { getNearByOffers } from '../../selectors/get-nearby-offers';
import { getRequireAuthorization } from '../../selectors/get-require-authorization';
import { getReviewPostStatus } from '../../selectors/get-review-post-status';
import { getReviews } from '../../selectors/get-reviews';
import { fetchCurrentPropertyAction, fetchNearByAction, fetchReviewsAction } from '../../store/api-action';
import { computeRatingPercent, formatRating, formatBedrooms, formatAdults, formatPrice } from '../../utils';
import { Offer } from '../app/app-props';
import CommentsForm from '../comments-form/comments-form';
import Header from '../header/header';
import Map from '../map/map';
import { NotFound } from '../not-found';
import OffersList from '../offers-list/offers-list';
import ReviewsList from '../reviews-list/reviews-list';

import Spinner from '../spinner/spinner';
import { PropertyInside } from './property-inside';
import { PropertyMark } from './property-mark';


type RoomProps = {
  active: number | undefined,
  offers: Offer[],
  setActive: (active: number | undefined) => void,
}


function Room(props: RoomProps): JSX.Element {
  const { active, offers, setActive } = props;
  const params = useParams();
  const currentId = params.id;
  const currentPropertyData = useSelector(getCurrentProperty);
  const loading = useSelector(getLoadingState);
  const authStatus = useSelector(getRequireAuthorization);
  const offersNearBy = useSelector(getNearByOffers);
  const reviews = useSelector(getReviews);
  const currentCity = useSelector(getCurrentCity);
  const reviewStatus = useSelector(getReviewPostStatus);
  const hasAccess = authStatus === AuthorizationStatus.AUTH;
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentId && reviewStatus === Response.SUCCESS) {
      dispatch(fetchReviewsAction(currentId));
    }
    if (currentId) {
      dispatch(fetchCurrentPropertyAction(currentId));
      dispatch(fetchNearByAction(currentId));
      dispatch(fetchReviewsAction(currentId));
    }
  }, [currentId, reviewStatus, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (currentPropertyData) {
    const { isPremium, title, rating, type, bedrooms, maxAdults, price, goods, images, host, description } = currentPropertyData;
    const formattedDescription = description.split('.');
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((imageUrl) => (
                  <div key={imageUrl} className="property__image-wrapper">
                    <img className="property__image" src={imageUrl} alt="Studio" />
                  </div>
                ))}
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
                      <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                    <span className="property__user-status">
                      {host.isPro && 'Pro'}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {formattedDescription[0]}
                    </p>
                    <p className="property__text">
                      {formattedDescription[1]}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList reviews={reviews.slice(0, 10)} />
                  {hasAccess && <CommentsForm currentId={currentId} />}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map city={CITIES[currentCity]} points={offers.map((offerNearby) => (
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
                offers={offersNearBy}
                active={active}
                setActive={setActive}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
  return (
    <NotFound />
  );
}

export default Room;
