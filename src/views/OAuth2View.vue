<script setup>
import { useRoute } from "vue-router";
import axios from 'axios';

const route = useRoute();
const code = route.query.code;

axios.post('http://localhost:8080/api/user', {
  code: code
})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
</script>

<template>
  왔어용
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
  왔어요<br>
</template>

<style scoped>

</style>
