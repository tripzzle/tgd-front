<script setup></script>

<template>
  <div>
    <a-row>
      <a-avatar class="profil" :size="144">
        <template #icon>
          <img src="@/assets/img/pxfuel.jpg" />
        </template>
      </a-avatar>
      <a-col class="profile-details">
        <a-col>
          <h3>닉네임 : 난밤이야 슈밤</h3>
          <h3>이름 : 전승열</h3>
        </a-col>
        <a-col>
          <a-button class="profil-btn" size="small">수정</a-button>
          <a-button class="profil-btn" size="small">퍼즐보기</a-button>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
h3 {
  margin-top: 20px;
}
.profil {
  margin-right: 80px;
  border: 2px solid black; /* Add border */
}
.profile-details {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.profil-btn {
  margin-top: 20px;
  margin-right: 10px;
  border: 1px solid #a385cf !important;
  color: #a385cf;
  box-shadow: none !important;
}
</style>
