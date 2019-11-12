import Layout from "@/components/Layout/index";

const componentsRoutes = {
  path: "/components",
  component: Layout,
  meta: {
    title: "组件",
    icon: "components",
    roles: ["superAdmin"]
  },
  children: [
    {
      path: "editor",
      meta: {
        title: "富文本编辑器",
        roles: ["superAdmin"]
      },
      children: [
        {
          path: "tiny-mce",
          name: "tiny-mce",
          component: () => import("@/views/components/TinyMCE/index"),
          meta: {
            title: "tiny-mce",
            roles: ["superAdmin"]
          }
        },
        {
          path: "wangEditor",
          name: "WangEditor",
          component: () => import("@/views/components/WangEditor"),
          meta: {
            title: "wangEditor",
            roles: ["superAdmin"]
          }
        }
      ]
    },
    {
      path: "markdown",
      redirect: "markdown",
      component: () => import("@/views/components/Markdown/index"),
      children: [
        {
          path: "all",
          name: "icon",
          component: () => import("@/views/icon/index"),
          meta: {
            title: "markdown",
            roles: ["superAdmin"]
          }
        }
      ]
    }
  ]
};

export default componentsRoutes;
