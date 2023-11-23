<template>
  <a-flex class="space" gap="large">
    <DayAttractionView/>
    <MapView/>
  </a-flex>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from 'vue-router';
import MapView from "@/components/schedule/write/view/MapView.vue";
import DayAttractionView from "@/components/schedule/write/view/DayAttractionView.vue";
import axios from "axios";
import Api from "@/components/schedule/detail/api/api";

const route = useRoute();
const dayResponse = ref([]);

onMounted(async () => {
  const id = route.params.id;
  await axios.get(Api.getScheduleDetailById(id))
      .then(response => {
        const data = response.data;
        console.log(data.dayResponses)
        dayResponse.value = JSON.parse(JSON.stringify(data.dayResponses));
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
  margin: 60px 20px;
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

</style>