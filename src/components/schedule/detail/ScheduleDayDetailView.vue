<template>
  <a-flex class="space" gap="small">
    <a-row class="container">
      <DayAttractionViewForRead :dayResponse="dayResponse"
                                :slide="currentSlide"
                                @moveMaker="moveMaker"/>
    </a-row>
    <MapView :attractionForRead="attractionForRead"/>
  </a-flex>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router';
import MapView from "@/components/schedule/write/view/MapView.vue";
import axios from "axios";
import Api from "@/components/schedule/detail/api/api";
import DayAttractionViewForRead from "@/components/schedule/detail/DayAttractionViewForRead.vue";

const route = useRoute();
const dayResponse = ref();
const currentSlide = ref(0);
const attractionForRead = ref();

const moveMaker = (slide) => {
  currentSlide.value = slide;
  attractionForRead.value = dayResponse.value[currentSlide.value];
  console.log("movemovemovemove ", attractionForRead.value);
}

onMounted(async () => {
  const id = route.params.id;
  await axios.get(Api.getScheduleDetailById(id))
      .then(response => {
        const data = response.data;
        console.log(data.dayResponses)
        dayResponse.value = JSON.parse(JSON.stringify(data.dayResponses));
        attractionForRead.value = dayResponse.value[currentSlide.value];
        console.log(dayResponse.value)
      })
      .catch(error => {
        // 요청이 실패했을 때의 동작
        console.error(error);
      });
});
</script>

<style scoped>

.space {
  height: 700px;
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.container {
  height: auto;
  width: 40%;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

/* 일정 만들기 버튼 커스텀 스타일 */
.custom-button {
  width: 100%; /* 버튼의 너비 설정 */
  height: 60px;
  background-color: #f8f1f1; /* 버튼의 배경색 설정 */
  color: #bd9def; /* 버튼의 텍스트 색상 설정 */
  border-color: #bd9def; /* 버튼의 테두리 색상 설정 */
}

</style>