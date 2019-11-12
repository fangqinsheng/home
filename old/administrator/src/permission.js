// import router from "./router/index";
// import store from "./store/index";
// import axios from "axios";
//
// import { Message } from "element-ui";
// // 需要一个token
// import { getToken, getRoles } from "@/utils/auth";
//
// const whiteList = ["/login"];
//
// // 用来获取后台传过来的路由
// let getRouter;
//
// router.beforeEach(async (to, from, next) => {
//   const token = getToken();
//   // debugger;
//   // 判断是否有token
//   if (token) {
//     if (to.path === "/login") {
//       next("/");
//     } else {
//       const hasRoles = store.getters.roles && store.getters.roles.length > 0;
//       if (hasRoles) {
//         next();
//       } else {
//         // if(!getRouter) {
//         //   if(!getObjArr('router')) {
//         //     axios.get("http://127.0.0.1:8889/admin/menu/list").then(res => {
//         //       getRouter = res.data.list;
//         //       saveObjArr("router", getRouter)
//         //       routerGo(to, next)//执行路由跳转方法
//         //     })
//         //   }else {
//         //     getRouter = getObjArr('router');//拿到路由
//         //     routerGo(to, next)
//         //   }
//         // } else {
//         //   next()
//         // }
//         try {
//           const roles = await store.dispatch("getInfo");
//           const accessRoutes = await store.dispatch("generateRoutes", roles);
//           router.addRoutes(accessRoutes);
//           next({ ...to, replace: true });
//         } catch (error) {
//           await store.dispatch("resetToken");
//           Message.error(error || "Has Error");
//           next(`/login?redirect=${to.path}`);
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       next(`/login?redirect=${to.path}`);
//     }
//   }
// });
//
// function routerGo(to, next) {
//   getRouter = filterAsyncRouter(getRouter) //过滤路由
//   router.addRoutes(getRouter) //动态添加路由
//   global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
//   next({ ...to, replace: true })
// }
//
// function saveObjArr(name, data) { //localStorage 存储数组对象的方法
//   localStorage.setItem(name, JSON.stringify(data))
// }
//
// function getObjArr(name) { //localStorage 获取数组对象的方法
//   return JSON.parse(window.localStorage.getItem(name));
//
// }
