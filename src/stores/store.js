import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const store = reactive({
  open: false,
  list: [],
});

export const user = reactive({
  isLogin: false,
  token: localStorage.getItem("token"),
});
