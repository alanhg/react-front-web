import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';

/**
 * @description
 * 自定义钩子/副作用
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useForceUpdate(): () => void {
  return React.useReducer(() => ({}), {})[1] as () => void;
}

export function useFormatMessage() {
  const intl = useIntl();
  const formatMessage = (id: string, values?: any) =>
    values ? intl.formatMessage({id}, values) : intl.formatMessage({id});
  return formatMessage;
}
