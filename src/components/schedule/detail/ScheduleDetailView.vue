<template>
  <div>
    <p><img :src="schedule?.imgUrl" alt="이미지 없음"></p>
    <h1>일정 상세 페이지</h1>
    <p>일정 ID: {{ id }}</p>
    <p>제목 : {{ schedule?.title }}</p>
    <p>내용 : {{ schedule?.content }}</p>
    <p> 여행 일자 : {{ startDate }} ~ {{ endDate }}</p>
    <p> 성별 : {{ schedule?.user?.sex ? "여성" : "남성" }}</p>
    <p> 생일 : {{ schedule?.user?.birth }}</p>
    <p> 닉넴 : {{ schedule?.user?.nickname }}</p>
    <a-avatar :src="schedule?.user?.imgUrl"></a-avatar>
    <div v-for="item in dayResponse" :key="item.date">
      날짜 ID : {{ item.dayId }}
      날짜 : {{ item.date }}
    </div>
    <a-button @click="handleButtonClick">상세 일정 보기</a-button>
    <p> 댓글 </p>
    <p style="border: 1px solid"></p>
    <a-comment>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            댓글 달기
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
    <a-list
        v-if="comments.length"
        :data-source="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
        item-layout="horizontal"
    >
      <div v-for="comment in comments" :key="comment.commentId">
        <CommentView :comment="comment"/>
      </div>
    </a-list>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import API from '@/components/schedule/detail/api/api'
import axios from "axios";
import {useRoute, useRouter} from 'vue-router';
import CommentView from "@/components/schedule/detail/CommentView.vue";

const id = ref(null);
const schedule = ref();
const dayResponse = ref([]);
const startDate = ref();
const endDate = ref();
const router = useRouter();
const route = useRoute();
const comments = ref([]);
const submitting = ref(false);
const value = ref('');

const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;

  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: 'Han Solo',
        avatar: 'https://joeschmoe.io/api/v1/random',
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = '';
  }, 1000);
};
const handleButtonClick = () => {
  console.log("버튼 누름", dayResponse.value, startDate.value, endDate.value);

  router.push({
    name: 'schedule',
    params: {id: id.value},
    query: {startDate: startDate.value, endDate: endDate.value, type: true}
  });
}

onMounted(
    async () => {
      id.value = route.params.id;
      // 컴포넌트가 마운트될 때 서버로부터 데이터를 가져옴
      await axios.get(
          API.getScheduleDetailById(id.value)
      ).then((response) => {
        let {data} = response;
        console.log(data)
        schedule.value = data;
        dayResponse.value = data.dayResponses;
        console.log(dayResponse.value[0]);
        startDate.value = dayResponse.value[0]?.date;
        endDate.value = dayResponse.value[dayResponse.value.length - 1]?.date;
        console.log("dayResponse in ScheduleDetailView", dayResponse.value);
      });

      // 댓글 리스폰스
      await axios.get(API.getCommentsByScheduleId(id.value))
          .then((response) => {
            let {data} = response;
            console.log("댓글 ", data);
            comments.value = data
          }).catch((error) => {
            console.log(error);
          })
    });
</script>
