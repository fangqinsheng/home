import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store/index";
import { getToken } from "@/utils/auth";

// 定义请求的服务
const service = axios.create({
  // // api的默认url, 存在问题
  baseURL: "http://127.0.0.1:8889/admin",
  // // 端口
  // port: 8989,
  // 是否发送Token
  widthCredentials: true,
  // 请求超时时间
  timeout: 20000
});

// 设置请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 设置请求响应器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200) {
      Message({
        type: "error",
        message: res.message || "error",
        duration: 5 * 1000
      });
    }
    // 600 token出问题
    if (res.code === 600) {
      MessageBox.confirm(
        "你已被登出，可以取消继续留在该页面，或者重新登录",
        "确定登出",
        {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        store.dispatch("resetToken").then(() => {
          location.reload();
        });
      });
      return Promise.reject(res.message || "error");
    } else {
      return res;
    }
  },
  error => {
    console.log("err:" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
