<template>
  <div class="avatar-wrapper">
    <el-dropdown>
      <div class="site-avatar">
        <img :src="avatar" alt="" width="32" height="32" /><i
          class="el-icon-arrow-down el-icon--right"
        ></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "index",
  props: ["avatar"],
  created() {
    console.log(this.avatar);
  }
};
</script>

<style scoped>
.avatar-wrapper {
  float: right;
  margin-right: 15px;
}
.avatar-wrapper .site-avatar {
  margin-top: 5px;
}
</style>
