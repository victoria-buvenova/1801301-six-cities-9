import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../components/app/app-props';
import { offers } from '../mocks/offers';
import { cityChangeAction } from './action';

export interface State {
  city: string,
  offers: Offer[]
}

export const initialState = {
  city: 'Amsterdam',
  offers: offers,
};


export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChangeAction, (state, action) => {
      state.city = action.payload;
    });
  return initialState;
});
