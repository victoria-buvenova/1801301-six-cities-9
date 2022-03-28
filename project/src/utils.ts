import { Offer } from './components/app/app-props';
import { SORT_TYPE_KEYS } from './constants';

export const getSortedOffersByType = (offers: Offer[], type: string): Offer[] => {
  switch (type) {
    case SORT_TYPE_KEYS.PriceHighToLow:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SORT_TYPE_KEYS.PriceLowToHigh:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SORT_TYPE_KEYS.TopRated:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
