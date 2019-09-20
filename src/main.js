import './styles/index.css';

import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false //阻止你显示显示生产模式的消息

new Vue({
  render: h => h(App)
}).$mount('#app')