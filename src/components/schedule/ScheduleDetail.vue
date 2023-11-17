<script setup>
import {reactive, ref, watch} from "vue";
import AttractionCardList from "../attraction/AttractionCardList.vue";
import MapView from "@/components/common/MapView.vue";
import {useStore} from "@/stores/store.js";
import DayAttractionDetail from "@/components/attraction/DayAttractionDetail.vue";

const {getDayAttractions, deleteToList} = useStore();

const collapsed = ref(false);
const selectedKeys = ref(["1"]);

const value = ref('');
const selectedOption = ref(null);

const onChangeOption = (option) => {
  selectedOption.value = option;
};

const dayAttractions = reactive([]);

const onSearch = () => {
  // Do something with the query
  console.log(`검색어: value : ${value.value} option : ${selectedOption.value}`);
};

watch(getDayAttractions.value, (value1) => {
  dayAttractions.value = value1;
});

console.log("test" + getDayAttractions.value);
</script>

<template>
  <a-layout style="min-height: 100vh; width: 100vw" class="custom">
    <a-layout v-model:collapsed="collapsed" collapsible style="width: 25vw">
      <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline" class="ant-menu-item">
        <a-row direction="vertical" justify="center">
          <a-col span="18">
            <a-input-search
                v-model:value="value"
                placeholder="찾으려는 관광지를 입력하세요"
                @search="onSearch"
                style="width: 100%"
            />
          </a-col>
          <a-col span="6">
            <a-select
                v-model="selectedOption"
                @change="onChangeOption"
                placeholder="선택해주세요"
                style="width: 100%">
              <a-select-option value="1">서울</a-select-option>
              <a-select-option value="2">인천</a-select-option>
              <a-select-option value="3">대전</a-select-option>
              <a-select-option value="4">대구</a-select-option>
              <a-select-option value="5">광주</a-select-option>
              <a-select-option value="6">부산</a-select-option>
              <a-select-option value="7">울산</a-select-option>
              <a-select-option value="8">세종시</a-select-option>
              <a-select-option value="31">경기도</a-select-option>
              <a-select-option value="32">강원도</a-select-option>
              <a-select-option value="33">충청북도</a-select-option>
              <a-select-option value="34">충청남도</a-select-option>
              <a-select-option value="35">경상북도</a-select-option>
              <a-select-option value="36">경상남도</a-select-option>
              <a-select-option value="37">전라북도</a-select-option>
              <a-select-option value="38">전라남도</a-select-option>
              <a-select-option value="39">제주도</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <AttractionCardList/>
      </a-menu>
    </a-layout>

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
    <MapView></MapView>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

a-input-search {
  width: 80%;
  box-sizing: border-box;
}
</style>
