import { State } from '../store/reducer';

export const getCurrentUserName = (state: State) => state.user?.email;
