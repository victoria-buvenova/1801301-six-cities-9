import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../components/app/app-props';


export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
  SORT_BY_CHANGE_ACTION: 'SORT_BY_CHANGE_ACTION',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
};

const isAxiosInstance = (extra: unknown): extra is AxiosInstance => 'get' in (extra as Record<string, unknown>);

export const cityChangeAction = createAction(Action.CITY_CHANGE, (value) => ({
  payload: value,
}));

export const offersListFillAction = createAction(Action.OFFERS_LIST_FILL, (value) => ({
  payload: value,
}));

export const sortByChangeAction = createAction(Action.SORT_BY_CHANGE_ACTION, (value) => ({
  payload: value,
}));

export const requireAuthorization = createAction(Action.REQUIRE_AUTHORIZATION, (value) => ({
  payload: value,
}));

export const fetchData = createAsyncThunk(
  '/hotels',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(extra)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    const { data } = await extra.get<Offer[]>('/hotels');
    return data;
  },
);
