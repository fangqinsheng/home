import Layout from "@/components/Layout/index";

const goodsRoute = {
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
      path: "update",
      name: "GoodsUpdate",
      hidden: true,
      component: () => import("@/views/goods/update"),
      meta: {
        title: "编辑商品",
        roles: ["superAdmin", "admin"]
      }
    }
  ]
};

export default goodsRoute;
