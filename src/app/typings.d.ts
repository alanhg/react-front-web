// Extend typings
import { IntlShape } from 'react-intl';

declare global {
  interface Window {
    intl: IntlShape;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {

    /**
     * @description 设置为true，则400错误全局拦截器不处理，由业务具体逻辑自行处理
     */
    errorHandle?: boolean;

    /**
     * @description
     * 对于配置类型数据的GET请求采用前端缓存化，在前端有缓存时，不会发起真正的请求
     */
    cache?: boolean;

    /**
     * @description 设置为true，则会在请求过程中显示loading动画，直到请求结束才消失
     */
    loading?: boolean;
  }
}

