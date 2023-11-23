<template>
  <div style="padding: 10px; height: 530px">
    <a-row span="6" align="center">
      <a-col span="24">
        <div v-for="item in dayAttractions" :key="item.attractionId" align="center">
          <AttractionDetail :item="item" @addToList="addToList(item)" @click="openModal(item)" class="list"/>
        </div>
      </a-col>
      <a-pagination :current="current" :total="curTotal" show-less-items @change="change" size="small"/>
    </a-row>
    <AttractionDetailModal :open="open" :item="selectedAttraction" @close="closeModal"/>
  </div>
</template>


<script setup>
import {ref, onMounted, computed, watch} from "vue";
import axios from "axios";
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";
import AttractionDetailModal from "@/components/attraction/AttractionDetailModal.vue";
import API from "@/components/schedule/write/api/api";

const selectedAttraction = ref(null);
// const height = ref(6);
// const width = ref(6);
// const lat = ref(37.543902);
// const lng = ref(127.979745);
const open = ref(false);
const current = ref();
const curTotal = ref();
const localAttractions = ref([]);

const change = (e) => {
  current.value = e;
}

const emit = defineEmits(["addToList"], ["page"]);
const addToList = (item) => {
  console.log("addToList in AttractionCardList", item);
  emit('addToList', item);
}

const props = defineProps({
  dayAttractions: Object,
  total: Object
});

const dayAttractions = computed(() => {
  return props.dayAttractions ? props.dayAttractions : localAttractions.value;
});

const openModal = (item) => {
  selectedAttraction.value = item;
  console.log(item)
  open.value = true;
}

const closeModal = () => {
  console.log("modal 닫음")
  open.value = false;
}

watch(current, () => {
  console.log("페이지 변경");
  emit("page", current);
});

watch(() => props.total, (val) => {
  console.log("ㅇㅇ", val);
  curTotal.value = val;
})

onMounted(async () => {
  console.log("onMounted")
  const response = await axios.get(API.getAttractionsByTitle("", 32, 1));
  localAttractions.value = response.data.data;
  curTotal.value = response.data.pageInfo.totalPage;
  console.log(localAttractions.value);
});
</script>

<style scoped>
.list {
  margin-bottom: 20px;
}
</style>
