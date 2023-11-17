<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible width="40vh">
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1">
        <span>Option 1</span>
      </a-menu-item>
    </a-menu>
    <div v-for="item in dayAttractions.value" @deleteToList="deleteToList(item)" :key="item.attractionId"
         style="padding: 10px">
      <DayAttractionDetail :item="item"/>
    </div>
  </a-layout-sider>
</template>
<script setup>
import {reactive, ref, watch} from "vue";
import {useStore} from "@/stores/store.js";
import DayAttractionDetail from "@/components/attraction/DayAttractionDetail.vue";

const {getDayAttractions, deleteToList} = useStore();

const collapsed = ref(false);
const selectedKeys = ref(["1"]);

const dayAttractions = reactive([]);

watch(getDayAttractions.value, (value1) => {
  dayAttractions.value = value1;
});

console.log("test" + getDayAttractions.value);
</script>
<style scoped>

a-input-search {
  width: 80%;
  box-sizing: border-box;
}
</style>