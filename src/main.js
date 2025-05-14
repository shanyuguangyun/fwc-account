import Vue from 'vue'
import App from './App.vue'
import "./assets/main.css";
import "./assets/customer-btn.scss";
import router from "./router/index.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./enums/filters.js"

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
