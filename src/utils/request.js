import axios from 'axios';
import { getToken, getUsername } from './cookie';
/**
初始化axios实例时，设置baseURL，是在访问的接口之前加了一个前缀，比如本来要访问/getSms,但是加了一个前缀就变成了访问/devapi/getSms，这时就需要在代理设置中将前缀给去掉
* 代理设置。当访问域名的时候，碰到/devapi时，将前面的域名转换成target的属性值
* 例如在访问http://192.168.1.114:8080/devapi/时
* 将http://192.168.1.114:8080域名转换成http://www.web-jshtml.cn/productapi
* 实际访问的URL是http://www.web-jshtml.cn/productapi/devapi
* 这时需要将/devapi转换为空字符串，因为我们实际访问URL的地址时不需要这个前缀
* 
* 当然，如果不想多次一举
* 进行字符串替换，可以在创建axios实例时不设置前缀，这样就可以不进行替换了
*/
const BASEURL = process.env.NODE_ENV === 'production' ? 'http://www.web-jshtml.cn/productapi' : '/api';
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});
// 请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在请求头添加参数 sui Tokey userId
    config.headers['Tokey'] = getToken();
    config.headers['UserName'] = getUsername();
    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let data = response.data;
    return response.status === 200 && !data.resCode ? Promise.resolve(data) : Promise.reject(data.message);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
