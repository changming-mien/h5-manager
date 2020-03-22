
import axios from 'axios';
import { stringify } from 'qs';
//import { getToken } from './auth';
//import { message } from 'ant-design-vue';
//import { Toast } from 'mint-ui';

// axios 配置
axios.defaults.timeout = 35000;
// 添加请求头信息
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
// Axios实现请求重试
// axios.defaults.retry = 1; //重试次数
// axios.defaults.retryDelay = 10000; //重试延时
// axios.defaults.shouldRetry = (error) => true; //重试条件，默认只要是错误都需要重试

function errorMessage(msg) {
//	console.log(11111,msg)
//Toast("请求错误！",msg)
}

/* 登陆的接口方法 */
/* eslint-disable */
//export function login(url, data) {
//return new Promise((resolve, reject) => {
//  axios.post(url, stringify(data)).then((response) => {
//    if (response.status == '200') {
//      resolve(response.data);
//    } else {
//    	resolve("error")
//      errorMessage(response.data.desc, this);
//    }
//  }).catch((err) => {
//    	resolve("error")
//    reject(err);
//  });
//});
//}

/* 封装get方法 */
export function get(url, params) {
//axios.defaults.headers.TOUKEN = getToken() || '';
  const routerData = params === undefined ? '' : `?${stringify(params)}`;
  return new Promise((resolve) => {
    axios.get(`${url}${routerData}`).then((response) => {
    	console.log(9999,response)
      if (Number(response.status) == 200) {
        if (response.data.code.trim() == '0000') {
          resolve(response.data.data);
        } else {
      		resolve("error")
          errorMessage(response.data.desc);
        }
      } else {
      	resolve("error")
        errorMessage(response.data.desc);
      }
    }).catch((err) => {
      	resolve("error")
//    errorFun(err);
    });
  });
}

/* 封装post方法 */
export function post(url, data) {
//axios.defaults.headers.TOUKEN = getToken() || '';
  const newOptions = {
    ...data
  };
  const newOptions1 = JSON.parse(JSON.stringify(newOptions));
  return new Promise((resolve, reject) => {
    axios.post(url, newOptions1).then((response) => {
      if (response.status == 200) {
        if (response.data.code.trim() == '0000') {
          resolve(response.data.data);
        } else {
      	resolve("error")
          errorMessage(response.data.desc);
        }
      } else {
      	resolve("error")
        errorMessage(response.data.desc);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}
/* 封装post方法  from提交 */
export function post2(url, data) {
//axios.defaults.headers.TOUKEN = getToken() || '';
//const newOptions = {
//  ...data
//};
  
      let formData = new FormData();
      for(let k in data){
      	formData.append(k,data[k]);
      }
//const newOptions1 = JSON.parse(JSON.stringify(newOptions));
  return new Promise((resolve, reject) => {
    axios.post(url, formData).then((response) => {
      if (response.status == 200) {
        if (response.data.code.trim() == '0000') {
          resolve(response.data.data);
        } else {
      	resolve("error")
          errorMessage(response.data.desc);
        }
      } else {
      	resolve("error")
        errorMessage(response.data.desc);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}