<script setup>
import UserInfo from "@/components/Mypage/UserInfo.vue";
import UserSchedule from "@/components/Mypage/UserSchedule.vue";
import UserWishList from "@/components/Mypage/UserWishList.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import async from "async";

const server = import.meta.env.VITE_SERVER;

const route = useRoute();

const userInfo = ref(route.params.userInfo);
console.log(userInfo)
const userSchedule = ref([]);
const userWishSD = ref([]);
const userWishAT = ref([]);
 const handleUpdate = async(newInfo, newImg) => {
   console.log(newInfo.value)
  userInfo.value.nickname = newInfo.value.userNickName;
  userInfo.value.birth = newInfo.value.userBirth;
  userInfo.value.userSex = newInfo.value.userSex;
  console.log("바뀐정보 서버로!! " + newInfo.value.nickname + " " + newImg)
  let formData = new FormData();

// 프로필 이미지 formData에 추가
  if (newImg) {
    formData.append('file', newImg.value);
    userInfo.imgUrl = null;
  }
  formData.append('patch', new Blob([JSON.stringify(userInfo.value)], {type: 'application/json'}));

  const token = localStorage.getItem("token");
  console.log(token)
  await axios.patch(`${server}/api/user/userupdate`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': token
        }
      })
      .then(function (response) {
        userInfo.value = response.data.value;
      })
      .catch(function (error) {
        console.log(error);
      });
  console.log("유저정보 바뀜 " + userInfo.value.nickname);

}

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
      <UserInfo @update="handleUpdate" :userName="userInfo.name"
                :userNickName="userInfo.nickname" :userSex="userInfo.sex"
                :userImg="userInfo.imgUrl" :userBirth="userInfo.birth"
                class="info"/>
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
