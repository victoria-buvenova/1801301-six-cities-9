import { Link } from 'react-router-dom';
import { offers } from '../../mocks/offers';

type OfferCardProps = {
  id: number,
  cardClassName: string,
  onActivate: () => void;
  onDeactivate: () => void;
}

const formatPremium = (flag: boolean) => flag ? 'Premium' : '';
const formatFavorite = (flag: boolean) => flag ? 'place-card__bookmark-button--active' : '';

function OfferCard(props: OfferCardProps): JSX.Element {
  const { id, onActivate, onDeactivate } = props;
  const offer = offers.find((element) => element.id === id);
  if (typeof offer === 'undefined') {
    throw new Error();
  }

  const { isFavorite, isPremium, previewImage, price, rating, title, type } = offer;
  return (
    <article className={`${props.cardClassName} place-card`} onMouseEnter={onActivate} onMouseLeave={onDeactivate}>
      {isPremium &&
        <div className="place-card__mark">
          <span>{formatPremium(isPremium)}</span>
        </div>}
      <div className={`${props.cardClassName}__image-wrapper place-card__image-wrapper`}>
        <a href="#work-in-progress">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${formatFavorite(isFavorite)}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
