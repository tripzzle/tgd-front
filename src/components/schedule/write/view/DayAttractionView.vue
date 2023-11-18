<template>
  <a-layout v-model:collapsed="collapsed" collapsible style="width: 40%">
    <div class="carousel">
      <button class="carousel-button prev" @click="prevSlide">&lt</button>
      <transition :name="slideDirection" mode="out-in">
        <div class="slides" :key="currentSlide">
          <div v-for="(item, index) in days" :key="index" v-show="currentSlide === index">
            <a-tag color="purple">Day{{ index + 1 }}</a-tag>
            {{ item.date.getFullYear() }}.{{ item.date.getMonth() }}.{{ item.date.getDate() }}
          </div>
        </div>
      </transition>
      <button class="carousel-button next" @click="nextSlide">></button>
    </div>
    <a-button @click="addAttraction">장소 추가</a-button>
    <transition :name="slideDirection" mode="out-in">
      <div :key="currentSlide">
        <div v-if="props.days.length > 0">
          <div v-for="attraction in props.days[currentSlide].attractions" :key="attraction.attractionId"
               @deleteToList="deleteToList(attraction)" style="padding: 10px">
            <DayAttractionDetail :item="attraction"/>
          </div>
        </div>
      </div>
    </transition>
  </a-layout>
</template>
<script setup>
import {reactive, ref, watch} from "vue";
import {useStore} from "@/stores/store.js";
import DayAttractionDetail from "@/components/attraction/DayAttractionDetail.vue";

const {deleteToList} = useStore();
const collapsed = ref(false);
const dayAttractions = reactive([]);
let currentSlide = ref(0);
let slideDirection = ref('forward');

const props = defineProps({
  days: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["addAttraction"]);

const addAttraction = () => {
  emit("addAttraction");
};

// props 사용
watch(() => props.days, (newVal, oldVal) => {
  console.log("new value: ", newVal, "old value: ", oldVal);
});

const nextSlide = () => {
  if (currentSlide.value >= props.days.length - 1) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
  slideDirection.value = 'forward';
  dayAttractions.value = props.days[currentSlide.value].attractions;
  console.log("next slide: ", currentSlide.value);
  console.log(props.days[currentSlide.value])
};

const prevSlide = () => {
  if (currentSlide.value <= 0) {
    currentSlide.value = props.days.length - 1;
  } else {
    currentSlide.value--;
  }
  slideDirection.value = 'backward';
  dayAttractions.value = props.days[currentSlide.value].attractions;
  console.log("prev slide: ", currentSlide.value);
};
</script>

<style scoped>
/* 커스텀 캐러셀 */
.carousel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 10px;
  background: #A385CF;
}

.carousel-button {
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  background: red;
  color: #fff;
  opacity: 0.3;
  transition: all 0.3s ease;
  z-index: 1;
}

.carousel-button img {
  display: none;
}

.carousel-button:hover {
  opacity: 0.5;
}

.slides {
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 80px;
  line-height: 60px;
  overflow: hidden;
}

.slides h3 {
  color: #fff;
}

.forward-enter-active, .forward-leave-active, .backward-enter-active, .backward-leave-active {
  transition: all 0.3s ease;
}

.forward-enter-from, .backward-leave-to {
  transform: translateX(100%);
}

.forward-leave-to, .backward-enter-from {
  transform: translateX(-100%);
}

.forward-enter-to, .forward-leave-from, .backward-enter-to, .backward-leave-from {
  transform: translateX(0);
}
</style>