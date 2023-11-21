import {reactive, computed} from 'vue';

export const store = reactive({
  open: false,
  list: [], // list를 reactive 객체 내부에 선언
});

