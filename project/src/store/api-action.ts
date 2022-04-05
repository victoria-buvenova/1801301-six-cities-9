import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../components/app/app-props';
import { APIRoute, AUTHORIZATION_STATUS } from '../constants';
import { dropToken, saveToken } from '../services/token';
import { Auth, AuthUser } from '../types/auth-types';


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
  '/checkAuth',
  async (_, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data: { token, avatarUrl, email, id, name, isPro } } = await api.get(APIRoute.Login);
      saveToken(token);
      return {
        avatarUrl, email, id, name, isPro,
      };
    }
    catch (error) {
      return null;
    }
  },
);

export const loginAction = createAsyncThunk(
  '/login',
  async ({ email: emailInput, password }: Auth, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data: { token, avatarUrl, email, id, name, isPro } } = await api.post<AuthUser>(APIRoute.Login, { email: emailInput, password });
      saveToken(token);
      return {
        avatarUrl, email, id, name, isPro,
      };
    }
    catch (error) {
      return null;
    }
  },
);

export const logoutAction = createAsyncThunk(
  '/logout',
  async (_, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    await api.delete(APIRoute.Logout);
    dropToken();
    return AUTHORIZATION_STATUS.NO_AUTH;
  },
);
