<script setup>
import ScheduleList from "@/components/Mypage/components/MySchedule/ScheduleList.vue";
</script>

<template>
  <div class="schedule">
    <div class="title">
      <h2>
        관광지 목록
      </h2>
      <ScheduleList/>
    </div>
  </div>
</template>

<style scoped>
.schedule {
  border: 2px solid #a385cf;
  border-radius: 5px;
  width: 500px;
  height: 660px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.13);
  background-color: #fffdfd;
}

.title {
  padding: 20px;
  text-align: center;
  flex-grow: 1;
}
</style>