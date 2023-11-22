<template>
  <a-divider/>
  <a-divider/>

  <div class="components-page-header-demo-content">
    <a-page-header
        :title="schedule?.title"
        class="site-page-header"
        :avatar="{ src: `${schedule?.user?.imgUrl}`}"
        :breadcrumb="{ routes }"
        @back="() => null"
    >
      <template #tags>
        <div v-if="schedule?.viewYn">
          <LockOutlined/>
        </div>
        <div v-if="!schedule?.viewYn">
          <UnlockOutlined/>
        </div>
      </template>
      <a-row class="content">
        <div style="flex: 1">
          <p>
            {{ schedule?.content }}
          </p>
          <div>
          </div>
        </div>
        <a-card hoverable style="width: 240px">
          <template #cover>
            <img alt="example" :src="schedule?.imgUrl"/>
          </template>
          <a-card-meta title="Europe Street beat">
            <template #description>www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </a-row>
      <a-button @click="handleButtonClick">상세 일정 보기</a-button>
      <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-left: 10px"/>
            {{ text }} <span></span>
          </span>
      <h2> 댓글 </h2>
      <a-divider/>

      <a-list v-if="comments.length"
              :data-source="comments"
              item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item :key="item.commentId">
            <CommentView :comment="item" :schedule-id="schedule?.scheduleId"/>
          </a-list-item>
        </template>
      </a-list>

      <a-comment>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="value" :rows="4"/>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
              댓글 달기
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </a-page-header>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import API from '@/components/schedule/detail/api/api'
import axios from "axios";
import {useRoute, useRouter} from 'vue-router';
import CommentView from "@/components/schedule/detail/CommentView.vue";
import {StarOutlined, LikeOutlined, MessageOutlined, LockOutlined, UnlockOutlined} from '@ant-design/icons-vue';

const id = ref(null);
const schedule = ref();
const dayResponse = ref([]);
const startDate = ref();
const endDate = ref();
const router = useRouter();
const route = useRoute();
const comments = ref([]);
const commentsLength = ref();
const submitting = ref(false);
const value = ref('');
const likeCount = ref();
const wishCount = ref();

watch(comments, () => {
  commentsLength.value = comments.value.length;
})

const actions = ref([
  {
    icon: StarOutlined,
    text: wishCount.value ? wishCount.value : 0,
  },
  {
    icon: LikeOutlined,
    text: likeCount.value ? likeCount.value : 0,
  },
  {
    icon: MessageOutlined,
    text: commentsLength
  },
]);

const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  const token = localStorage.getItem("token");
  if (token == null) {
    router.push({
      name: 'login'
    })
    return;
  }

  console.log("댓글 제출 전", id);
  submitting.value = true;
  axios.post(
      API.postCommentsByScheduleId(id.value),
      {content: value.value}, {
        headers: {
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': token,
        }
      }
  );

  value.value = '';
  setTimeout(() => {
    submitting.value = false;
    getComments();
  }, 300);
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
      await getComments();

    });

const getComments = async () => {
  await axios.get(API.getCommentsByScheduleId(id.value))
      .then((response) => {
        let {data} = response;
        console.log("댓글 ", data);
        comments.value = data
      }).catch((error) => {
        console.log(error);
      });
}
</script>
