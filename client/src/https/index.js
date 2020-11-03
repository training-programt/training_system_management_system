import axios from 'axios';
import { message } from 'antd';
import { getSession } from "../utils";
import baseURL from './baseURL'

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

axios.defaults.baseURL = baseURL;
axios.defaults.timeOut = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

// 请求拦截
axios.interceptors.request.use(
  config => {
    let token = getSession(token);
    if (config.url.split("?")[0] == "/oauth/token") {
      config.headers['Authorization'] = 'Basic B37EEFC16520E2EB'
    } else {
      if (token) config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    message.error("请求失败，请重试");
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  response => {
    if (response && response.data.code !== 200 && response.data.code !== 1) {
      if (response.data.code === 401) {
        sessionStorage.clear();
      }
      if (response.data.message) {
        message.error(response.data.message);
      }
    } else if (!response) {
      message.error('连接错误');
    }
    return response.data;
  },
  error => {
    console.log(error)
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message.error('错误请求');
          break;
        case 401:
          sessionStorage.clear();
          message.error('未授权，请重新登录');
          routesConfig.replace({
            path: '/login'
          });
          break;
        case 403:
          message.error('拒绝访问');
          break;
        case 404:
          message.error('当前资源不存在');
          break;
        case 408:
          message.error('请求超时');
        case 500:
          message.error('服务器忙，请重试');
          break;
        case 502:
          message.error('网络错误');
          break;
        case 503:
          message.error('服务不可用');
          break;
        default:
          message.error('连接错误');
      }
    } else {
      message.error('当前网络不可用 请稍后重试');
    }
    return false;
  }
)

export default axios;