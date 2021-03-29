import {createActionPrefix} from "redux-actions-helper";

export function actionTypes(prefix: string) {
  return (constructor: any) => {
    Object.keys(constructor).forEach(item => (constructor[item] = createActionPrefix(prefix)(item)));
    return constructor;
  };
}



