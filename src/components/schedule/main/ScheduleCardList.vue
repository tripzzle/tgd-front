<template>
  <a-row :gutter="[30, 80]">
    <Card class="result" v-for="(item, index) in items" :key="index" :item="item"/>
  </a-row>
  <InfiniteLoading @infinite="load"/>
</template>

<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import Card from "@/components/schedule/main/ScheduleCard.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

let page = 0;
const pageInfo = ref();
// components 정의
const components = {
  Card,
};

// data 정의
let items = ref([]); // 서버로부터 받아온 데이터를 저장할 배열

// keyword, page, size는 필요에 따라 값을 설정하거나 props로 받아옵니다.
let keyword = ref("");
let size = ref(10);

function insert(arr, ...items) {
  console.log("in inserts", items[0]);
  items[0].forEach(item => {
    console.log("in insert", item);
    arr.push(item);
  })
}

const load = async $state => {
  console.log("loading...");

  // 1초마다 불러옴
  setTimeout(() => {
    getSchedules().then((response) => {
      try {
        const data = response.data.data;
        const pageInfo = response.data.pageInfo;
        console.log("try data", data);
        console.log("pageInfo", pageInfo);

        if (data.length < 10) $state.complete();
        else {
          console.log("data", data);
          console.log("items", items.value);
          insert(items.value, data);
          $state.loaded();
        }
        page++;

        if (page <= pageInfo.page) {
          console.log("page :::: ", page, pageInfo.page)
        }
      } catch (error) {
        console.log(error)
        $state.error();
      }
    });
  }, 1500);

};

async function getSchedules() {
  return await axios.get(
      `${import.meta.env.VITE_SERVER}/api/schedule?keyword=${keyword.value}&page=${page}&size=${size.value}`
  );
}

onMounted(async () => {
  // 컴포넌트가 마운트될 때 서버로부터 데이터를 가져옴
  await getSchedules().then((response) => {
    console.log("mounted", response);
    items.value = response.data.data; // API로부터 받아온 데이터를 items 배열에 저장
    pageInfo.value = response.data.pageInfo;
  });
});
</script>

<style>
.result {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
  width: 400px;
  padding: 10px;
  text-align: center;
  margin: 0 auto 10px auto;
  background: #eceef0;
  border-radius: 10px;
}

</style>
