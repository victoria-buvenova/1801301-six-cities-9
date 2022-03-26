import { createAction } from '@reduxjs/toolkit';

export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
};


export const cityChangeAction = createAction(Action.CITY_CHANGE, (value) => ({
  payload: value,
}));

export const offersListFillAction = createAction(Action.OFFERS_LIST_FILL, (value) => ({
  payload: value,
}));
