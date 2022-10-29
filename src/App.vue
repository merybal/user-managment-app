<template>
  <div class="top-bar">
    <img :src="icons.Logo" alt="Logo purple" class="logo" />
  </div>
  <router-view class="container"></router-view>
</template>

<script>
import Logo from "./assets/icons/logo.png";

export default {
  name: "App",
  data() {
    return {
      icons: {
        Logo,
      },
    };
  },
};
</script>

<style lang="scss">
@import "./assets/style/main.scss";
</style>
