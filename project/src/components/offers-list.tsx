import { Props } from './app/app-props';
import OfferCard from './offer-card';


function OffersList(props: Props): JSX.Element {
  const { offers } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<OfferCard key={offer.id} id={offer.id} />))}
    </div>
  );
}

export default OffersList;
