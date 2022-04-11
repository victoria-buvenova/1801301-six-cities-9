import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFavoriteAction } from '../../store/api-action';
import { Offer } from '../app/app-props';
import { MouseEvent } from 'react';

interface FavoritesCityPlaceProps {
  offer: Offer
}

export function FavoritesCityPlace(props: FavoritesCityPlaceProps) {
  const { offer } = props;
  const dispatch = useDispatch();
  const onFavoriteChangeClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setFavoriteAction({ offerId: Number(offer.id), status: offer.isFavorite ? 0 : 1 }));
  };
  return (
    <article className="favorites__card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={(evt) => onFavoriteChangeClickHandle(evt)} className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article >
  );
}

