<template>
  <a-layout v-model:collapsed="collapsed" collapsible >
    <div class="carousel">
      <img src="@/assets/img/화살표%20버튼.png" class="carousel-button prev" @click="prevSlide" style="transform: scaleX(-1);">
      <transition :name="slideDirection" mode="out-in">
        <div class="slides" :key="currentSlide">
          <div v-for="(index) in dayResponse.length" :key="index" v-show="currentSlide === index - 1">
            Day{{ index }}
          </div>
        </div>
      </transition>
      <img src="@/assets/img/화살표%20버튼.png" class="carousel-button next" @click="nextSlide">
    </div>
    <transition style="height: 700px" :name="slideDirection" mode="out-in">
      <div :key="currentSlide" class="items">
        <div v-if="dayResponse.length > 0">
          <div v-for="attraction in dayResponse[currentSlide].attractions" :key="attraction.attractionId"
               style="padding: 10px">
            <div class="card">
              <img :src="attraction?.imgUrl" alt="image"/>
              <div class="card-content">
                <h3>{{ attraction.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </a-layout>
</template>
<script setup>
import {reactive, ref, watch} from "vue";

const collapsed = ref(false);
const dayAttractions = reactive([]);
let currentSlide = ref(0);
let slideDirection = ref('forward');

const props = defineProps({
  dayResponse: {
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
      console.log(props.slide)
      currentSlide.value = props.slide
    },
    {immediate: true}
)

// day 일자에 추가하기 위해 이벤트 등록
const emit = defineEmits(["moveMaker"]);

// props 사용
watch(() => props.dayResponse, (newVal, oldVal) => {
  console.log("new value: ", newVal, "old value: ", oldVal, currentSlide.value);
});

const nextSlide = () => {
  if (currentSlide.value >= props.dayResponse.length - 1) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
  slideDirection.value = 'forward';
  dayAttractions.value = props.dayResponse[currentSlide.value].attractions;
  console.log("next slide: ", currentSlide.value);

  emit("moveMaker", currentSlide.value);
};

// 이전 버튼을 누르면 날짜 맨 뒤로 이동
const prevSlide = () => {
  if (currentSlide.value <= 0) {
    currentSlide.value = props.dayResponse.length - 1;
  } else {
    currentSlide.value--;
  }
  slideDirection.value = 'backward';
  dayAttractions.value = props.dayResponse[currentSlide.value].attractions;
  console.log("prev slide: ", currentSlide.value);

  emit("moveMaker", currentSlide.value);
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

.card {
  width: 100%;
  padding: 10px;
  background-color: #fffdfd;
  border: 5px solid #a385cf;
  box-shadow: 0px 0px 20px 0px grey;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;

  > img {
    border-radius: 20px;
  }

  .card-content {
    width: 60%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }

  .card-content h3 {
    margin-bottom: 25px;
    white-space: nowrap;
  }

  .card-content h6 {
    margin-bottom: 10px;
    white-space: nowrap;
  }
}

img {
  width: 100px;
  height: 80px;
}
</style>
