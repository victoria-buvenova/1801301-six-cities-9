import { createAsyncThunk } from '@reduxjs/toolkit';
import request, { AxiosInstance } from 'axios';
import { Offer } from '../components/app/app-props';
import { Routes, AUTHORIZATION_STATUS, HTTP_CODE, HTTP_CODE_MESSAGE } from '../constants';
import { dropToken, saveToken } from '../services/token';
import { Auth, AuthUser } from '../types/auth-types';
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
  '/checkAuth',
  async (_, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data: { token, avatarUrl, email, id, name, isPro } } = await api.get(Routes.Login);
      saveToken(token);
      return {
        avatarUrl, email, id, name, isPro,
      };
    }
    catch (error) {
      if (!request.isAxiosError(error)) {
        throw error;
      }
      if (error.response?.status === HTTP_CODE.UNAUTHORIZED ||
        error.response?.data.message === HTTP_CODE_MESSAGE.UNAUTHORIZED ||
        error.response?.status === HTTP_CODE.BAD_REQUEST ||
        error.response?.data.message === HTTP_CODE_MESSAGE.BAD_REQUEST
      ) {
        requireAuthorization(AUTHORIZATION_STATUS.NO_AUTH);
      }
      return Promise.reject();
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
      const { data: { token, avatarUrl, email, id, name, isPro } } = await api.post<AuthUser>(Routes.Login, { email: emailInput, password });
      saveToken(token);
      requireAuthorization(AUTHORIZATION_STATUS.AUTH);
      return {
        avatarUrl, email, id, name, isPro,
      };
    }
    catch (error) {
      requireAuthorization(AUTHORIZATION_STATUS.NO_AUTH);
      return Promise.reject();
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
    await api.delete(Routes.Logout);
    dropToken();
    return AUTHORIZATION_STATUS.NO_AUTH;
  },
);
