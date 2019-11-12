<template>
  <div @click="toggleClick">
    <svg
      x="1543633594744"
      :class="{ 'is-active': isActive }"
      class="hamburger"
      viewBox="0 0 1024 1024"
      width="60"
      height="60"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2634"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>hamburger</title>
      <desc>点击切换菜单的缩放</desc>
      <path
        d="M970 697.4H378.4c-28.8 0-52-25-52-55.6s23.2-55.6 52-55.6H970c28.8 0 52 25 52 55.6s-23.2 55.6-52 55.6z m0-259.6H378.4c-28.8 0-52-25-52-55.6s23.2-55.6 52-55.6H970c28.8 0 52 25 52 55.6s-23.2 55.6-52 55.6z m-3.6-250.4H57.6C27 187.4 2 162.4 2 131.8s25-55.6 55.6-55.6h908.8c30.6 0 55.6 25 55.6 55.6s-25 55.6-55.6 55.6z m-704.8 510L2 512l259.6-185.4v370.8z m-204 139.2h908.8c30.6 0 55.6 25 55.6 55.6s-25 55.6-55.6 55.6H57.6C27 947.8 2 922.8 2 892.2s25-55.6 55.6-55.6z m0 0"
        p-id="2635"
        fill="#333"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 18px;
  height: 18px;
  transform: rotate(90deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}
.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
