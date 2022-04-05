import { Offer } from './components/app/app-props';
import { HIGHEST_RATING, PER_CENT, RATING_PRECISION, SORT_TYPE_KEYS } from './constants';

export const getSortedOffersByType = (offers: Offer[], type: string): Offer[] => {
  switch (type) {
    case SORT_TYPE_KEYS.PriceHighToLow:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SORT_TYPE_KEYS.PriceLowToHigh:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SORT_TYPE_KEYS.TopRated:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};

export const hasWhiteSpace = (stringToCheck: string): boolean => stringToCheck.indexOf(' ') >= 0;

export const hasAtLeastDigit = (value: string): boolean => /\d/.test(value);

export const hasAtLeastLetter = (value: string): boolean => /[a-zA-Z]/.test(value);

export const isPasswordValid = (password: string): boolean => hasAtLeastDigit(password) && hasAtLeastLetter(password) && !hasWhiteSpace(password);

export const formatRating = (rating: number) => rating.toFixed(RATING_PRECISION);
export const computeRatingPercent = (rating: number) => `${Math.round(rating * PER_CENT / HIGHEST_RATING)}%`;
export const formatBedrooms = (bedrooms: number) => bedrooms === 1 ? `${bedrooms} bedroom` : `${bedrooms} bedrooms`;
export const formatAdults = (maxAdults: number) => maxAdults === 1 ? `Max ${maxAdults} adult` : `Max ${maxAdults} adults`;
export const formatPrice = (price: number) => price.toFixed(0);
