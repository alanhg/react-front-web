import UserActionTypes from 'src/app/action-types/user-action-types';
import { IUserState } from 'src/app/types/IRootState';


const initUserReducer = (_0: IUserState, action) => {
  return action.payload;
};

const actionHandlers = {
  [UserActionTypes.INIT_USER]: initUserReducer,
};

const initState: IUserState = null;

export default (state = initState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};
