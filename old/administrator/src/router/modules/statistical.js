import Layout from "@/views/layout/index";

const StatisticalRoute = {
  name: "statistical",
  path: "/statistical",
  component: Layout,
  redirect: "/statistical/member-analysis",
  meta: {
    title: "统计分析",
    icon: "memberStatistics",
    roles: ["superAdmin", "admin"]
  },
  children: [
    {
      path: "member-analysis",
      redirect: "/statistical/member-analysis/memberStatistics",
      component: () => import("@/views/statistical/Blank"),
      meta: {
        title: "会员分析",
        icon: "memberStatistics",
        roles: ["superAdmin", "admin", "analysis" ]
      },
      children: [
        {
          path: "member-amount",
          name: "member-amount",
          component: () => import("statistical/member/MemberAmount"),
          meta: {
            title: "会员下单量",
            icon: "sales",
            roles: ["superAdmin", "admin", "analysis"]
          },
        },
        {
          path: "new-member",
          name: "new-member",
          component: () => import("statistical/member/NewMember"),
          meta: {
            title: "新增会员统计",
            icon: "sales",
            roles: ["superAdmin", "admin", "analysis" ]
          }
        }
      ]
    },
    {
      path: "sales-analysis",
      component: () => import("Blank"),
      redirect: "noredirect",
      meta: {
        title: "销售分析",
        icon: "memberStatistics",
        roles: ["superAdmin", "admin", "analysis" ]
      },
      children: [
        {
          path: "district-analysis",
          name: "district",
          component: () => import("statistical/sales/District"),
          meta: {
            title: "区域分析",
            icon: "sales",
            roles: ["superAdmin", "admin", "analysis" ]
          },
        },
        {
          path: "sales-details",
          name: "sales",
          component: () => import("statistical/sales/Sales"),
          meta: {
            title: "商品销售明细",
            icon: "memberAdd",
            roles: ["superAdmin", "admin", "analysis" ]
          },
        },
        {
          path: "sales-income",
          name: "income",
          component: () => import("statistical/sales/Income"),
          meta: {
            title: "销售收入统计",
            icon: "sellers",
            roles: ["superAdmin", "admin", "analysis" ]
          }
        }
      ]
    }
  ]
};

export default StatisticalRoute;
