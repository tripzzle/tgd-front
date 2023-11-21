<script setup>
import UserInfo from "@/components/Mypage/UserInfo.vue";
import UserSchedule from "@/components/Mypage/UserSchedule.vue";
import UserWishList from "@/components/Mypage/UserWishList.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const route = useRoute();

const userInfo = ref(JSON.parse(route.query.userInfo));
const userSchedule = ref([]);
const userWishSD = ref([]);
const userWishAT = ref([]);

console.log("서버에서 유저정보 받아옴 " + Object.keys(userInfo.value));
console.log("유저 일정" + userInfo.value.schedules)

// onMounted(async () => {
//   const token = localStorage.getItem("token");
//유저 일정 가져오기
//   await axios.get(`${server}/api/user/userSchedule`, {
//     headers: {
//       'X-AUTH-TOKEN': token
//     }
//   })
//       .then(function (response) {
//         userSchedule.value = response.data;
//         console.log(userSchedule.value);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// //유저 위시리스트 가져오기 일정
//   await axios.get(`${server}/api/user/userWishSD`, {
//     headers: {
//       'X-AUTH-TOKEN': token
//     }
//   })
//       .then(function (response) {
//         userWishSD.value = response.data;
//         console.log(userWishSD.value);
//
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// //유저 위시리스트 가져오기 관광지
//   await axios.get(`${server}/api/user/userWishAT`, {
//     headers: {
//       'X-AUTH-TOKEN': token
//     }
//   })
//       .then(function (response) {
//         userWishAT.value = response.data;
//         console.log(userWishAT.value);
//
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
// })
</script>

<template>
  <a-flex class="mypage" justify="center" align="center">
    <a-col class="left">
      <UserInfo :userName="userInfo.name" :userNickName="userInfo.nickName" :userSex="userInfo.sex"
                :userImg="userInfo.imgUrl" class="info"/>
      <UserWishList/>
    </a-col>
    <UserSchedule/>
  </a-flex>
</template>

<style scoped>
.mypage {
  height: 1000px;
  display: flex;
  align-items: stretch;
  padding-top: 80px;
}

.info {
  margin-bottom: 100px;
}

.left {
  align-content: start;
  margin-right: 100px;
}
</style>
