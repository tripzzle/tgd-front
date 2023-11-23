<script setup>
import ScheduleDetail from "@/components/Mypage/components/MySchedule/ScheduleDetail.vue";

import {onMounted, ref} from "vue";
import axios from "axios";
import {user} from "@/stores/store";
import InfiniteLoading from "v3-infinite-loading";
const server = import.meta.env.VITE_SERVER;

const userSchedules = ref({});

onMounted(async () => {

  await axios.get(`${server}/api/user/userSchedule`,{
    headers: {
      'X-AUTH-TOKEN': user.token
    }
  })
      .then(function (response){
        userSchedules.value = response.data;
      })
      .catch(function (error){
        console.log(error)
      })
})
</script>

<template>
  <a-col  class="result" :gutter="[30, 80]">
    <ScheduleDetail v-for="schedule in userSchedules" :key="schedule.scheduleId" :schedule="schedule"/>
  </a-col>
</template>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
  width: 400px;
  padding: 10px;
  text-align: center;
  justify-items: center;
  margin: 0 auto 10px auto;
  border-radius: 10px;
  overflow-y: scroll;
  max-height: 550px;
}

.result::-webkit-scrollbar {
  width: 0.8em; /* 스크롤바 너비 */
  background-color: #a385cf; /* 스크롤바 배경색 */
}

.result::-webkit-scrollbar-thumb {
  background-color: white; /* 스크롤바 색상 */
}

.result::-webkit-scrollbar-track {
  background-color: white; /* 스크롤바 트랙 배경색 */
}
</style>
