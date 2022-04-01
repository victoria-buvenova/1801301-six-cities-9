import { createAction } from '@reduxjs/toolkit';


export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
  SORT_BY_CHANGE_ACTION: 'SORT_BY_CHANGE_ACTION',
  REQUIRE_AUTHORIZATION: 'REQUIRE_AUTHORIZATION',
};


export const cityChangeAction = createAction(Action.CITY_CHANGE, (value) => ({
  payload: value,
}));

export const offersListFillAction = createAction(Action.OFFERS_LIST_FILL, (value) => ({
  payload: value,
}));

export const sortByChangeAction = createAction(Action.SORT_BY_CHANGE_ACTION, (value) => ({
  payload: value,
}));

export const requireAuthorization = createAction(Action.REQUIRE_AUTHORIZATION, (value) => ({
  payload: value,
}));
