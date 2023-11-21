<template>
  <div class="flip-card" @click="goToSchedule">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <a-card hoverable style="width: 200px">
          <template #cover>
            <img alt="example" :src="item.imgUrl"/>
          </template>
          <template #actions>
            <setting-outlined key="setting"/>
            <edit-outlined key="edit"/>
            <ellipsis-outlined key="ellipsis"/>
          </template>
          <a-card-meta :title="item.title" :description="item.content">
            <template #avatar>
              <a-avatar :src="item.imgUrl"/>
              <!-- imgUrl이 없을 경우 기본 이미지 URL 사용 -->
            </template>
          </a-card-meta>
        </a-card>
      </div>
      <div class="flip-card-back">
        <h1>{{ item.title }}</h1>
        <p>
          {{ item.days[0].date }} ~ {{ item.days[item.days.length - 1].date }}
        </p>
        <!-- 마지막 일정 날짜 출력 -->
        <!-- 일정 날짜 출력 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import {useRouter} from 'vue-router';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

function goToSchedule() {
  router.push({name: 'scheduleDetail', params: {id: props.item.scheduleId}});
}

console.log(props);
</script>

<style scoped>
img {
  height: 200px;
}

.flip-card {
  background-color: transparent;
  width: 200px;
  height: 300px;
  perspective: 1000px;
  transition: 0.3s;
  border-radius: 20px;
  margin: 30px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
}

.flip-card-front {
  color: black;
}

.flip-card-back {
  background-color: #ddd;
  color: black;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.ant-card-actions) {
  display: none !important;
}
</style>
