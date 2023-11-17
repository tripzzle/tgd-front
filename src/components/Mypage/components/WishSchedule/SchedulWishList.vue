<script setup>
import Card from "@/components/schedule/Card.vue"
import {ref} from "vue";

const wishListS = ref([
  {
    imgUrl: "",
    title: "테스트 일정 1",
    content: "야호",
    days: [
      {
        date: "2023-11-04",
        dayId: 23
      },
      {
        date: "2023-11-05",
        dayId: 24
      },
    ]
  },
  {
    imgUrl: "",
    title: "테스트 일정 1",
    content: "야호",
    days: [
      {
        date: "2023-11-04",
        dayId: 23
      },
      {
        date: "2023-11-05",
        dayId: 24
      },
    ]
  },
]);

</script>

<template>
  <a-row>
    <Card v-for="(item, index) in wishListS" :key="index" :item="item" />
  </a-row>
</template>

<style scoped>

</style>