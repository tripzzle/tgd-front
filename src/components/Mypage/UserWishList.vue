<template>
  <div class="wishList">
    <div class="title">
      <h2>
        위시 리스트
      </h2>
    </div>
    <div class="buttons">
      <a-button class="custom-button">여행지</a-button>
      <span class="custom-button">|</span>
      <a-button class="custom-button">여행기록</a-button>
    </div>
  </div>
</template>

<style scoped>
.wishList {
  border: 2px solid #a385cf;
  border-radius: 5px;
  width: 500px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  text-align: center;
  flex-grow: 1;
}

.buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.custom-button {
  border: none !important;
  box-shadow: none !important;
  color: #a385cf ;
}
</style>
