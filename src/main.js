import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

window.Kakao.init('11389a519d3503553c8bb4725eaa7ab28db60509809');


const app = createApp(App)

// app.use(createPinia())
app.use(router)

app.use(Antd).mount('#app');
