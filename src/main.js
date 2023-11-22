import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import '@fortawesome/fontawesome-free/css/all.css'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; //required if you're not going to override default slots

// import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.component("infinite-loading", InfiniteLoading);

// import express from 'express';
// import cors from 'cors';

// app.use(cors());

// app.listen(8080, () => {
//     console.log('서버가 8080 포트에서 실행 중입니다.');
// })

// app.use(createPinia())

app.use(Antd).use(router).mount('#app');
