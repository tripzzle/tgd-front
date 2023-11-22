<script setup>
import router from "@/router";

const server = import.meta.env.VITE_SERVER;
import {onMounted, ref} from 'vue';
import {user} from "@/stores/store";
import axios from "axios";

const userInfo = ref({});
const nickname = ref();
const birth = ref();
const gender = ref();


// 사진 업로드 관련
const fileList = ref(null);
const handleFileUpload = (event) => {
  fileList.value = event.target.files[0];
};

// 유저 성별 리턴
function sex() {
  return userInfo.value.sex ? "여성" : "남성";
}

// 모달 관련
const isModalVisible = ref(false);  // 모달창이 보이는지 여부를 관리하는 데이터
function showModal() {  // '정보 수정' 버튼을 누르면 모달창이 나타나는 메소드
  isModalVisible.value = true;
}

const handleOk = () => {  // '변경' 버튼을 누르면 모달창이 사라지고 'update' 이벤트를 발생시킴
  isModalVisible.value = false;
  userUpdate();
};

function handleCancel() {  // '취소' 버튼을 누르면 모달창이 사라지는 메소드
  isModalVisible.value = false;
}

// 유저정보 갱신
const userUpdate = async () => {

  let formData = new FormData();

  // 프로필 이미지 formData에 추가
  if (fileList.value) {
    formData.append('file', fileList.value);
    userInfo.value.imgUrl = null;
  }

  userInfo.value.nickname = nickname.value;
  userInfo.value.birth = birth.value;
  userInfo.value.sex = gender.value;

  formData.append('patch', new Blob([JSON.stringify(userInfo.value)], {type: 'application/json'}));

  const token = localStorage.getItem("token");
  await axios.patch(`${server}/api/user/userupdate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': token
        }
      }
  )
      .then(response => {
        userInfo.value = JSON.stringify(response.data);
      })
      .catch(error => {
        // 요청이 실패했을 때의 동작
        console.error(error);
      });
}

const userDelete = async () => {

  let formData = new FormData();

  formData.append('delete', new Blob([JSON.stringify(userInfo.value)], {type: 'application/json'}));

  const token = localStorage.getItem("token");
  await axios.patch(`${server}/api/user/userdelete`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': token
        }
      }
  )
      .then(()=>{
        user.isLogin = false;
        localStorage.removeItem("token");
        router.push({
          name:"main"
        })
      })
      .catch(error => {
        // 요청이 실패했을 때의 동작
        console.error(error);
      });
}

onMounted(async () => {
  if (user.token) {
    try {
      const response = await axios.get(`${server}/api/user/mypage`, {
        headers: {
          'X-AUTH-TOKEN': user.token
        }
      });
      userInfo.value = response.data; // userInfo 값을 업데이트+
      console.log(userInfo.value);

    } catch (error) {
      console.log("!!! : ", error);
    }
  }
});
</script>

<template>
  <div>
    <a-row>
      <a-avatar class="profil" :size="144">
        <template #icon>
          <img :src="userInfo.imgUrl"/>
        </template>
      </a-avatar>
      <a-col class="profile-details">
        <a-col>
          <h3>닉네임 : {{ userInfo.nickname }}</h3>
          <h3>이름 : {{ userInfo.name }}</h3>
          <h3>생년 월일 : {{ userInfo.birth }}</h3>
          <h3>성별 : {{ sex() }}</h3>
        </a-col>
        <a-col>
          <a-button class="profil-btn" size="small" @click="showModal">수정</a-button>
          <a-modal class="ant-modal-body" title="정보 수정" v-model:open="isModalVisible" ok-text="변경" cancel-text="취소"
                   @ok="handleOk" @cancel="handleCancel">
            <a-form>
              <a-form-item label="이름">
                <a-input :value="userInfo.name" disabled/>
              </a-form-item>
              <a-form-item label="닉네임">
                <a-input v-model:value="nickname" />
              </a-form-item>
              <a-form-item label="생년월일">
                <a-date-picker v-model:value="birth"/>
              </a-form-item>
              <a-form-item label="성별">
                <a-radio-group v-model:value="gender" >
                  <a-radio :value="true">남</a-radio>
                  <a-radio :value="false">여</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="프로필 이미지" @click="log">
                <input type="file" id="upload-image" v-on:change="handleFileUpload"/>
              </a-form-item>
            </a-form>
          </a-modal>
          <a-button class="profil-btn" size="small">퍼즐보기</a-button>
          <a-button danger size="small" @click="userDelete">회원 탈퇴</a-button>

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

.ant-modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
