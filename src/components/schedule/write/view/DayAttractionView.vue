<template>
  <a-layout v-model:collapsed="collapsed" collapsible >
    <div class="carousel">
      <img src="@/assets/img/화살표%20버튼.png" class="carousel-button prev" @click="prevSlide" style="transform: scaleX(-1);">
      <transition :name="slideDirection" mode="out-in">
        <div class="slides" :key="currentSlide">
          <div v-for="(item, index) in days" :key="index" v-show="currentSlide === index">
            Day{{ index + 1 }}
          </div>
        </div>
      </transition>
      <img src="@/assets/img/화살표%20버튼.png" class="carousel-button next" @click="nextSlide">
    </div>
    <div class="button-container">
      <button class="a-button-primary" @click="moveAttractionView">장소 추가</button>
    </div>
    <transition style="height: 700px" :name="slideDirection" mode="out-in">
      <div :key="currentSlide" class="items">
        <div v-if="props.days.length > 0">
          <div v-for="(attraction, index) in props.days[currentSlide].dayAttractions" :key="attraction.attractionId"
               style="padding: 10px">
            <DayAttractionDetail @deleteToList="deleteToList(attraction, index)" :item="attraction"/>
          </div>
        </div>
      </div>
    </transition>
  </a-layout>
</template>
<script setup>
import {reactive, ref, watch} from "vue";
import DayAttractionDetail from "@/components/attraction/DayAttractionDetail.vue";

const collapsed = ref(false);
const dayAttractions = reactive([]);
let currentSlide = ref(0);
let slideDirection = ref('forward');

const props = defineProps({
  days: {
    type: Array,
    default: () => []
  },

  slide: {
    type: Number,
  }
});


watch(
    () => props.slide,
    () => {
      currentSlide.value = props.slide
    },
    {immediate: true}
)

const deleteToList = (attraction, index) => {
  console.log("DayAttractionView's deleteToList", attraction);
  emit("deleteToList", attraction, currentSlide.value, index);
}

// day 일자에 추가하기 위해 이벤트 등록
const emit = defineEmits(["moveAttractionView", "deleteToList", "moveMaker"]);
const moveAttractionView = () => {
  emit("moveAttractionView", currentSlide.value);
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
  const dayat = props.days[currentSlide.value].attractions;
  console.log("next slide: ", currentSlide.value);

  emit("moveMaker", props.days[currentSlide.value].dayAttractions, currentSlide.value);

};

// 이전 버튼을 누르면 날짜 맨 뒤로 이동
const prevSlide = () => {
  if (currentSlide.value <= 0) {
    currentSlide.value = props.days.length - 1;
  } else {
    currentSlide.value--;
  }
  slideDirection.value = 'backward';
  dayAttractions.value = props.days[currentSlide.value].attractions;
  console.log("prev slide: ", currentSlide.value);

  emit("moveMaker", props.days[currentSlide.value].dayAttractions, currentSlide.value);
};
</script>

<style scoped>
/* 커스텀 캐러셀 */
.carousel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 10px;
  height: 10px;
  background: #af90e1;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

}

.carousel-button {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background: rgba(189, 178, 178, 0.06);
  border-radius: 50%;
  color: rgba(12, 12, 12, 0.98);
  opacity: 0.3;
  transition: all 0.3s ease;
  z-index: 1;
}

.carousel-button img {
  display: none;
}


.slides {
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 65px;
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
  transform: translateX(60%);
}

.forward-leave-to, .backward-enter-from {
  transform: translateX(-60%);
}

.forward-enter-to, .forward-leave-from, .backward-enter-to, .backward-leave-from {
  transform: translateX(0);
}

.items {
  overflow-y: auto;
  max-height: 500px /* 원하는 높이로 설정하세요 */
}

/* 장소 추가 버튼 스타일 */
.button-container {
  display: flex;
  justify-content: center;
  height: 40px;
  margin-top: -10px;
}

.a-button-primary {
  width: 100%;

  background-color: #f584ac;
  border: none;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.47);

}

.a-button-primary:hover,
.a-button-primary:focus {
  border-color: #8a68c3;
}
</style>
