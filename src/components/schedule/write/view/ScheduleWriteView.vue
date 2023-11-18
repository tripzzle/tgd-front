<template>
  <a-flex class="space" gap="large">
<!--    <AttractionView/>-->
    <DayAttractionView :days="days"/>
    <MapView/>
  </a-flex>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useStore} from "@/stores/store.js";
import {useRoute} from 'vue-router';
import MapView from "@/components/schedule/write/view/MapView.vue";
import DayAttractionView from "@/components/schedule/write/view/DayAttractionView.vue";
import AttractionView from "@/components/schedule/write/view/AttractionView.vue";

const route = useRoute();
const startDate = ref('');
const endDate = ref('');
const {getDayAttractions} = useStore();
const dayAttractions = reactive([]);

const generateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let currentDate = startDate;
  const days = [];

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
};

let days = ref();
const updateDatesFromQuery = () => {
  startDate.value = route.query.startDate;
  endDate.value = route.query.endDate;
  console.log(startDate.value, endDate.value);
  days.value = generateDays(startDate.value, endDate.value);
  console.log(days)
};

watch(getDayAttractions.value, (value1) => {
  dayAttractions.value = value1;
});

console.log("test" + getDayAttractions.value);

onMounted(updateDatesFromQuery);
</script>

<style scoped>
.space {
  margin: 60px 20px;
}
</style>