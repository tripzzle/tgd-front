<script setup>
import AttractionWishList from "@/components/Mypage/components/WishAttraction/AttractionWishList.vue";
import SchedulWishList from "@/components/Mypage/components/WishSchedule/SchedulWishList.vue";
import {ref} from "vue";

const wish = ref(false);

const handleAttractionClick = () => {
  wish.value = true;
};

const handleScheduleClick = () => {
  wish.value = false;
};
</script>

<template>
  <div class="wishList">
    <a-row>
      <div class="header">
        <h2>
          위시 리스트
        </h2>
        <div class="buttons">
          <a-button class="custom-button" @click="handleAttractionClick">여행지</a-button>
          <span class="custom-button">|</span>
          <a-button class="custom-button" @click="handleScheduleClick">여행기록</a-button>
        </div>
      </div>
      <a-col>
        <AttractionWishList v-if="wish" />
        <SchedulWishList v-else />
      </a-col>
    </a-row>
  </div>
</template>


<style scoped>
.wishList {
  border: 2px solid #a385cf;
  border-radius: 5px;
  width: 600px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.13);
  background-color: #fffdfd;

}


.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.buttons {
  display: flex;
  align-items: center;
}


.custom-button {
  border: none !important;
  box-shadow: none !important;
  color: #a385cf ;
}

h2{
  margin-left: 220px;
}
</style>
