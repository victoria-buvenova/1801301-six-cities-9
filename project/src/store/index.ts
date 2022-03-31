import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { initialState, reducer } from './reducer';

export const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});


