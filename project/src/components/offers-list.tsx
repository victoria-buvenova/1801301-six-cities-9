import { OffersListProps } from './app/app-props';
import OfferCard from './offer-card';


function OffersList(props: OffersListProps): JSX.Element {
  const { offers, setActive } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<OfferCard key={offer.id} id={offer.id} onActivate={() => setActive(offer.id)} onDeactivate={() => setActive(undefined)} />))}
    </div>
  );
}

export default OffersList;
