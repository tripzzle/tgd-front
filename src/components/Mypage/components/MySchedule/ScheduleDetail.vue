<script setup>
import {defineProps} from "vue";

const props = defineProps(["schedule"]);

</script>

<template>
  <div class="wishList">
    {{schedule.title}}
  </div>
</template>

<style scoped>
.wishList {
  border: 2px solid #a385cf;
  border-radius: 5px;
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 40px;
  box-shadow: 2px 2px 5px 3px rgba(0,0,0,0.1);
}
</style>
