<template>
  <a-modal
      title="관광지 제목"
      :open="store.open"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="일정 만들기"
      cancelText="취소"
      class="centered-title centered-content">
  </a-modal>
</template>

<script setup>
import { defineProps } from "vue";
import {store} from "@/stores/store";

const props = defineProps(["item"]);
</script>

<style scoped>
</style>
