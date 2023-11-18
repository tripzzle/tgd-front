<script setup>
import {kakoLogin} from "@/assets/js/login.js";
import {RouterLink} from "vue-router";
import axios from "axios";
// import { localAxios } from "@/util/http-commons";
import {ref} from "vue";
const {VITE_SERVER} = import.meta.env;

async function localAxios() {
  const instance = await axios.create({
    baseURL: 'http://localhost:8080',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  });
  // Request 발생 시 적용할 내용.
  instance.defaults.headers.common["Authorization"] = "";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";

  return instance;
}

const local = localAxios();

async function login(success, fail) {
   (await local).get(`oauth2/authorization/naver`).then(success).catch(fail);
}

const NaverLogin = async () => {
  await login(
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          let { data } = response;
          let accessToken = data["access-token"];
          let refreshToken = data["refresh-token"];
          isLogin.value = true;
          isLoginError.value = false;
          isValidToken.value = true;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
        } else {
          isLogin.value = false;
          isLoginError.value = true;
          isValidToken.value = false;
        }
      },
      (error) => {
        console.error(error);
      }
  );
};
async function KakaoLogin() {
  try {
    const response = await axios.get(
        `${VITE_SERVER}/oauth2/authorization/kakao`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="center-container">
    <RouterLink :to="{ name: 'main' }">
      <img src="@/assets/img/TGD-Logo.png" style="width: 300px" alt=""/>
    </RouterLink>

    <a-row class="login-container" justify="center" align="middle">
      <a-col align="center" :span="24">
        <a href="http://localhost:8080/oauth2/authorization/kakao">
          <img
              class="login-button-img"
              src="@/assets/img/login/kakao_login_medium_wide.png"
              @click="kakoLogin.kakoLogin"
          />
        </a>
      </a-col>
      <a-col align="center" :span="24">
<!--        <a href="http://localhost:8080/oauth2/authorization/naver">-->
<!--         -->
<!--        </a>-->
        <img src="@/assets/img/login/btnG_완성형.png" style="width: 200px; height: 45px;" @click="NaverLogin">
      </a-col>
      <a-col align="center" :span="24">
        <a href="http://localhost:8080/oauth2/authorization/google">
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
