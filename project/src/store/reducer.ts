import { createReducer } from '@reduxjs/toolkit';
import { Offer, Review } from '../components/app/app-props';
import { AUTHORIZATION_STATUS } from '../constants';
import { User } from '../types/auth-types';
import { authorizationCompleted, cityChange, requireAuthorization, sortByChange } from './action';
import { checkAuthAction, fetchData, loginAction, logoutAction } from './api-action';

export interface State {
  selectedCityName: string,
  offers: Offer[],
  sortBy: string,
  reviews: Review[],
  loading: boolean,
  authorizationStatus: AUTHORIZATION_STATUS,
  user: User | null
}

export const initialState: State = {
  selectedCityName: 'Paris',
  offers: [],
  sortBy: 'Popular',
  reviews: [],
  loading: false,
  authorizationStatus: AUTHORIZATION_STATUS.UNKNOWN,
  user: null,
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.selectedCityName = action.payload;
    })
    .addCase(sortByChange, (state, action) => {
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
    })
    .addCase(authorizationCompleted, (state, action) => {
      state.authorizationStatus = AUTHORIZATION_STATUS.AUTH;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      const { payload } = action;
      state.authorizationStatus = payload ? AUTHORIZATION_STATUS.AUTH : AUTHORIZATION_STATUS.NO_AUTH;
      state.user = payload;
    })
    .addCase(logoutAction.fulfilled, (state, action) => {
      state.authorizationStatus = AUTHORIZATION_STATUS.NO_AUTH;
      state.user = null;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AUTHORIZATION_STATUS.AUTH;
      state.user = action.payload;
    });
});
