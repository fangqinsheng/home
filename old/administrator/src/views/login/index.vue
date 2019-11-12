<template>
  <div class="login">
    <div class="login-box">
      <div class="login-logo">
        <img
          src="https://dummyimage.com/90x65/005bbc/ffffff.jpg&text=logo"
          alt="惠而信"
        />
      </div>
      <h3 class="login-title">惠而信商城后台管理系统</h3>
      <el-form :model="login" class="login-form">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-search"
            type="password"
            v-model="login.username"
            placeholder="账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" @keydown.enter="submitForm">
          <el-input
            type="password"
            prefix-icon="el-icon-search"
            placeholder="密码"
            v-model="login.password"
            autocomplete="off"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.native.prevent="submitForm"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$store
        .dispatch("login", this.login)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          console.log("错误");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  min-height: 100%;
  background: #2d3a4b;
  overflow: hidden;
  &-box {
    position: relative;
    width: 280px;
    margin: 160px auto 0;
    background: #fff;
    padding: 50px 35px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.34);
  }
  &-title {
    font-size: 24px;
    color: #2d3a4b;
  }
  &-logo {
  }
  &-form {
  }
}
</style>
