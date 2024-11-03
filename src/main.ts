import './assets/main.less'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hostipal_buttom/index.vue'
import Login from '@/components/login/index.vue'
import ElementPlus from 'element-plus'
import pinia from '@/store'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
