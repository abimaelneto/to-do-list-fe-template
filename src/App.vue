<template>
  <router-view />
</template>

<script>
import { setupPrivateApi } from "./api";
export default {
  mounted() {
    console.log("test");
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.$router.push("/login");
      return;
    }
    setupPrivateApi(token);
  },
};
</script>
<style>
a {
  text-decoration: none;
  color: unset;
}
</style>
