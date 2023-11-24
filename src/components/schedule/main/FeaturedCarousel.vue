<template>
  <div class="container">
    <a-carousel autoplay>
      <img src="@/assets/img/main1.jpg" alt="">
      <img src="@/assets/img/main2.jpg" alt="">
      <img src="@/assets/img/main3.jpg" alt="">
      <img src="@/assets/img/main4.jpg" alt="">
    </a-carousel>
    <a-input-search class="search-bar" placeholder="검색어를 입력하세요" @search="onSearch"/>
  </div>
</template>
<script>
export default {
  name: 'MainCarousel'
}
</script>
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

.container {
  position: relative;
}

.search-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
}
</style>