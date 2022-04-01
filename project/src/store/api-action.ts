import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { api, store } from '.';
import { Offer } from '../components/app/app-props';
import { APIRoute, AUTHORIZATION_STATUS, HTTP_CODE } from '../constants';
import { requireAuthorization } from './action';


export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
  SORT_BY_CHANGE_ACTION: 'SORT_BY_CHANGE_ACTION',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
};

const isAxiosInstance = (extra: unknown): extra is AxiosInstance => 'get' in (extra as Record<string, unknown>);

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

export const checkAuthAction = createAsyncThunk(
  '/login',
  async () => {
    // eslint-disable-next-line no-console
    console.log('hi');
    await api.get(APIRoute.Login);
    api.interceptors.response.use((response) => {
      if (response.status === HTTP_CODE.UNAUTHORIZED) {
        store.dispatch(requireAuthorization(AUTHORIZATION_STATUS.NO_AUTH));
      }
      return response;
    });
    store.dispatch(requireAuthorization(AUTHORIZATION_STATUS.AUTH));
  },
);
