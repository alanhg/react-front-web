import { implementPromiseAction } from '@adobe/redux-saga-promise';
import * as is from '@redux-saga/is';
import createSagaMiddleware from 'redux-saga';
import { call, select } from 'redux-saga/effects';

function safe(sagaFn) {
  return function* (action) {
    try {
      return yield call(sagaFn, action);
    } catch (e) {
      console.error(`[Saga Effect Exception] : ${e}`);
    }
  };
}

export function autoPromise(sagaFn) {
  return function* (action) {
    yield call(implementPromiseAction, action, function* () {
      return yield call(sagaFn, action.payload);
    });
  };
}

function isForkEffect(eff) {
  return is.effect(eff) && eff.type === 'FORK';
}

const sagaEffectUnhandled = (e: Error, {sagaStack}) => {
  console.error(`[Saga Global Exception] : ${e}`);
  console.error(sagaStack);
};

const effectMiddleware = next => eff => {
  if (isForkEffect(eff)) {
    if (process.env.NODE_ENV === 'production') {
      eff.payload.args[1] = safe(eff.payload.args[1]);
    }
  }
  return next(eff);
};

export const sagaMiddleware = createSagaMiddleware({
  effectMiddlewares: [effectMiddleware],
  onError: sagaEffectUnhandled
});

export function* selectState<T>(fn: (state) => T) {
  const res: T = yield select(fn);
  return res;
}
