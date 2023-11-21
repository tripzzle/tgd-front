<template>
  <div>
    <h1>일정 상세 페이지</h1>
    <p>일정 ID: {{ id }}</p>
    <p>제목 : {{ schedule?.title }}</p>
    <p>내용 : {{ schedule?.content }}</p>
    <p>이미지 : <img :src="schedule?.imgUrl" alt="이미지 없음"></p>
    <p> 여행 일자 : {{ startDate }} ~ {{ endDate }}</p>
    <p> 성별 : {{ schedule?.user?.sex ? "여성" : "남성" }}</p>
    <p> 생일 : {{ schedule?.user?.birth}}</p>
    <p> 닉넴 : {{ schedule?.user?.nickname}}</p>
    <a-avatar :src="schedule?.user?.imgUrl"></a-avatar>
    <div v-for="item in dayResponse" :key="item.date">
      날짜 ID : {{ item.dayId }}
      날짜 : {{ item.date }}
    </div>
    <a-button @click="handleButtonClick">상세 일정 보기</a-button>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import API from '@/components/schedule/detail/api/api'
import axios from "axios";
import ScheduleDayDetailView from "@/components/schedule/detail/ScheduleDayDetailView.vue";
import { useRouter, useRoute } from 'vue-router';

const id = ref(null);
const schedule = ref();
const dayResponse = ref([]);
const startDate = ref();
const endDate = ref();
const router = useRouter();
const route = useRoute();

const handleButtonClick = () => {
  console.log("버튼 누름",dayResponse.value)
  router.push({ name: 'ScheduleDayDetailView', params: { dayResponse : dayResponse.value } });
};

onMounted(
    async () => {
      id.value = route.params.id;
      // 컴포넌트가 마운트될 때 서버로부터 데이터를 가져옴
      const response = await axios.get(
          API.getScheduleDetailById(id.value)
      );
      console.log(response.data)
      schedule.value = response.data;
      dayResponse.value = response.data.dayResponses;
      console.log(dayResponse.value[0]);
      startDate.value = dayResponse.value[0]?.date;
      endDate.value = dayResponse.value[dayResponse.value.length - 1]?.date;
      console.log("dayResponse in ScheduleDetailView",dayResponse.value)
    }
);
</script>
