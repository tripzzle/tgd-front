<script setup>
import {RouterLink, useRouter} from "vue-router";
import {onMounted, ref} from 'vue';
import axios from "axios";
const server = import.meta.env.VITE_SERVER;
const aouth = import.meta.env.VITE_AOUTH;
const router = useRouter();
import { user } from "@/stores/store.js";

const login = ref({
  naver: server+aouth+"naver",
  kakao: server+aouth+"kakao",
  google: server+aouth+"google",

})

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

onMounted(async() => {
  const param = new URLSearchParams(window.location.search);
  const token = param.get("Authorization");

  if (token) {
    user.isLogin = true;
    user.token = token;
    localStorage.setItem("token", token)
    // 토큰이 있으면 로그인 처리
    var decoded = parseJwt(token);

    if (decoded.roles && decoded.roles.length === 1) {
      await axios.get(`${server}/api/user/signup`, {
        headers: {
          'X-AUTH-TOKEN': token
        }
      })
          .then(function (response) {
            console.log(response.data)
            router.push({
              name: 'signup',
              query: {
                userInfo:  JSON.stringify(response.data)
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });

    } else if (decoded.roles && decoded.roles[1] === 'USER') {
      router.push({name: 'main'});
    }
  } else {
    // 토큰이 없으면 비로그인 처리
    console.log("Token not found");
  }
});
</script>

<template>
  <div class="center-container">
    <RouterLink :to="{ name: 'main' }">
      <img src="@/assets/img/TGD-Logo.png" style="width: 300px" alt=""/>
    </RouterLink>

    <a-row class="login-container" justify="center" align="middle">
      <a-col align="center" :span="24">
        <a :href="login.google">
          <img
              class="login-button-img"
              src="@/assets/img/login/kakao_login_medium_wide.png"
          />
        </a>
      </a-col>
      <a-col align="center" :span="24">
        <a :href="login.google">
          <img src="@/assets/img/login/btnG_완성형.png" style="width: 200px; height: 45px;" @click="NaverLogin">
        </a>
      </a-col>
      <a-col align="center" :span="24">
        <a :href="login.google">
          <img style="width: 190px; height: 40px" src="@/assets/img/login/web_light_sq_SU@3x.png"/>
        </a>
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
