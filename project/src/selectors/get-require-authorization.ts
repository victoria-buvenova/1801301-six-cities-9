import { State } from '../store/reducer';

export const getRequireAuthorization = (state: State) => state.authorizationStatus;

