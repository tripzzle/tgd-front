<script setup>
import { store } from "@/stores/store.js";
import DatePicker from "@/components/common/DatePicker.vue";
import moment from "moment";
import "moment/locale/ko";
import locale from "ant-design-vue/es/locale/ko_KR";
import { ConfigProvider } from "ant-design-vue";
import { RouterLink } from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";
const server = import.meta.env.VITE_SERVER;

moment.locale('ko');  // Change this line

const openModal = () => {
  console.log(store);
  store.open = true;
  console.log("openModal");
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

async function  getUserInfo() {
  const token = localStorage.getItem("token");
  if (token) {

    var decoded = parseJwt(token);

    await axios.get(`http://localhost:8080/api/user/mypage?userId=${decoded.sub}`, {
      headers: {
        'X-AUTH-TOKEN': token
      }
    })
        .then(function (response) {
          console.log(JSON.stringify("유저정보 서버에서 가죠옴 " +  JSON.stringify(response.data)))
          router.push({
            name: 'mypage',
            query: {
              userInfo: JSON.stringify(response.data)
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }
}

const isLoggedIn = ref(false); // 로그인 여부를 저장하는 변수
const logout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false
  router.push({
    name:"main"
  })
};

onMounted(() => {
  // Authorization 쿠키 유무에 따라 로그인 여부 설정
  isLoggedIn.value = localStorage.getItem("token");
});
</script>
<template>
  <a-layout id="components-layout">
    <a-layout-header class="default-header">
      <div class="nav-right">
        <router-link :to="{ name: 'main' }" class="app-logo">
          <img src="@/assets/img/TGD-Logo.png" style="width: 90px" alt=""/>
        </router-link>
      </div>
      <div class="nav-right">
        <div v-if="isLoggedIn">
          <a-button class="custom-button" @click="logout">로그아웃</a-button>
          |
          <a-button class="custom-button" @click="getUserInfo">마이페이지</a-button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'login' }">
            <a-button class="custom-button">로그인</a-button>
          </router-link>
        </div>
        <a-button class="custom-button write-button" @click="openModal" type="primary"> 글쓰기</a-button>
        <ConfigProvider :locale="locale">
          <DatePicker/>
        </ConfigProvider>
      </div>
    </a-layout-header>
  </a-layout>
</template>
<style lang="scss" scoped>
.custom-menu-item {
  width: auto !important;
}

.custom-button {
  border: none !important;
  box-shadow: none !important;
  color: #a385cf;
}

.write-button {
  background-color: white !important;
  border: 1px solid #a385cf !important;
}

#components-layout {
  width: 100%;
  margin-bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
  background-color: white;
  box-shadow: 1px solid black;
}

.default-header {
  position: fixed;
  width: 100%;
  overflow: hidden;
  background-color: white;
  top: 0;
  display: flex;
  justify-content: space-between;
  border: 0 0 0 1px solid black;
  box-shadow: 0 4px 4px -4px black;
  height: 10%;

  .ant-menu {
    height: 98%;
  }
}

.login-button {
  font-weight: 900;
}

.nav-right {
  display: flex;
  gap: 2rem;
  align-items: center;
}
</style>
