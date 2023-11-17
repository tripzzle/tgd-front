import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import '@fortawesome/fontawesome-free/css/all.css'

// import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


const app = createApp(App)

// app.use(createPinia())

app.use(Antd).use(router).mount('#app');
