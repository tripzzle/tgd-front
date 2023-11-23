<template>
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
        <a-col>
          <a-image :src="schedule?.imgUrl" alt=""/>
          <div style="flex: 1">
            <p>
              {{ schedule?.content }}
            </p>
            <div>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-button @click="handleButtonClick">상세 일정 보기</a-button>
      <a-row align="center">
        <a-space size="large">
          <a-button @click="handleLike">
            <LikeOutlined/>
            {{ likeCount }}
          </a-button>
          <a-button @click="handleWish">
            <StarFilled/>
            {{ wishCount }}
          </a-button>
        </a-space>
      </a-row>
      <h2>
        <MessageOutlined/>
        {{ commentsLength }}
      </h2>
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
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  LockOutlined,
  UnlockOutlined,
  StarFilled
} from '@ant-design/icons-vue';

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

const handleLike = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요한 서비스입니다.");
    return;
  }

  await axios.post(API.postLikeByScheduleId(id.value), {},
      {
        headers: {
          'X-AUTH-TOKEN': token,
        }
      }).then(() => {
    likeCount.value += 1;
  }).catch(error => {
    // 요청이 실패했을 때의 동작
    console.error(error);
  });
}

const handleWish = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요한 서비스입니다.");
    return;
  }

  await axios.post(API.postWishByScheduleId(id.value), {},
      {
        headers: {
          'X-AUTH-TOKEN': token,
        }
      }).then(() => {
    wishCount.value += 1;
  }).catch(error => {
    // 요청이 실패했을 때의 동작
    console.error(error);
  });
}

watch(comments, () => {
  commentsLength.value = comments.value.length;
})

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
    name: 'dayDetail',
    params: {id: id.value},
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
        wishCount.value = data.wishCount;
        likeCount.value = data.likeCount;

        console.log("asf", likeCount.value)
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

<style scoped>
.components-page-header-demo-content {
  margin: 0px 300px;
}

</style>