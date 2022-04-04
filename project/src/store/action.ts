import { createAction } from '@reduxjs/toolkit';


export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
  SORT_BY_CHANGE: 'SORT_BY_CHANGE',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
  AUTHORIZATION_COMPLETED: 'AUTHORIZATION_COMPLETED',
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
