import { createReducer } from '@reduxjs/toolkit';
import { Offer, Review } from '../components/app/app-props';
import { AUTHORIZATION_STATUS } from '../constants';
import { cityChangeAction, requireAuthorization, sortByChangeAction } from './action';
import { fetchData } from './api-action';

export interface State {
  selectedCityName: string,
  offers: Offer[],
  sortBy: string,
  reviews: Review[],
  loading: boolean,
  authorizationStatus: AUTHORIZATION_STATUS
}

export const initialState: State = {
  selectedCityName: 'Paris',
  offers: [],
  sortBy: 'Popular',
  reviews: [],
  loading: false,
  authorizationStatus: AUTHORIZATION_STATUS.UNKNOWN,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
