<script setup>
import CardList from "@/components/schedule/main/ScheduleCardList.vue";
import MainCarousel from "@/components/schedule/main/FeaturedCarousel.vue";
</script>

<template>
  <MainCarousel/>
  <div class="hi">
    <CardList/>
  </div>
</template>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}

.hi {
  background-color: #fffdfd;
  /* margin: 200px 140px; */
  /* padding: 40px 40px; */
}

</style>
