import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import ElementUI from 'element-ui' // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css' // 2.2引入样式
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
