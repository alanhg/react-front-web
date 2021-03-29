import UserActionTypes from "app/action-types/user-action-types";
import { createPromiseAction } from '@adobe/redux-saga-promise';

export const initAppAction = createPromiseAction(UserActionTypes.INIT_APP);
