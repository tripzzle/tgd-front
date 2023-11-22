<template>
  <div class="card">
    <img :src="item?.imgUrl" alt="image"/>
    <div class="card-content">
      <h3>{{ item.title }}</h3>
    </div>
    <DeleteOutlined @click="deleteToList"/>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import {DeleteOutlined} from '@ant-design/icons-vue';

const props = defineProps(["item"]);

// 삭제 버튼 누르는 경우 상위 컴포넌트로 전파되는 이벤트 생성
const emit = defineEmits(["deleteToList"]);
const deleteToList = () => {
  console.log("DayAttractionDetail's deleteToList", props.item)
  emit("deleteToList", props.item);
}


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
