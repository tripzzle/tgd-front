<template>
  <div>
    <div v-for="item in attractions" :key="item.attractionId">
      <AttractionDetail :item="item" @click="showDetail(item)" class="list" />
    </div>
    <AttractionDetail
      v-if="selectedAttraction"
      :visible="isModalVisible"
      @update:visible="isModalVisible = $event">
      <h2>{{ selectedAttraction.title }}</h2>
      <p>{{ selectedAttraction.overview }}</p>
    </AttractionDetail>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";

const attractions = ref([]);
const selectedAttraction = ref(null);
const isModalVisible = ref(false);
const height = ref(6);
const width = ref(6);
const lat = ref(37.543902);
const lng = ref(127.979745);

onMounted(async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER}/api/attraction/all?latitude=${
      lat.value
    }&height=${height.value}&width=${width.value}&longitude=${lng.value}`
  );
  attractions.value = response.data;
  console.log(attractions.value);
});

const showDetail = (item) => {
  selectedAttraction.value = item;
  isModalVisible.value = true;
};
</script>

<style scoped>
.list {
  margin-bottom: 20px;
}
</style>
