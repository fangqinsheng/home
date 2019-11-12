<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style scoped>
.app-main {
  padding-top: 84px;
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
