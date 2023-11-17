<script setup>
import {ref} from "vue"
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";

const wishListA = ref([
  {
    imgUrl: "",
    title:"test1",
    address:"test1test1test1test1"
  },
  {
    imgUrl: "",
    title:"test2",
    address:"test2test2test2test2test2"
  },
  {
    imgUrl: "",
    title:"test3",
    address:"test3test3test3test3"
  },
]);

</script>

<template>
  <a-row justify="center" :gutter="[0, 32]">
    <AttractionDetail v-for="item in wishListA" :key="item.attractionId" :item="item" @click="showDetail(item)" class="list" />
  </a-row>
</template>

<style scoped>
</style>