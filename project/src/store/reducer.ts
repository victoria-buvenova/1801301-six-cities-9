import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../components/app/app-props';
import { offers } from '../mocks/offers';
import { cityChangeAction, offersListFillAction, sortByChangeAction } from './action';

export interface State {
  selectedCityName: string,
  offers: Offer[],
  sortBy: string
}

export const initialState: State = {
  selectedCityName: 'Paris',
  offers: offers,
  sortBy: 'Popular',
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
