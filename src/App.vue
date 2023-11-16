<script setup>
import NavBar from "@/components/common/NavBar.vue";
import CardList from "@/components/schedule/CardList.vue";
import { useRoute } from "vue-router";
import ScheduleDetail from "@/components/schedule/ScheduleDetail.vue";
import UserInfo from "./components/Mypage/UserInfo.vue";
import LoginView from "./views/LoginView.vue";
const route = useRoute();
</script>

<template>
  <div class="hi">
    <NavBar />
    <router-link :to="{ path: 'login' }">login</router-link>
    <CardList />
    <ScheduleDetail />
    <UserInfo />
  </div>
  <router-view />
</template>

<style scoped>
.hi {
  background-color: #fffdfd;
  margin-top: 70px;
  /* margin: 200px 140px; */
  /* padding: 40px 40px; */
}
</style>
