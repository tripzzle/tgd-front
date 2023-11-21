<script setup>
import {ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
const server = import.meta.env.VITE_SERVER;

const route = useRoute();
const router = useRouter();

const userInfo = ref(JSON.parse(route.query.userInfo));
const keys = Object.keys(userInfo.value);

//쿠키에 있는 토큰값 가져오고 디코딩
const getCookie = (key) => {
//쿠키는 한번에 모두 불러와지기 때문에 사용할때 ';'나눠서 선택적으로 가져와야한다.
  const cookies = document.cookie.split(`; `).map((el) => el.split('='));
  let getItem = [];

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i][0] === key) {
      getItem.push(cookies[i][1]);
      break;
    }
  }

  if (getItem.length > 0) {
    return getItem[0];
  }
};

//파일 업로드
const fileList = ref(null);
const handleFileUpload = (event) => {
  fileList.value = event.target.files[0];
};
const signup = async () => {
  let token = getCookie("Authorization");
  // 파일 첨부
  let formData = new FormData();

// 프로필 이미지 formData에 추가
  formData.append('file', fileList.value);
  formData.append('userInfo', JSON.stringify(userInfo.value));

  await axios.post(`${server}/api/user/signup`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': token
        },
      }
  )
      .then(response => {
        const newToken = response.data;
        document.cookie = `Authorization=${newToken}`;
        router.push({name: "main"})
      })
      .catch(error => {
        // 요청이 실패했을 때의 동작
        console.error(error);
      });
}

</script>

<template>
  <div class="container">
    <div class="schedule">
      <a-form>
        <a-form-item label="이름">
          <a-input :value="userInfo.name" disabled/>
        </a-form-item>
        <a-form-item label="이메일">
          <a-input :value="userInfo.email" disabled/>
        </a-form-item>
        <a-form-item label="닉네임">
          <a-input v-model:value="userInfo.nickName"/>
        </a-form-item>
        <a-form-item label="생년월일">
          <a-date-picker v-model:value="userInfo.birth"/>
        </a-form-item>
        <a-form-item label="성별">
          <a-radio-group v-model:value="userInfo.sex">
            <a-radio :value="true">남</a-radio>
            <a-radio :value="false">여</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="프로필 이미지" @click="log">
          <input type="file" id="upload-image" v-on:change="handleFileUpload"/>
        </a-form-item>
      </a-form>
    </div>
  </div>
  <div class="submit-button">
    <a-button type="primary" size="large" @click="signup">회원가입</a-button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin-top: 100px;
}

.schedule {
  border: 2px solid #a385cf;
  border-radius: 5px;
  width: 500px;
  height: 440px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.13);
  background-color: #fffdfd;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 30px;
}

.submit-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
