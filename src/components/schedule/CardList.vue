<template>
  <a-row :gutter="[30, 80]">
    <Card v-for="(item, index) in items" :key="index" :item="item" />
  </a-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Card from "@/components/schedule/Card.vue";

// components 정의
const components = {
  Card,
};

// data 정의
let items = ref([]); // 서버로부터 받아온 데이터를 저장할 배열

// keyword, page, size는 필요에 따라 값을 설정하거나 props로 받아옵니다.
let keyword = ref("");
let page = ref(0);
let size = ref(10);

onMounted(async () => {
  // 컴포넌트가 마운트될 때 서버로부터 데이터를 가져옴
  console.log(
    `${import.meta.env.VITE_SERVER}/api/schedule?keyword=${keyword.value}&page=${page.value}&size=${
      size.value
    }`
  );
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER}/api/schedule?keyword=${keyword.value}&page=${page.value}&size=${
      size.value
    }`
  );
  items.value = response.data; // API로부터 받아온 데이터를 items 배열에 저장
});
</script>

<style></style>
