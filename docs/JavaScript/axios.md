# axios 请求封装

## 生成 axios 实例

```js
import axios from 'axios';
import Qs from 'qs';

/**
 * 请求失败处理
 * @param {number | null ?} status 错误状态码
 * @param {function} tip 错误提示方式
 */
export const errorHandle = (status, tip = alert) => {
  // 状态码判断
  switch (Number(status)) {
    // 401: 未登录状态，跳转登录页
    case 401:
      tip('您尚未登录，请先登录');
      break;
    // 403 token过期
    case 403:
      tip('登录过期，请重新登录');
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    case 405:
      tip('Method Not Allowed');
      break;
    case 500:
      tip('服务器错误！');
      break;
    default:
      tip('网络繁忙，请稍后再试！');
  }
};
const { CancelToken } = axios;

export default class AxiosInstance {
  /**
   * @param {Object} [options] 请求参数
   * @param {string}[options.baseURL] 请求URL
   * @param {number} [options.timeout] 超时时间
   * @param {function} [options.interceptorsRequest] 请求拦截器
   * @param {function} [options.interceptorsResponse] 响应拦截 返回Promise实例
   */
  constructor(options) {
    const defaultOption = {
      baseURL: '',
      timeout: 300000,
      headers: {},
      interceptorsRequest() {},
      interceptorsResponse(data) { return data; },
      tip(message){}
    };
    this.promiseList = {};
    this.cancel = null;
    this.options = Object.assign(defaultOption, options);
    this.instance = axios.create({
      ...this.options,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ...this.options.headers,
      },
    });

    this._interceptorsRequest();
    this._interceptorsResponse();
  }

  // 请求拦截器
  _interceptorsRequest() {
    this.instance.interceptors.request.use(async config => {
      await this.options.interceptorsRequest(config);
      if (config.url) {
        if (this.promiseList[config.url]) {
          this.promiseList[config.url](false); // 主动取消 axios 请求， 错误信息为 false
          this.promiseList[config.url] = this.cancel;
        } else {
          this.promiseList[config.url] = this.cancel;
        }
      }
      return config;
    }, error => Promise.reject(error));
  }

  // 响应拦截
  _interceptorsResponse() {
    this.instance.interceptors.response.use(response => {
      if (+response.status !== 200) {
        errorHandle(response.status, this.options.tip);
        return Promise.reject(response);
      } else {
        const { data } = response;
        return this.options.interceptorsResponse(data);
      }
    }, error => {
      if (error) {
        const { response, message } = error;
        if (response) {
          errorHandle(response.status, this.options.tip);
        } else {
          message && this.options.tip(message);
        }
      } else {
        errorHandle(null, this.options.tip);
      }
      return Promise.reject(error);
    });
  }

  /**
   * 封装 axios 请求
   * @param {object} obj 请求
   * @return {Promise<any>}
   * @constructor
   */
  request(obj) {
    const DEFAULT = {
      method: 'get',
      url: '',
      headers: {},
      type: 'x-www-form-urlencoded',
      cancelToken: new CancelToken(c => {
        this.cancel = c;
      }),
    };
    const req = Object.assign(DEFAULT, obj);
    if (req.type === 'json') {
      req.headers['Content-Type'] = 'application/json;charset=UTF-8';
    } else {
      obj.data && (req.data = Qs.stringify(obj.data));
    }
    Reflect.deleteProperty(req, 'type');
    return this.instance(req);
  }

  /**
   * get 请求
   * @param {string} url 请求路径
   * @param {object?} params 请求参数
   * @return {Promise<any>}
   */
  get(url, params) {
    return this.instance({
      method: 'get',
      url,
      params,
      cancelToken: new CancelToken(c => {
        this.cancel = c;
      }),
    });
  }

  /**
   * post 请求
   * @param {string} url
   * @param {Object?} data
   * @param type 数据类型
   * @return {Promise<any>}
   */
  post(url, data, type = 'form-urlencoded') {
    const reqObj = {
      method: 'post',
      url,
      headers: {},
      cancelToken: new CancelToken(c => {
        this.cancel = c;
      }),
    };
    if (type === 'json') {
      reqObj.headers['Content-Type'] = 'application/json;charset=UTF-8';
      reqObj.data = data;
    } else if (type === 'form-data') {
      reqObj.headers['Content-Type'] = 'multipart/form-data';
      reqObj.data = data;
    } else {
      reqObj.data = Qs.stringify(data);
    }
    return this.instance(reqObj);
  }
}


```

## 使用

```js
import CreateRequest from './generateAxiosInstance'



// 调 FDP 公共接口
export const FDP = new CreateRequest({
  baseURL: REQ.baseURL,
  headers: {
    // ...headers
  },
  tip(message) {
    alert(message)
  },
  interceptorsRequest(config) {
      // 请求拦截
  },
  interceptorsResponse(data){
   // 响应拦截
  },
})

```

## 请求图片

+ 方式一

```js
FDP.request({
    type: 'get',
    url: img,
    responseType: 'blob',
}).then(res => {
    const blob = res;
    // blob 转 base64方式 -- FileReader
    const fileReader = new FileReader()
    fileReader.readAsDataURL(blob)
    fileReader.onload = function () {
    const img = document.createElement("img");
    img.src = fileReader.result
    document.body.appendChild(img)
    }
}).catch(err => {

})

```

+ 方式二

```js
FDP.request({
    type: 'get',
    url: img,
    responseType: 'blob',
}).then(res => {
    const blob = res;
    const img = document.createElement("img");
    img.src = window.URL.createObjectURL(blob);
    img.onload = function(e) {
        window.URL.revokeObjectURL(img.src);
    };
    document.body.appendChild(img)
}).catch(err => {
})

```
