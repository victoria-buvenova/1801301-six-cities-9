import { State } from '../store/reducer';

export const getOffersByCity = (state: State) => state.offers.filter((offer) => offer.city.name === state.selectedCityName);
