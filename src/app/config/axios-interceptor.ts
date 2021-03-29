import { addPending, removePending } from 'src/app/config/axios-utils';
import { CacheHandler } from 'src/app/config/cache-handler';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import _ from 'lodash';
import qs from 'query-string';

const TIMEOUT = 10 * 60 * 1000;
export const updateAxiosHeaderConfig = () => (axios.defaults.headers.common['Q-CONTEXT-PATH'] = window.location.pathname);

axios.defaults.timeout = TIMEOUT;
updateAxiosHeaderConfig();

const onRequestSuccess = config => {
  if (config.method === 'get' && config.cache) {
    const validResponse = CacheHandler.isValid(config.url);
    if (validResponse.isValid) {
      config.headers.cached = validResponse.isValid;
      config.data = validResponse.value;
      return Promise.reject(config);
    }
  }

  removePending(config);
  addPending(config);
  return config;
};

const onRequestError = error => Promise.reject(error);

const onResponseSuccess = response => {
  removePending(response.config);

  if (response.config.method === 'get' && response.config.cache) {
    CacheHandler.storeApiCache(response.config.url, JSON.stringify(response.data));
  }
  return response;
};

const unauthenticatedUrl = () => '/login';

function logStacktrace(config: AxiosRequestConfig, stacktrace: string) {
  console.error('url', `${config.method}:${config.url}`);
  console.error('stacktrace', stacktrace);
}

const setupAxiosInterceptors = () => {
  const onResponseError = (err: AxiosError) => {
    err.response && removePending(err.response.config);
    const config = err.config || err as AxiosRequestConfig;
    const headers = config.headers;
    if (headers.cached) {
      return Promise.resolve(err);
    }

    if (axios.isCancel(err)) {
      return Promise.reject(err);
    }

    const {stacktrace} = err.response.data;
    const status = err.response.status;
    if (status === 401) {
      window.location.href = unauthenticatedUrl();
    }

    if (status >= 500 || status === 404 || (status === 400 && (config.errorHandle === undefined || config.errorHandle === false))) {
      stacktrace && logStacktrace(config, stacktrace);
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess, onRequestError);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

axios.defaults.paramsSerializer = params => {
  const finalParams = {};
  for (const p in params) {
    if (params.hasOwnProperty(p)) {
      if (_.isNil(params[p]) || params[p] === '') {
        delete params[p];
      } else {
        finalParams[p] = params[p];
      }
    }
  }
  return qs.stringify(finalParams, {arrayFormat: 'none'});
};

export default setupAxiosInterceptors;
