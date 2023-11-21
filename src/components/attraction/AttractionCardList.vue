<template>
  <div style="padding: 10px">
    <a-row span="6">
      <a-col span="24">
        <div v-for="item in attractions" :key="item.attractionId" align="center">
          <AttractionDetail :item="item" @addToList="addToList(item)" @click="openModal(item)" class="list"/>
        </div>
      </a-col>
    </a-row>
    <AttractionDetailModal :open="open" :item="selectedAttraction" @close="closeModal"/>
  </div>
</template>


<script setup>
import {ref, onMounted, computed} from "vue";
import axios from "axios";
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";
import AttractionDetailModal from "@/components/attraction/AttractionDetailModal.vue";
import API from "@/components/schedule/write/api/api";

const selectedAttraction = ref(null);
const height = ref(6);
const width = ref(6);
const lat = ref(37.543902);
const lng = ref(127.979745);
const open = ref(false);

const localAttractions = ref([]);

const emit = defineEmits(["addToList"]);
const addToList = (item) => {
  console.log("addToList in AttractionCardList", item);
  emit('addToList', item);
}

const props = defineProps({
  attractions: Object
});

const attractions = computed(() => {
  return props.attractions ? props.attractions : localAttractions.value;
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

onMounted(async () => {
  console.log("onMounted")
  const response = await axios.get(API.getAttractionsByLatLng(lat, lng, height, width));
  localAttractions.value = response.data.data;
  console.log(localAttractions.value);
});
</script>

<style scoped>
.list {
  margin-bottom: 20px;
}
</style>
