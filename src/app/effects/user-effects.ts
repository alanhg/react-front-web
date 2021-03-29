import UserActionTypes from "app/action-types/user-action-types";
import { takeLeading } from "redux-saga/effects";

function* initAppActionEffects() {

}


export default function* watch() {
  yield takeLeading(UserActionTypes.INIT_APP, initAppActionEffects);
}
