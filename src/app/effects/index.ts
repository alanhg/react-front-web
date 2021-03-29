import {all} from 'redux-saga/effects';
import watchGlobalActions from './user-effects';

const effects = [
  watchGlobalActions
];

export default function* rootSaga() {
  yield all(effects.map(i => i()));
}
