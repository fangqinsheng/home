import Layout from "@/components/Layout/index";

const memberRoute = {
  path: "/member",
  component: Layout,
  redirect: "/member/list",
  meta: {
    title: "会员管理",
    icon: "member",
    roles: ["superAdmin", "admin", "editor"]
  },
  children: [
    {
      path: "list",
      name: "MemberList",
      component: () => import("@/views/member/list"),
      meta: {
        title: "会员列表",
        roles: ["superAdmin", "admin", "editor"]
      }
    },
    {
      path: "update",
      name: "MemberUpdate",
      hidden: true,
      component: () => import("@/views/member/update"),
      meta: {
        title: "编辑会员",
        roles: ["superAdmin", "admin"]
      }
    },
    {
      path: "recycle",
      name: "MemberRecycle",
      component: () => import("@/views/member/recycle"),
      meta: {
        title: "会员回收站",
        roles: ["superAdmin", "admin"]
      }
    }
  ]
};

export default memberRoute;
