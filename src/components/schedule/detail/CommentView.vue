<template>
  <a-comment>
    <template #author><a>{{ comment?.writer?.nickname }}</a></template>
    <template #avatar>
      <a-avatar :src="comment?.writer.imgUrl" alt="Han Solo"/>
    </template>
    <template #content>
      <p>
        {{comment?.content}}
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
        {{}}
        <span>{{ dayjs(comment.createdAt.split(".")[0].replace("T", " ")).fromNow() }}</span>
      </a-tooltip>
    </template>
  </a-comment>
</template>

<script setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const props = defineProps({
  comment : Object,
});
</script>