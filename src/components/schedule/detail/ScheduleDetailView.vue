<template>
  <div class="main">
    <h1>일정 상세 페이지</h1>
    <p>일정 ID: {{ id }}</p>
  </div>
  <a-button>일정 상세 보기</a-button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import API from "@/components/schedule/detail/api/api";

const route = useRoute();
const id = ref(null);

const getScheduleDetails = () => {
  axios.get(API.getScheduleDetails(id.value))
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
};

onMounted(() => {
  id.value = route.params.id;
  getScheduleDetails();
});
</script>


<style scoped>
.main{
  margin-top: 50px;
}
</style>