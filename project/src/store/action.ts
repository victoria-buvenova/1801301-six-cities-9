import { createAction } from '@reduxjs/toolkit';

export const Action = {
  CITY_CHANGE: 'CITY_CHANGE',
  OFFERS_LIST_FILL: 'OFFERS_LIST_FILL',
};

//export const cityChangeAction = createAction(Action.CITY_CHANGE);
export const offersListFillAction = createAction(Action.OFFERS_LIST_FILL);

/*export const cityChangeAction = ((value: string) => ({
  type: Action.CITY_CHANGE,
  payload: value,
});*/

export const cityChangeAction = createAction(Action.CITY_CHANGE, (value) => ({
  payload: value,
}));
