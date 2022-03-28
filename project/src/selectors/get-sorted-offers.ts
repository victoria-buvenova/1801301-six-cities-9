import { Offer } from '../components/app/app-props';
import { State } from '../store/reducer';
import { getSortedOffersByType } from '../utils';
import { getOffersByCity } from './get-offers-by-city';

export const getSortedOffers = (state: State): Offer[] => {
  const offersByCity = getOffersByCity(state);
  return getSortedOffersByType(offersByCity, state.sortBy);
};
