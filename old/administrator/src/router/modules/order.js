import Layout from "@/components/Layout/index";

const orderRoute = {
  path: "/order",
  component: Layout,
  redirect: "/member/list",
  meta: {
    title: "订单管理",
    icon: "order",
    roles: ["superAdmin", "admin", "editor"]
  },
  children: [
    {
      path: "list",
      name: "OrderList",
      component: () => import("@/views/order/list"),
      meta: {
        title: "订单列表",
        roles: ["superAdmin", "admin", "editor"]
      }
    },
    {
      path: "details",
      name: "OrderDetails",
      component: () => import("@/views/order/details"),
      meta: {
        title: "订单详情",
        roles: ["superAdmin", "admin", "editor"]
      }
    },
    {
      path: "refund",
      name: "MemberRefund",
      component: () => import("@/views/order/refund"),
      meta: {
        title: "维权订单",
        roles: ["superAdmin", "admin"]
      }
    },
    {
      path: "invoice",
      name: "invoiceManage",
      component: () => import("@/views/order/invoice"),
      meta: {
        title: "发票管理",
        roles: ["superAdmin", "admin"]
      }
    }
  ]
};

export default orderRoute;
