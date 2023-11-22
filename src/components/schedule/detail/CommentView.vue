<template>
  <a-comment>
    <template #author><a>{{ comment?.writer?.nickname }}</a></template>
    <template #avatar>
      <a-avatar :src="comment?.writer?.imgUrl" alt="Han Solo"/>
    </template>
    <template #content>
      <p>
        {{ comment?.content }}
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs(comment.createdAt.split(".")[0].replace("T", " ")).fromNow() }}</span>
      </a-tooltip>
    </template>
  </a-comment>
  <a-button @click="handleDelete">
    <DeleteOutlined/>
  </a-button>
</template>

<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {DeleteOutlined} from '@ant-design/icons-vue';
import API from '@/components/schedule/detail/api/api'
import axios from "axios";

dayjs.extend(relativeTime);

const props = defineProps({
  comment: Object,
  scheduleId: Number,
});


const handleDelete = async () => {
  const token = localStorage.getItem("token");

  await axios.delete(API.deleteCommentById(props.scheduleId, props.comment.commentId),
      {
        headers: {
          'X-AUTH-TOKEN': token,
        }
      })
      .then(() => {
      }).catch((error) => {
        console.log(error);
        alert("본인의 댓글만 삭제 가능합니다.");
      });
}
</script>