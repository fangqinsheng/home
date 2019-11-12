<template>
  <div class="navbar" id="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <BreadCrumb :breadcrumb="breadcrumb"></BreadCrumb>
    <avatar :avatar="avatar"></avatar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger/index";
import BreadCrumb from "@/components/BreadCrumb/index";
import avatar from "@/components/Avatar/index";
export default {
  name: "navBar",
  data() {
    return {
      avatar:
        "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
      breadcrumb: [
        { path: "/", name: "首页" },
        { path: "/", name: "首页" },
        { path: "/", name: "首页" }
      ]
    };
  },
  components: {
    Hamburger,
    BreadCrumb,
    avatar
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {},
  created() {
    console.log(1);
  }
};
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  background: #fff;
  position: relative;
  overflow: hidden;
}
.navbar .hamburger-container {
  float: left;
  padding: 0 15px;
  cursor: pointer;
  line-height: 46px;
  height: 100%;
}
</style>
