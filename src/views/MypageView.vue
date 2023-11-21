<script setup>
import UserInfo from "@/components/Mypage/UserInfo.vue";
import UserSchedule from "@/components/Mypage/UserSchedule.vue";
import UserWishList from "@/components/Mypage/UserWishList.vue";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute();

const userInfo = ref(JSON.parse(route.query.userInfo));
console.log("서버에서 유저정보 받아옴 " + Object.keys(userInfo.value));
console.log("유저 일정" + userInfo.value.schedules)
</script>

<template>
  <a-flex class="mypage" justify="center" align="center">
    <a-col class="left">
      <UserInfo :userName="userInfo.name" :userNickName="userInfo.nickName" :userSex="userInfo.sex" :userImg="userInfo.imgUrl" class="info"/>
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
