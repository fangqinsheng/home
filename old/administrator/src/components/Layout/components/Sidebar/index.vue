<template>
  <div class="aside">
    <logo :collapse="isCollapse"></logo>
    <el-scrollbar class="sidebar-bg">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./components/Logo";
import SidebarItem from "./components/SidebarItem";
export default {
  name: "index",
  data() {
    return {
      routes: this.$router.options.routes
    };
  },
  components: {
    Logo,
    SidebarItem
  },
  created() {},
  computed: {
    ...mapGetters(["sidebar"]),
    permission_routers() {
      return this.$store.getters.permission_routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

<style scoped lang="scss">
.aside {
}
.aside .sidebar-bg {
  background: #545c64;
  height: 100%;
}
.aside .el-scrollbar {
  height: calc(100% - 50px);
}
</style>
