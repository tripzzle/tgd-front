<script setup>
</script>

<template>
  <div>
    <a-row>
      <a-avatar class="profil" :size="144">
        <template #icon>
          <img src="@/assets/img/pxfuel.jpg">
        </template>
      </a-avatar>
      <a-col>
        <a-col>
          <h3>닉네임 : 난밤이야 슈밤</h3>
          <h3>이름 : 전승열</h3>
        </a-col>
        <a-button class="progil-btn">수정</a-button>
        <a-button class="progil-btn">퍼즐보기</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
h3{
  margin-top: 20px;
}
.profil{
  margin-right: 80px;
}

.progil-btn{
  margin-right:10px;
}

</style>
