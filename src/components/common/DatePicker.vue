<template>
  <div>
    <a-modal
      title="언제 여행을 가고 싶나요?"
      :open="store.open"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="일정 만들기"
      cancelText="취소"
      class="centered-title centered-content">
      <a-col align="center">
        <a-space direction="vertical" :size="12">
          <a-range-picker
            v-model:value="value1"
            picker="date"
            :presets="rangePresets"
            @change="handleChange" />
        </a-space>
      </a-col>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "@/stores/store.js";
const value1 = ref([]);

// OK 버튼 누르면 모달 꺼짐
// 일정 생성 페이지로 연결하기
const handleOk = (e) => {
  console.log(e);
  store.open = false;
};

// 취소, X누르면 모달 꺼짐
const handleCancel = (e) => {
  console.log(e);
  store.open = false;
};

// 값 바뀌면 적용
const handleChange = (dates) => {
  if (dates && dates[0] && dates[1]) {
    value1.value = dates;
  }
};
</script>

<style scoped>
.centered-title .ant-modal-title,
.centered-content .ant-modal-body {
  text-align: center;
}
</style>
