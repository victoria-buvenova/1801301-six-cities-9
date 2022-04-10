import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { Offer, Review } from '../components/app/app-props';
import { Routes, AUTHORIZATION_STATUS } from '../constants';
import { dropToken, saveToken } from '../services/token';
import { AddReview } from '../types/app-types';
import { Auth, AuthUser } from '../types/auth-types';
import { fetchCurrentProperty, fetchFavorites, fetchNearBy, fetchReviews } from './action';


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
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
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
      return {
        avatarUrl, email, id, name, isPro,
      };
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
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

export const fetchCurrentPropertyAction = createAsyncThunk(
  'data/hotels',
  async (offerId: string, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data } = await api.get<Offer>(`${Routes.Hotels}/${offerId}`);
      fetchCurrentProperty(data);
      return data;
    } catch (error) {
      return Promise.reject();
    }
  },
);

export const fetchNearByAction = createAsyncThunk(
  'data/nearby',
  async (offerId: string, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data } = await api.get<Offer[]>(`${Routes.Hotels}/${offerId}/nearby`);
      fetchNearBy(data);
      return data;
    } catch (error) {
      return Promise.reject();
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/reviews',
  async (offerId: string, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data } = await api.get<Review[]>(`${Routes.Comments}/${offerId}`);
      fetchReviews(data);
      return data;
    } catch (error) {
      return Promise.reject();
    }
  },
);

export const addReviewAction = createAsyncThunk(
  'add/review',
  async ({ userReview, offerId }: AddReview, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data } = await api.post<Review>(`${Routes.Comments}/${offerId}`, userReview);
      fetchReviews(data);
    }
    catch (error) {
      return Promise.reject();
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk(
  'data/favorites',
  async (_, thunkApi) => {
    const { extra: api, rejectWithValue } = thunkApi;
    if (!isAxiosInstance(api)) {
      return rejectWithValue(new Error('we expect axios'));
    }
    try {
      const { data } = await api.get<Offer[]>(`${Routes.Favorite}`);
      fetchFavorites(data);
      return data;
    } catch (error) {
      return Promise.reject();
    }
  },
);
