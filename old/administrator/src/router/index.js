import Vue from "vue";
import Router from "vue-router";
// import

Vue.use(Router);

// 组件
import Layout from "@/components/Layout/index";

// 模块
import goodsRoutes from "./modules/goods";
// import memberRoutes from "./modules/member";
// import orderRoutes from "./modules/order";
// import iconRoutes from "./modules/icon";
// import essayRoutes from "./modules/essay";
// import errorRoutes from "./modules/error";
// import categoryRoutes from "./modules/category";
// import componentsRoutes from "./modules/components";

/**
 * defultRoutes
 * 默认的路由，所有的角色都可以访问
 */
export const defaultRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard", noCache: true, affix: true }
      }
    ]
  },
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/list",
    children: [
      {
        path: "list",
        name: "GoodsList",
        component: () => import("@/views/goods/list"),
        meta: {
          title: "商品管理",
          icon: "goods",
          roles: ["superAdmin", "admin", "editor"]
        }
      },
      {
        path: "list",
        name: "GoodsList",
        component: () => import("@/views/goods/list"),
        meta: {
          title: "商品管理",
          icon: "goods",
          roles: ["superAdmin", "admin", "editor"]
        }
      }
    ]
  },
  {
    path: "/seri",
    component: Layout,
    redirect: "/seri/list",
    children: [
      {
        path: "list",
        name: "GoodsList",
        component: () => import("@/views/seri/list"),
        meta: {
          title: "系列管理",
          icon: "goods",
          roles: ["superAdmin", "admin", "editor"]
        }
      }
    ]
  }
];

/**
 * permissionRoutes
 * 绑定权限了的路由，拥有对应的权限才可进入
 */
export const permissionRoutes = [
  goodsRoutes,
  // categoryRoutes,
  // memberRoutes,
  // orderRoutes,
  // iconRoutes,
  // componentsRoutes,
  // essayRoutes,
  // errorRoutes,
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: defaultRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
