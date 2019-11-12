import Layout from "@/components/Layout/index";

const essayRoutes = {
  path: "/essay",
  name: "essay",
  component: Layout,
  redirect: "/essay/list",
  meta: {
    title: "内容管理",
    icon: "article",
    roles: ["superAdmin", "admin"]
  },
  children: [
    {
      path: "carousel",
      name: "carousel",
      meta: {
        title: "轮播图",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/carousel/new")
    },
    {
      path: "brand",
      name: "brand",
      meta: {
        title: "公司介绍",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/essay/brand")
    },
    {
      path: "operate",
      name: "operate",
      meta: {
        title: "操作指南",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/essay/operate")
    },
    {
      path: "essay",
      name: "essay",
      meta: {
        title: "文案推文",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/essay/essay")
    },
    {
      path: "add",
      name: "add",
      hidden: true,
      meta: {
        title: "新建文章",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/essay/publish")
    },
    {
      path: "update",
      name: "update",
      hidden: true,
      meta: {
        title: "编辑文章",
        roles: ["superAdmin", "admin"]
      },
      component: () => import("@/views/essay/update")
    }
  ]
};

export default essayRoutes;
