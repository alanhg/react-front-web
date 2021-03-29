import axios from 'axios';

/**
 * Cancel previous pending request
 */
const pending = new Map();

function getUrl(config) {
  return [config.method, config.url, JSON.stringify(config.params)].join('&');
}

export const addPending = config => {
  const url = getUrl(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        pending.set(url, cancel);
      }
    });
};

export const removePending = (config) => {
  const url = getUrl(config);
  if (pending.has(url)) {
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};
