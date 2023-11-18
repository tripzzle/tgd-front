<template>
  <a-flex class="space" gap="large">
    <AttractionView v-if="showAttractionView" @goBack="showAttractionView = false"/>
    <DayAttractionView v-if="!showAttractionView" :days="days" @addAttraction="showAttractionView = true"/>
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
let days = ref();

const dummyAttractions = [
  {attractionId: 1, title: "title", imgUrl: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg"},
  {attractionId: 2, title: "title", imgUrl: "http://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg"},
];
let showAttractionView = ref(false);

const generateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let currentDate = startDate;
  const days = [];

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days.map(day => ({date: day, attractions: dummyAttractions}));
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