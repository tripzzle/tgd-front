<template>
  <div>
    <h1>일자 상세 페이지</h1>
    <p> dayResponse : {{ dayResponse }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const dayResponse = ref([]);

onMounted(() => {
  dayResponse.value = route.params.dayResponse;
  console.log(dayResponse, "데이터 받음")
});
</script>