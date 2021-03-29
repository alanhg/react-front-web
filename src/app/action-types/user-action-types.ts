import { actionTypes } from "app/shared/decorator/custom";

@actionTypes('USER')
export default class UserActionTypes {
  static INIT_USER = '';

  static INIT_APP = '';
}
