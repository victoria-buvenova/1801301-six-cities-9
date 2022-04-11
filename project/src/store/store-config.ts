import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { initialState, reducer } from './reducer';

export const api = createAPI();

export const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});


