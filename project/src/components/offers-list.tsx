import { useState } from 'react';
import { Props } from './app/app-props';
import OfferCard from './offer-card';


function OffersList(props: Props): JSX.Element {
  const { offers } = props;
  const [, setActive] = useState(null as number | null);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (<OfferCard key={offer.id} id={offer.id} onActivate={() => setActive(offer.id)} onDeactivate={() => setActive(null)} />))}
    </div>
  );
}

export default OffersList;
