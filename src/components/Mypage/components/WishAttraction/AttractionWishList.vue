<script setup>
import { onMounted, ref } from "vue";
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";
import axios from "axios";
import { user } from "@/stores/store";

const server = import.meta.env.VITE_SERVER;

const wishListA = ref({});

onMounted(async () => {
  await axios
      .get(`${server}/api/user/userWishAT`, {
        headers: {
          'X-AUTH-TOKEN': user.token
        },
      })
      .then(function (response) {
        console.log(response.data);
        wishListA.value = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
});
</script>

<template>
  <a-col class="result">
    <div class="schedule-card-container">
      <AttractionDetail
          v-for="item in wishListA"
          :key="item.attractionId"
          :item="item"
          @click="showDetail(item)"
          class="list"
      />
    </div>
  </a-col>
</template>

<style scoped>
.result {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 300;
  width: 600px;
  height: 355px;
  padding: 30px;
  text-align: center;
  justify-items: center;
  margin: 0 auto 10px auto;
  border-radius: 10px;
  overflow-y: auto; /* 상하 스크롤 생성 */
  max-height: 550px;
}

.schedule-card-container {
  margin-left: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  /* overflow-x: scroll; */ /* 좌우 스크롤 생성 */
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
