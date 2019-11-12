import Layout from "@/components/Layout/index";

const categoryRoutes = {
  path: "/category",
  component: Layout,
  redirect: "/category/list",
  children: [
    {
      path: "list",
      name: "categoryList",
      meta: {
        title: "栏目布局",
        icon: "goods",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/category/index")
    },
    {
      path: "update",
      name: "categoryUpdate",
      hidden: true,
      component: () => import("@/views/category/update"),
      meta: {
        title: "编辑商品",
        roles: ["superAdmin", "admin"]
      }
    }
  ]
};

export default categoryRoutes;
