import { LocalSettingUtils } from 'src/app/shared/util/local-setting-utils';

export interface IsValidResponse {
  isValid: boolean;
  value?: string;
}

export class CacheHandler {
  static isValid(key: string): IsValidResponse {
    const apiCache = LocalSettingUtils.getApiCache(key);
    return {
      isValid: apiCache !== null,
      value: JSON.parse(apiCache)
    };
  }

  static storeApiCache(key: string, value: string) {
    LocalSettingUtils.setApiCache(key, value);
  }
}
