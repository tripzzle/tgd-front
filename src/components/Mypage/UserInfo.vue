<script setup>
import {defineProps, ref} from 'vue';

const props = defineProps({
  userName: {
    type: String,
    default: ''
  },
  userNickName: {
    type: String,
    default: ''
  },
  userImg: {
    type: String,
    default: ''
  },
  userSex: {
    type: String,
    default: true
  },
  userBirth:{
    type: Date,
    default: ''
  }
});

const userInfo = ref({ ...props });

const fileList = ref(null);
const handleFileUpload = (event) => {
  fileList.value = event.target.files[0];
};

function sex() {
  console.log("성별" + userInfo.userSex)
  return userInfo.userSex ?  "여성" : "남성";
}

const isModalVisible = ref(false);  // 모달창이 보이는지 여부를 관리하는 데이터

function showModal() {  // '정보 수정' 버튼을 누르면 모달창이 나타나는 메소드
  isModalVisible.value = true;
}

const emit = defineEmits(['update']);

const handleOk = () => {  // '변경' 버튼을 누르면 모달창이 사라지고 'update' 이벤트를 발생시킴
  isModalVisible.value = false;
  console.log("유저 바꾸자!!" + userInfo.value)
  emit('update', userInfo, fileList);
};

function handleCancel() {  // '취소' 버튼을 누르면 모달창이 사라지는 메소드
  isModalVisible.value = false;
}
</script>

<template>
  <div>
    <a-row>
      <a-avatar class="profil" :size="144">
        <template #icon>
          <img :src="userImg"/>
        </template>
      </a-avatar>
      <a-col class="profile-details">
        <a-col>
          <h3>닉네임 : {{ userInfo.userNickName }}</h3>
          <h3>이름 : {{ userInfo.userName }}</h3>
          <h3>생년 월일 : {{  userInfo.userBirth }}</h3>
          <h3>성별 : {{ sex() }}</h3>
        </a-col>
        <a-col>
          <a-button class="profil-btn" size="small" @click="showModal">수정</a-button>
          <a-modal class="ant-modal-body" title="정보 수정" v-model:visible="isModalVisible" ok-text="변경" cancel-text="취소" @ok="handleOk" @cancel="handleCancel">
            <a-form>
              <a-form-item label="이름">
                <a-input :value="userInfo.userName" disabled/>
              </a-form-item>
              <a-form-item label="닉네임">
                <a-input v-model:value="userInfo.userNickName"/>
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
          </a-modal>
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

.ant-modal-body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
