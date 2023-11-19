<template>
  <a-flex class="space" gap="large">
    <AttractionView v-if="showAttractionView" @goBack="showAttractionView = false"
                    @add-to-list="handleAddAttraction"/>
    <DayAttractionView v-if="!showAttractionView" :days="days" @moveAttractionView="handleMoveAttractionView"
                       @removeAttraction="handleRemoveAttraction" @delete-to-list="handleRemoveAttraction"/>
    <MapView/>
  </a-flex>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute} from 'vue-router';
import MapView from "@/components/schedule/write/view/MapView.vue";
import DayAttractionView from "@/components/schedule/write/view/DayAttractionView.vue";
import AttractionView from "@/components/schedule/write/view/AttractionView.vue";

const route = useRoute();
const startDate = ref('');
const endDate = ref('');
const dayAttractions = reactive([]);
let days = ref();
let showAttractionView = ref(false);
const currentSlide = ref(0);

// 관광지를 삭제하는 메서드, 현재 일자에 해당하는 동일한 관광지를 지워준다.
const handleRemoveAttraction = (attraction, currentSlide, index) => {
  console.log("remove in ScheduleWriteView", attraction, currentSlide,
      days.value[currentSlide], index);
  days.value[currentSlide].attractions.splice(index, 1);
}

const handleAddAttraction = (attraction) => {
  console.log("addToList in ScheduleWriteView", attraction, dayAttractions, "days", currentSlide.value , days.value[currentSlide.value]);
  days.value[currentSlide.value].attractions.push(attraction);
  console.log(days.value)
}

const handleMoveAttractionView = (val) => {
  // currentSlide 값을 사용하여 작업을 수행합니다.
  console.log(val);
  currentSlide.value = val;
  showAttractionView.value = true;
};

const generateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let currentDate = startDate;
  const days = [];

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days.map(day => ({date: day, attractions: [...dayAttractions]}));
};

const updateDatesFromQuery = () => {
  startDate.value = route.query.startDate;
  endDate.value = route.query.endDate;
  console.log(startDate.value, endDate.value);
  days.value = generateDays(startDate.value, endDate.value);
  console.log(days.value);
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