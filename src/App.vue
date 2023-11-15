<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterLink :to="{ name: 'login' }">login</RouterLink> |
  <router-view />
</template>

<style scoped></style>
