import Layout from "@/components/Layout/index";

const essayRoutes = {
  path: "/error",
  name: "error",
  component: Layout,
  redirect: "error/404",
  meta: {
    title: "错误页面",
    icon: "article",
    roles: ["superAdmin"]
  },
  children: [
    {
      path: "404",
      name: "404",
      meta: {
        title: "404",
        roles: ["superAdmin"]
      },
      component: () => import("@/views/errorPage/404")
    },
    {
      path: "401",
      name: "401",
      meta: {
        title: "401",
        roles: ["superAdmin"]
      },
      component: () => import("@/views/errorPage/401")
    }
  ]
};

export default essayRoutes;
