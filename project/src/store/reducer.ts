import { createReducer } from '@reduxjs/toolkit';
import { Offer, Review } from '../components/app/app-props';
import { AuthorizationStatus, Response } from '../constants';
import { ResponseType } from '../types/app-types';
import { User } from '../types/auth-types';
import { authorizationCompleted, cityChange, requireAuthorization, sortByChange } from './action';
import { addReviewAction, checkAuthAction, fetchCurrentPropertyAction, fetchData, fetchFavoritesAction, fetchNearByAction, fetchReviewsAction, loginAction, logoutAction } from './api-action';

export interface State {
  selectedCityName: string,
  offers: Offer[],
  sortBy: string,
  reviews: Review[],
  loading: boolean,
  authorizationStatus: AuthorizationStatus,
  user: User | null,
  currentProperty: Offer | null,
  offersNearBy: Offer[],
  reviewPostStatus: ResponseType,
  loginMessage: string | null,
  favorites: Offer[]
}

export const initialState: State = {
  selectedCityName: 'Paris',
  offers: [],
  sortBy: 'Popular',
  reviews: [],
  loading: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
  currentProperty: null,
  offersNearBy: [],
  reviewPostStatus: Response.UNKNOWN,
  loginMessage: null,
  favorites: [],
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
      state.authorizationStatus = AuthorizationStatus.AUTH;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      const { payload } = action;
      state.authorizationStatus = payload ? AuthorizationStatus.AUTH : AuthorizationStatus.NO_AUTH;
      state.user = payload ? payload : null;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = null;
    })
    .addCase(logoutAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = null;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
      state.user = action.payload;
    })
    .addCase(loginAction.rejected, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = null;
      state.loginMessage = 'Login error';
    })
    .addCase(fetchCurrentPropertyAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchCurrentPropertyAction.fulfilled, (state, action) => {
      state.currentProperty = action.payload;
      state.loading = false;
    })
    .addCase(fetchNearByAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchNearByAction.fulfilled, (state, action) => {
      state.offersNearBy = action.payload;
      state.loading = false;
    })
    .addCase(fetchReviewsAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    })
    .addCase(addReviewAction.pending, (state, action) => {
      state.reviewPostStatus = Response.PENDING;
    })
    .addCase(addReviewAction.rejected, (state, action) => {
      state.reviewPostStatus = Response.ERROR;
    })
    .addCase(addReviewAction.fulfilled, (state, action) => {
      state.reviewPostStatus = Response.SUCCESS;
    })
    .addCase(fetchFavoritesAction.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
    });
});
