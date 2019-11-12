<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb
      class="breadcrumb-container"
      separator-class="el-icon-arrow-right"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="item in breadcrumb"
          :key="item.path"
          :to="item.path"
          ><span>{{ item.meta.title }}</span></el-breadcrumb-item
        >
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      breadcrumb: null
    };
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !==
          "Dashboard".toLocaleLowerCase()
      ) {
        matched = [{ path: "/dashboard", meta: { title: "首页" } }].concat(
          matched
        );
      }
      this.breadcrumb = matched;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style scoped lang="scss">
.breadcrumb-wrapper {
  float: left;
}
.breadcrumb-wrapper .el-breadcrumb {
  line-height: 50px;
  height: 50px;
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
