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
import {ref} from "vue";
import {store} from "@/stores/store.js";
import { useRouter } from 'vue-router';

const value1 = ref([]);

// OK 버튼 누르면 모달 꺼짐
// 일정 생성 페이지로 연결하기
const router = useRouter();

const handleOk = (e) => {
  if (value1.value && value1.value.length === 2) {
    const startDate = value1.value[0].format('YYYY-MM-DD');
    const endDate = value1.value[1].format('YYYY-MM-DD');

    router.push({
      name: 'schedule',
      query: { startDate, endDate }
    });
  }

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
</style>
