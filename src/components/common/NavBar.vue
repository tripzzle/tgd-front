<script setup>
import {store} from "@/stores/store.js";
import DatePicker from "@/components/common/DatePicker.vue";
import moment from "moment";
import "moment/locale/ko";
import locale from "ant-design-vue/es/locale/ko_KR";
import {ConfigProvider} from "ant-design-vue";
import {RouterLink} from "vue-router";

moment.locale = "ko";

const openModal = () => {
  console.log(store);
  store.open = true;
  console.log("openModal");
};
</script>

<template>
  <a-layout id="components-layout">
    <a-layout-header class="default-header">
      <div>
        <router-link to="/" class="app-logo">Home</router-link>
      </div>
      <div class="nav-right">
        <a-menu v-model:selectedKeys="menuKey" class="menu" mode="horizontal">
          <a-menu-item key="/#">
            <router-link :to="{ name: 'login' }">
              로그인
            </router-link>
          </a-menu-item>
          <a-menu-item key="/#">
            <router-link to="/#"> 로그아웃</router-link>
          </a-menu-item>
          <a-menu-item key="/#">
            <router-link :to="{ name: 'mypage' }">
              마이페이지
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <a-button @click="openModal" type="primary"> 글쓰기</a-button>
          </a-menu-item>
        </a-menu>
        <ConfigProvider :locale="locale">
          <DatePicker/>
        </ConfigProvider>
      </div>
    </a-layout-header>
  </a-layout>
</template>

<style lang="scss" scoped>
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

  .right-buttons-wrap {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
}
</style>
