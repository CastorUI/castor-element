import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入组件库
import datePicker from './../packages/index'
import './../packages/theme-default/src/datePicker.scss'

// 注册组件库
Vue.use(datePicker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')