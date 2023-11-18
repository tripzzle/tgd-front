<template>
  <a-layout v-model:collapsed="collapsed" collapsible style="width: 40%">
    <a-button @click="goBack">뒤로 가기</a-button>
    <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" class="ant-menu-item">
      <a-row direction="vertical" justify="center">
        <a-col span="16">
          <a-input-search
              v-model:value="keyword"
              placeholder="찾으려는 관광지를 입력하세요"
              @search="onSearch"
          />
        </a-col>
        <SidoOption @update="onUpdateOption"/>
      </a-row>
      <AttractionCardList :attractions="searchResult"/>
    </a-menu>
  </a-layout>

</template>
<script setup>
import AttractionCardList from "@/components/attraction/AttractionCardList.vue";
import SidoOption from "@/components/schedule/write/SidoOption.vue";
import API from '../api/api.js';
import {ref} from "vue";
import axios from "axios";

const collapsed = ref(false);
const selectedKeys = ref(["1"]);
const keyword = ref('');
const sidoCode = ref(null);
const searchResult = ref(null);
const page = ref(null);
const emit = defineEmits(["goBack"]);

const goBack = () => {
  emit("goBack");
};
const onSearch = () => {
  if (sidoCode.value == null) {
    alert("지역을 선택해주세요");
    return;
  }
  axios.get(API.getAttractionsByTitle(keyword.value, sidoCode.value))
      .then(response => {
        const data = response.data;
        console.log(data.data);
        // API로부터 받아온 attraction 리스트.
        // data로 감싸져있어 data.data로 리스트를 꺼내온다.
        searchResult.value = data.data;
        // 페이지 정보를 갖고 있는 값
        page.value = data.pageInfo;
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
  width: 80%;
  box-sizing: border-box;
}

.ant-menu-item {
  overflow-y: auto;
  max-height: 700px /* 원하는 높이로 설정하세요 */
}


</style>