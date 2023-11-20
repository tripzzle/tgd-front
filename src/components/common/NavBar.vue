<script setup>
import { store } from "@/stores/store.js";
import DatePicker from "@/components/common/DatePicker.vue";
import moment from "moment";
import "moment/locale/ko";
import locale from "ant-design-vue/es/locale/ko_KR";
import { ConfigProvider } from "ant-design-vue";
import { RouterLink } from "vue-router";
import {onMounted, ref} from "vue";
moment.locale('ko');  // Change this line
const openModal = () => {
  console.log(store);
  store.open = true;
  console.log("openModal");
};



const isLoggedIn = ref(false); // 로그인 여부를 저장하는 변수
const logout = () => {
  document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  isLoggedIn.value = false
};

onMounted(() => {
  // Authorization 쿠키 유무에 따라 로그인 여부 설정
  isLoggedIn.value = document.cookie.includes("Authorization");
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
          <router-link :to="{ name: 'mypage' }">
            <a-button class="custom-button">마이페이지</a-button>
          </router-link>
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
