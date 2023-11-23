<script setup>
import ScheduleCard from "@/components/schedule/main/ScheduleCard.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {user} from "@/stores/store";
const server = import.meta.env.VITE_SERVER;

const wishListS = ref({});

onMounted(async () => {
  await axios.get(`${server}/api/user/userWishSC`,{
    headers: {
      'X-AUTH-TOKEN': user.token
    },
  })
      .then(function (response) {
        console.log(response.data);
        wishListS.value = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
});
</script>

<template>
  <a-row class="result">
    <div class="schedule-card-container">
      <ScheduleCard v-for="(item, index) in wishListS" :key="index" :item="item" />
    </div>
  </a-row>
</template>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
  width: 500px;
  height: 360px;
  padding: 10px;
  margin-left: 80px;
  text-align: center;
  justify-items: center;
  border-radius: 10px;
  overflow-y: auto; /* 상하 스크롤 생성 */
  max-height: 550px;
}

.schedule-card-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  overflow-x: scroll; /* 좌우 스크롤 생성 */
  scroll-snap-type: x mandatory; /* 좌우 스크롤 스냅 설정 */
  scroll-padding: 0 10px; /* 좌우 스크롤 패딩 설정 */
}

.result::-webkit-scrollbar {
  width: 0.0em; /* 스크롤바 너비 */
  background-color: #a385cf; /* 스크롤바 배경색 */
}

.result::-webkit-scrollbar-thumb {
  background-color: white; /* 스크롤바 색상 */
}

.result::-webkit-scrollbar-track {
  background-color: white; /* 스크롤바 트랙 배경색 */
}
</style>
