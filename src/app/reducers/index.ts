import user from 'app/reducers/user-reducers';
import { combineReducers } from 'redux';
import { IRootState } from "app/types/IRootState";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers<IRootState>({
    user,
    router: connectRouter(history)
  });

export default rootReducer;
