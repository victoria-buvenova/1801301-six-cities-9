import { State } from '../store/reducer';

export const getOffersNumber = (state: State) => state.offers.length;
