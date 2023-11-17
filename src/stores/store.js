import {reactive, computed} from 'vue';

export const store = reactive({
  open: false,
  list: [], // list를 reactive 객체 내부에 선언
});

export const useStore = () => {
  const getDayAttractions = computed(() => store.list); // list를 반환하는 getter 함수
  const addToList = (item) => {
    store.list.push(item);
    console.log(store.list);
  };

  const deleteToList = (itemToDelete) =>{
    store.list = store.list.filter(item => item !== itemToDelete);
    console.log("hi")
  }
  return { getDayAttractions, addToList, deleteToList };
};