import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 权限设置
// import "./permission";

// 权限设置
import "./style/style.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
