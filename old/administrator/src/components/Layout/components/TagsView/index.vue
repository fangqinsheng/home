<template>
  <div class="tab-pane-container" id="tags-view">
    <scroll-pane class="tab-pane-wrapper" ref="scrollPane">
      <router-link
        ref="tab"
        class="tab-pane-item"
        :class="isActive(tab) ? 'active' : ''"
        v-for="tab in Array.from(openTab)"
        :to="tab"
        :key="tab.path"
        @contextmenu.prevent.native="openMenu(tab, $event)"
      >
        <!--<router-link ref="tab" to="list" v-for="tab in openTab">-->
        {{ tab.title }}
        <span
          class="el-icon-close"
          @click.prevent.stop="closeCurrentTab(tab)"
        ></span>
      </router-link>
    </scroll-pane>
    <ul
      class="contextmenu"
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="closeCurrentTab(currentTab)">关闭</li>
      <li @click="closeOthersTabs">关闭其他</li>
      <li @click="closeAllTabs">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./components/ScrollPane";
export default {
  name: "TabsPane",
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      currentTab: {}
    };
  },
  computed: {
    openTab() {
      return this.$store.state.tabPane.openTab;
    }
  },
  watch: {
    $route() {
      this.addTabs();
      this.moveToCurrentTab();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted() {
    this.addTabs();
    // console.log(this.currentTab);
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    addTabs() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addCurrentTab", route);
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    moveToCurrentTab() {
      const tabs = this.$refs.tab;
      this.$nextTick(() => {
        for (const tab of tabs) {
          if (tab.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tab.$el);
            break;
          }
        }
      });
    },
    closeCurrentTab(view) {
      this.$store.dispatch("delCurrentTab", view).then(view => {
        if (this.isActive(view)) {
          const latestTab = view.slice(-1)[0]; // ???
          if (latestTab) {
            this.$router.push(latestTab);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    closeOthersTabs() {
      this.$router.push(this.currentTab);
      this.$store.dispatch("delOthersTab", this.currentTab).then(() => {
        this.moveToCurrentTab();
      });
    },
    closeAllTabs() {
      this.$store.dispatch("delAllTab");
      this.router.push("/");
    },
    openMenu(tab, e) {
      this.visible = true;
      this.currentTab = tab;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      this.left = e.clientX - offsetLeft + 15; // 15: margin right
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tab-pane-container {
  .tab-pane-wrapper {
    width: 100%;
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tab-pane-item {
      display: inline-block;
      position: relative;
      height: 24px;
      line-height: 24px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #f19f4d;
        color: #fff;
        border-color: #f19f4d;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
