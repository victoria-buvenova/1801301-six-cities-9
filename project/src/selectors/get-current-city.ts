import { State } from '../store/reducer';

export const getCurrentCity = (state: State) => state.selectedCityName;
