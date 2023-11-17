<template>
  <div>
    <h1>일정 상세 페이지</h1>
    <p>일정 ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(null);

onMounted(() => {
  id.value = route.params.id;
});
</script>
