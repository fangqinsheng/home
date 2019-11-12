<template>
  <div class="logo-wrapper" :class="{ collapse: collapse }">
    <transition name="LogoFade">
      <router-link class="link" v-if="collapse" to="/" key="collapse">
        <img :src="logo" class="logo" alt="" />
        <h1 class="title">{{ title }}</h1>
      </router-link>
      <router-link class="link" v-else to="/" key="expand">
        <img :src="logo" class="logo" alt="" />
        <h1 class="title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: "惠而信商城管理平台",
      logo: "https://dummyimage.com/32x32/0011ff/ffffff&text=logo"
    };
  }
};
</script>

<style scoped lang="scss">
.logo-wrapper {
  position: relative;
  width: 100%;
  line-height: 50px;
  height: 50px;
  background: #005abc;
  overflow: hidden;
  text-align: center;
}
.logo-wrapper.collapse .logo {
  margin-right: 0;
}
.logo-wrapper .logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.logo-wrapper .title {
  display: inline-block;
  color: #fff;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 50px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
}

.logo-wrapper .link {
  width: 100%;
  height: 100%;
}

.LogoFade-enter-active {
  transition: opacity 1.5s;
}

.LogoFade-enter,
.LogoFade-leave-to {
  opacity: 0;
}
</style>
