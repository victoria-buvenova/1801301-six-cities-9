import { createReducer } from '@reduxjs/toolkit';
import { Offer, Review } from '../components/app/app-props';
import { cityChangeAction, offersListFillAction, sortByChangeAction } from './action';

export interface State {
  selectedCityName: string,
  offers: Offer[],
  sortBy: string,
  reviews: Review[]
}

export const initialState: State = {
  selectedCityName: 'Paris',
  offers: [],
  sortBy: 'Popular',
  reviews: [],
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChangeAction, (state, action) => {
      state.selectedCityName = action.payload;
    })
    .addCase(offersListFillAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(sortByChangeAction, (state, action) => {
      state.sortBy = action.payload;
    });
});
