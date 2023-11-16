<script setup>
import NavBar from "@/components/common/NavBar.vue";
import CardList from "@/components/schedule/CardList.vue";
import { useRoute } from "vue-router";
import ScheduleDetail from "@/components/schedule/ScheduleDetail.vue";
const route = useRoute();
</script>

<template>
  <div class="hi">
    <NavBar />
    <RouterView />
    <CardList />
    <ScheduleDetail />
  </div>
</template>

<style scoped>
.hi {
  background-color: #fffdfd;
  margin-top: 70px;
  /* margin: 200px 140px; */
  /* padding: 40px 40px; */
}
</style>