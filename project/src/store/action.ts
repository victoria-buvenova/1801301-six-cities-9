import { createAction } from '@reduxjs/toolkit';


export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
  SORT_BY_CHANGE: 'SORT_BY_CHANGE',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
  AUTHORIZATION_COMPLETED: 'AUTHORIZATION_COMPLETED',
  FETCH_CURRENT_PROPERTY: 'FETCH_CURRENT_PROPERTY',
  FETCH_NEAR_BY: 'FETCH_NEAR_BY',
  FETCH_REVIEWS: 'FETCH_REVIEWS',
};


export const cityChange = createAction(Action.CITY_CHANGE, (value) => ({
  payload: value,
}));

export const offersListFillAction = createAction(Action.OFFERS_LIST_FILL, (value) => ({
  payload: value,
}));

export const sortByChange = createAction(Action.SORT_BY_CHANGE, (value) => ({
  payload: value,
}));

export const requireAuthorization = createAction(Action.REQUIRE_AUTHORIZATION, (value) => ({
  payload: value,
}));

export const authorizationCompleted = createAction(Action.AUTHORIZATION_COMPLETED, () => ({
  payload: undefined,
}));

export const fetchCurrentProperty = createAction(Action.FETCH_CURRENT_PROPERTY, (value) => ({
  payload: value,
}));

export const fetchNearBy = createAction(Action.FETCH_NEAR_BY, (value) => ({
  payload: value,
}));

export const fetchReviews = createAction(Action.FETCH_REVIEWS, (value) => ({
  payload: value,
}));
