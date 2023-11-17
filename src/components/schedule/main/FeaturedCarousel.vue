<template>
  <div class="container">
    <a-carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
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