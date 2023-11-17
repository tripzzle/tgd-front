<template>
  <a-layout>
    <AttractionView/>
    <DayAttractionView/>
    <MapView/>
  </a-layout>
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

const updateDatesFromQuery = () => {
  startDate.value = route.query.startDate;
  endDate.value = route.query.endDate;
  console.log(startDate.value, endDate.value);
};

watch(getDayAttractions.value, (value1) => {
  dayAttractions.value = value1;
});

console.log("test" + getDayAttractions.value);

onMounted(updateDatesFromQuery);
</script>

<style scoped>
</style>