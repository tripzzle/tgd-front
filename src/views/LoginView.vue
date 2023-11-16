<script setup>
import { onMounted } from "vue";
import { naverService } from "@/assets/js/login.js";
import { kakoLogin } from "@/assets/js/login.js";
import { RouterLink, RouterView } from "vue-router";
onMounted(() => {
  naverService().setNaver();
});
</script>

<template>
  <div class="center-container">
    <RouterLink :to="{ name: '/' }">
      <img src="@/assets/img/Logo.png" style="width: 300px" alt="" />
    </RouterLink>

    <a-row class="login-container" justify="center" align="middle">
      <a-col align="center" :span="24">
        <img
          class="login-button-img"
          src="@/assets/img/login/kakao_login_medium_wide.png"
          @click="kakoLogin.kakoLogin"
        />
      </a-col>
      <a-col align="center" :span="24">
        <div id="naverIdLogin"></div>
      </a-col>
      <a-col align="center" :span="24">
        <img style="width: 190px; height: 40px" src="@/assets/img/login/web_light_sq_SU@3x.png" />
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fffdfd;
}

.login-container {
  height: 40vh;
  border: 2px solid #a385cf;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px gray;
}

.login-button-img {
  width: 250px;
  height: 40px;
}
</style>
