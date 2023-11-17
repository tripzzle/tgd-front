<script setup>
import NavBar from "@/components/common/NavBar.vue"
import { RouterView } from "vue-router";
</script>

<template>
  <div class="hi">
    <NavBar/>
  </div>
  <router-view/>
</template>

<style scoped>
.hi {
  background-color: #cb1818;
  margin-top: 70px;
  /* margin: 200px 140px; */
  /* padding: 40px 40px; */
}
</style>
