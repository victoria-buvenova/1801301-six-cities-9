import { CityType } from './types/app-types';

export const SORT_TYPE: { [key: string]: string } = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRated: 'Top rated first',
};


export const SORT_TYPE_KEYS = {
  Popular: 'Popular',
  PriceLowToHigh: 'PriceLowToHigh',
  PriceHighToLow: 'PriceHighToLow',
  TopRated: 'TopRated',
};

export const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN'
}

export enum Routes {
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorites',
  Main = '/',
  Hotels = '/hotels',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum HttpCodeMessage {
  UNAUTHORIZED = '401 Unauthorized',
  BAD_REQUEST = '400 Bad Request'
}


export const RATING_PRECISION = 1;
export const PER_CENT = 100;
export const HIGHEST_RATING = 5;

export const CITIES: CityType = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 12,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 12,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 12,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 12,
    },
  },
};

export enum Response {
  UNKNOWN,
  SUCCESS,
  PENDING,
  ERROR
}

export const FAVORITES_INPUT_DATA = [
  { value: '5', id: '5-stars', title: 'perfect' },
  { value: '4', id: '4-stars', title: 'good' },
  { value: '3', id: '3-stars', title: 'not bad' },
  { value: '2', id: '2-stars', title: 'badly' },
  { value: '1', id: '1-stars', title: 'terribly' },
];
