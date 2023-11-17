<template>
  <div style="padding: 10px">
    <a-row span="6">
      <a-col span="24">
        <div v-for="item in attractions" :key="item.attractionId" align="center">
          <AttractionDetail :item="item" @addToList="addToList(item)" class="list"/>
        </div>
      </a-col>
    </a-row>
    <AttractionDetailModal v-if="selectedAttraction" :item="selectedAttraction" @close="closeModal"/>
  </div>
</template>


<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
import AttractionDetail from "@/components/attraction/AttractionDetail.vue";
import AttractionDetailModal from "@/components/attraction/AttractionDetailModal.vue";
import {useStore} from "@/stores/store.js";

const {addToList} = useStore();

const attractions = ref([]);
const selectedAttraction = ref(null);
const height = ref(6);
const width = ref(6);
const lat = ref(37.543902);
const lng = ref(127.979745);
const value = ref('');
const selectedOption = ref(null);

onMounted(async () => {
  const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/attraction/all?latitude=${lat.value}&height=${height.value}&width=${width.value}&longitude=${lng.value}`
  );
  attractions.value = response.data;
});

const onSearch = async () => {
  const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/attraction?keyword=${value.value}&sidoCode=${selectedOption.value}`
  );
  attractions.value = response.data;
  console.log("attraction : " + attractions.value);
};

const showDetail = (item) => {
  console.log("hhh")
  selectedAttraction.value = item;
};

const closeDetail = () => {
  selectedAttraction.value = null;
};
</script>

<style scoped>
.list {
  margin-bottom: 20px;
}
</style>
