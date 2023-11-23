<template>
  <a-layout v-model:collapsed="collapsed" collapsible style="width: 40%">
    <a-button @click="goBack">뒤로 가기</a-button>
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" class="ant-menu-item">
      <a-row direction="vertical" justify="center">
        <a-col>
          <a-input-search
              v-model:value="keyword"
              placeholder="찾으려는 관광지를 입력하세요"
              @search="onSearch"
              style="width: 100%"
          />
        </a-col>
        <SidoOption @update="onUpdateOption"/>
      </a-row>
      <AttractionCardList :dayAttractions="searchResult" @add-to-list="addToList" @page="changePage" :total="total"/>
    </a-menu>
  </a-layout>
</template>

<script setup>
import AttractionCardList from "@/components/attraction/AttractionCardList.vue";
import SidoOption from "@/components/schedule/write/SidoOption.vue";
import API from '../api/api.js';
import {ref} from "vue";
import axios from "axios";
import "v3-infinite-loading/lib/style.css";

const collapsed = ref(false);
const selectedKeys = ref(["1"]);
const keyword = ref('');
const sidoCode = ref(null);
const searchResult = ref(null);
const page = ref(0);
const total = ref();
const emit = defineEmits(["goBack", "addToList"]);

const changePage = (childPage) => {
  page.value = childPage.value;
  console.log("ss",page.value);
  axios.get(API.getAttractionsByTitle(keyword.value, sidoCode.value == null ? 32 : sidoCode.value, page.value))
      .then(response => {
        const data = response.data;
        console.log(data);
        searchResult.value = data.data;
        total.value = data.pageInfo.totalSize;
        console.log(page.value, total.value, "임")
      })
      .catch(error => {
        console.error(error);
      });
}

const addToList = (item) => {
  console.log("addToList in AttractionView", item);
  emit('addToList', item);
}

const goBack = () => {
  emit("goBack");
};

const onSearch = () => {
  if (sidoCode.value == null) {
    alert("지역을 선택해주세요");
    return;
  }
  axios.get(API.getAttractionsByTitle(keyword.value, sidoCode.value, page.value))
      .then(response => {
        const data = response.data;
        console.log(data);
        searchResult.value = data.data;
        total.value = data.pageInfo.totalSize;
        console.log(page.value, total.value, "임")
      })
      .catch(error => {
        console.error(error);
      });
};

const onUpdateOption = (option) => {
  sidoCode.value = option;
};

</script>

<style scoped>
a-input-search {
  width: 100%;
  box-sizing: border-box;
}

.ant-menu-item {
  overflow-y: auto;
  max-height: 700px;
}
</style>