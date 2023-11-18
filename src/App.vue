<script setup>
import NavBar from "@/components/common/NavBar.vue";
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";

fetch('http://localhost:5173', {
  redirect: 'manual'  // 리다이렉트를 수동으로 처리
})
    .then(response => {
      const authorization = response.headers.get('Authorization');  // 'Authorization'는 수신하려는 헤더의 이름입니다.
      console.log(authorization);
    })
    .catch(error => console.error(error));
</script>

<template>
  <div class="hi">
    <NavBar />
  </div>
  <router-view />
</template>

<style scoped>
.hi {
  background-color: #cb1818;
  margin-top: 70px;
  /* margin: 200px 140px; */
  /* padding: 40px 40px; */
}
</style>
