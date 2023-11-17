<template>
  <a-col span="6">
    <a-select
        v-model="selectedOption"
        @change="onChangeOption"
        placeholder="지역"
        style="width: 100%">
      <a-select-option value="0">전국</a-select-option>
      <a-select-option value="1">서울</a-select-option>
      <a-select-option value="2">인천</a-select-option>
      <a-select-option value="3">대전</a-select-option>
      <a-select-option value="4">대구</a-select-option>
      <a-select-option value="5">광주</a-select-option>
      <a-select-option value="6">부산</a-select-option>
      <a-select-option value="7">울산</a-select-option>
      <a-select-option value="8">세종</a-select-option>
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
</template>

<script setup>
import {ref} from "vue";
import {defineEmits} from 'vue'

const selectedOption = ref(null);

// update 이벤트 정의
const emits = defineEmits(['update']);

const onChangeOption = (option) => {
  selectedOption.value = option;
  emits('update', option);  // 옵션이 변경될 때마다 'update' 이벤트를 발생시킴
};
</script>

<style scoped>
</style>