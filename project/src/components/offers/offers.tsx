import { OffersListProps } from '../app/app-props';
import OfferCard from './offer-card';

type OffersListExtendedProps = OffersListProps & { className: string, cardClassName: string }

function OffersList(props: OffersListExtendedProps): JSX.Element {
  const { offers, setActive, className, cardClassName } = props;
  return (
    <div className={`${className} places__list`}>
      {offers.map((offer) => (<OfferCard offers={offers} cardClassName={cardClassName} key={offer.id} id={offer.id} onActivate={() => setActive ? setActive(offer.id) : undefined} onDeactivate={() => setActive ? setActive(undefined) : undefined} />))}
    </div>
  );
}

export default OffersList;
