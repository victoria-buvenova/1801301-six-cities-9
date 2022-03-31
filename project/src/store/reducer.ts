import { createReducer } from '@reduxjs/toolkit';
import { Offer, Review } from '../components/app/app-props';
import { cityChangeAction, fetchData, sortByChangeAction } from './action';

export interface State {
  selectedCityName: string,
  offers: Offer[],
  sortBy: string,
  reviews: Review[],
  loading: boolean
}

export const initialState: State = {
  selectedCityName: 'Paris',
  offers: [],
  sortBy: 'Popular',
  reviews: [],
  loading: false,
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChangeAction, (state, action) => {
      state.selectedCityName = action.payload;
    })
    .addCase(sortByChangeAction, (state, action) => {
      state.sortBy = action.payload;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.loading = false;
    })
    .addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
});
