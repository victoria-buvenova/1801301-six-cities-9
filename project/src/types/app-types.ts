import { City } from '../components/app/app-props';
import { Response } from '../constants';

export type CityType = {
  [key: string]: City
};

export type ReviewPost = {
  comment: string,
  rating: number
};

export type AddReview = {
  userReview: ReviewPost,
  offerId: number
};

export type ResponseType = Response;

export type SetFavorite = {
  offerId: number,
  status: number
};
