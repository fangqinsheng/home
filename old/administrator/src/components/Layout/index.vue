<template>
  <div class="app-wrapper" :class="classObj">
    <div
      v-if="device == 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <sidebar></sidebar>
    <div class="main">
      <header class="app-header">
        <nav-bar></nav-bar>
        <tags-view></tags-view>
      </header>
      <app-main class="app-main"> </app-main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ResizeMixin from "./mixin/ResizeHandle";
import NavBar from "./components/Navbar";
import AppMain from "./components/AppMain";
import Sidebar from "./components/Sidebar/index";
import TagsView from "./components/TagsView/index";

export default {
  name: "index",
  mixins: [ResizeMixin],
  components: {
    NavBar,
    AppMain,
    Sidebar,
    TagsView
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style scoped>
.drawer-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.app-header {
}
.app-main {
  padding-top: 84px;
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
