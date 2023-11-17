<script setup>
import UserInfo from "@/components/Mypage/UserInfo.vue";
import UserSchedule from "@/components/Mypage/UserSchedule.vue";
import UserWishList from "@/components/Mypage/UserWishList.vue";
</script>

<template>
  <a-flex class="mypage" justify="center" align="center">
    <a-col class="left">
      <UserInfo class="info"/>
      <UserWishList/>
    </a-col>
    <UserSchedule/>
  </a-flex>
</template>

<style scoped>
.mypage {
  height: 1000px;
}

.info {
  margin-bottom: 100px;
}

.left {
  align-content: start;
  margin-right: 100px;
}
</style>
