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

export enum AUTHORIZATION_STATUS { AUTH = 'AUTH', NO_AUTH = 'NO_AUTH', UNKNOWN = 'UNKNOWN' }

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}
