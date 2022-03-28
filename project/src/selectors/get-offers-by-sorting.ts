import { Offer } from '../components/app/app-props';
import { State } from '../store/reducer';
import { getSortedOffersByType } from '../utils';

export const getOffersBySorting = (state: State): Offer[] => getSortedOffersByType(state.offers, state.sortBy);
