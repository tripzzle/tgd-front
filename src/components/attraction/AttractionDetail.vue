<!-- <template>
  <div class="card">
    <img :src="item.imgUrl" alt="image" />
    <h2>{{ item.title }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: Object,
});
</script>

<style scoped>
.card {
  /* 스타일을 여기에 작성합니다. */
}
</style> -->
<template>
  <div class="card">
    <img :src="item.imgUrl" alt="image" />
    <div class="card-content">
      <h3>{{ item.title }}</h3>
      <h6>{{ item.address }}</h6>
      <div class="button-box">
        <button class="icon-button heart">
          <i class="fas fa-heart"></i> <span>10000</span>
        </button>
        <button class="icon-button star">
          <i class="fas fa-star"></i> <span>10000</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: Object,
});
</script>

<style scoped>
.card {
  width: 100%;
  padding: 10px;
  background-color: #fffdfd;
  border: 5px solid #a385cf;
  box-shadow: 0px 0px 20px 0px grey;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;

  > img {
    border-radius: 20px;
  }

  .card-content {
    width: 60%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }
  .card-content h3 {
    margin-bottom: 25px;
    white-space: nowrap;
  }

  .card-content h6 {
    margin-bottom: 10px;
    white-space: nowrap;
  }
  .button-box {
    display: flex;
    flex-direction: row;
    button {
      margin-right: 10px;
    }
  }
}
.ant-btn {
  width: 60px;
  margin-right: 1rem;
}
img {
  width: 100px;
  height: 80px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 0.9rem;
  transition: color 0.3s;

  span {
    margin-left: 0.5rem;
  }
}

.icon-button.heart {
  color: red;
}

.icon-button.star {
  color: gold;
}
</style>
