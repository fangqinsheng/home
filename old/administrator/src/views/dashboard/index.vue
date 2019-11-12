<template>
  <div>
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import admin from "./admin/index";
import others from "./others/index";
export default {
  name: "index",
  components: {
    admin,
    others
  },
  data() {
    return {
      currentRole: "admin"
    };
  },
  created() {
    // if (!this.)
  }
};
</script>

<style scoped></style>
