import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import CastorUI from './../packages/index';

import './../node_modules/highlight.js/styles/color-brewer.css';
import './assets/styles/index.scss';

import App from './App.vue';
import router from './router';
import MainHeader from './components/header';
import MainFooter from './components/footer';
import SideNav from './components/side-nav';
import demoBlock from './components/demo-block';

// 注册组件库
Vue.use(ElementUI, { locale, size: 'medium' });
Vue.use(CastorUI);
Vue.config.productionTip = false;

Vue.component('main-header', MainHeader);
Vue.component('main-footer', MainFooter);
Vue.component('side-nav', SideNav);
Vue.component('demo-block', demoBlock);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
