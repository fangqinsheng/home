import Layout from "@/components/Layout/index";

const iconRoutes = {
  path: "/icon",
  component: Layout,
  redirect: "all",
  meta: { roles: ["superAdmin"] },
  children: [
    {
      path: "all",
      name: "icon",
      component: () => import("@/views/icon/index"),
      meta: { title: "图标", icon: "icon", roles: ["superAdmin"] }
    }
  ]
};

export default iconRoutes;
