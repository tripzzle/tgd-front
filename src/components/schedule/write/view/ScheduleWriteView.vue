<template>
  <a-flex class="space" gap="large">
    <AttractionView v-if="showAttractionView" @goBack="handleMoveDayAttractionView"
                    @add-to-list="handleAddAttraction"/>
    <DayAttractionView v-if="!showAttractionView" :slide="currentSlide" :days="days"
                       @moveAttractionView="handleMoveAttractionView"
                       @removeAttraction="handleRemoveAttraction" @delete-to-list="handleRemoveAttraction"/>
    <MapView :attraction="goToAttraction"/>
  </a-flex>
  <a-button type="default" @click="showDrawer" style="width: 100%">
    일정 만들기
  </a-button>
  <a-drawer
      title="추가 일정 정보를 입력하세요"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical" ref="formRef">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="제목" name="title">
            <a-input v-model:value="form.title" placeholder="제목을 입력하세요"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="소개" name="content">
            <a-textarea v-model:value="form.content" :rows="4" placeholder="소개를 작성해주세요"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="일정 이미지" name="image">
            <a-upload-dragger
                v-model:fileList="fileList"
                name="file"
                max-count="1"
            >
              <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
              </p>
              <p class="ant-upload-text">클릭하여 파일을 업로드하세요.</p>
              <p class="ant-upload-hint">
                하나의 파일만 업로드 가능합니다.
              </p>
            </a-upload-dragger>
          </a-form-item>
          <a-form-item label="공개여부" name="viewYn">
            <a-radio-group v-model:value="form.viewYn">
              <a-radio value="false">공개</a-radio>
              <a-radio value="true">비공개</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">취소</a-button>
        <a-button type="primary" @click="post">생성</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from 'vue-router';
import MapView from "@/components/schedule/write/view/MapView.vue";
import DayAttractionView from "@/components/schedule/write/view/DayAttractionView.vue";
import AttractionView from "@/components/schedule/write/view/AttractionView.vue";
import {message} from 'ant-design-vue';
import axios from "axios";
import router from "@/router";

const route = useRoute();
const startDate = ref('');
const endDate = ref('');
const dayAttractions = reactive([]);
let days = ref();
let showAttractionView = ref(false);
const currentSlide = ref(0);
const goToAttraction = ref();
const server = import.meta.env.VITE_SERVER;

const form = reactive({
  title: '',
  content: '',
  viewYn: '',
});
const rules = {
  title: [
    {
      required: true,
      message: '제목을 입력해주세요',
    },
  ],
  content: [
    {
      required: true,
      message: '일정 상세 내용을 입력해주세요',
    },
  ],
  viewYn: [
    {
      required: true,
      message: '공개여부를 선택해주세요',
    },
  ],
};
const open = ref(false);

// 파일 저장 객체
const fileList = ref(null);

// 관광지를 삭제하는 메서드, 현재 일자에 해당하는 동일한 관광지를 지워준다.
const handleRemoveAttraction = (attraction, currentSlide, index) => {
  console.log("remove in ScheduleWriteView", attraction, currentSlide,
      days.value[currentSlide], index);
  days.value[currentSlide].attractions.splice(index, 1);
}

const handleAddAttraction = (attraction) => {
  console.log("addToList in ScheduleWriteView", attraction, dayAttractions, "days", currentSlide.value, days.value[currentSlide.value]);
  days.value[currentSlide.value].attractions.push(attraction);
  goToAttraction.value = attraction;
  console.log(attraction.title, "send attraction from ScheduleWriteView");
}

const handleMoveAttractionView = (val) => {
  // currentSlide 값을 사용하여 작업을 수행합니다.
  console.log(val);
  currentSlide.value = val;
  showAttractionView.value = true;
};

const handleMoveDayAttractionView = () => {
  // currentSlide 값을 사용하여 작업을 수행합니다.
  console.log(days.value);
  showAttractionView.value = false;
};

const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};

// form 유효성 검사를 위한 객체
const formRef = ref(null);
const post = async () => {
  try {
    // form의 유효성 검사
    await formRef.value.validate();

    const token = localStorage.getItem("token");

    if (token == null) {
      await router.push({
        name: 'login'
      })
      return;
    }

    let formData = new FormData();
    let json = JSON.stringify(form);
    console.log("json", json);

    // 프로필 이미지 formData에 추가
    formData.append('image', fileList.value[0].originFileObj);

    // 일자에 있는 관광지, 메모들 form에 붙이기
    form.days = days.value.map(day => ({
      ...day,
      dayAttractions: day.attractions,
    }));
    console.log(days.value)

    // formData application/json 타입으로 붙이기
    formData.append('post', new Blob([JSON.stringify(form)], {type: 'application/json'}));

    console.log(formData);
    // 서버로 post요청
    await axios.post(`${server}/api/schedule`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-AUTH-TOKEN': token,
          },
        }
    )
        .then(response => {
          const parts = response.headers.get('location').split('/');
          const id = parts[parts.length - 1];
          console.log(id);
          router.push({name: 'scheduleDetail', params: {id: id}});
        })
        .catch(error => {
          // 요청이 실패했을 때의 동작
          console.error(error);
        });
  } catch (errors) {
    console.log(errors);
    message.error('모든 필드를 올바르게 입력해 주세요.');
  }
};


const generateDays = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let currentDate = startDate;
  const days = [];

  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days.map(day => ({date: day, attractions: [...dayAttractions]}));
};

const updateDatesFromQuery = () => {
  startDate.value = route.query.startDate;
  endDate.value = route.query.endDate;
  console.log(startDate.value, endDate.value);
  days.value = generateDays(startDate.value, endDate.value);
  console.log(days.value);
};

onMounted(updateDatesFromQuery);
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