import Vue from 'vue';
import Router from 'vue-router';
import hljs from 'highlight.js';

import routes from './route.config';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes,
  // routes: [
  //   {
  //     path: '/',
  //     component: () => import('./views/home'),
  //   },
  // ],
});

router.afterEach((route) => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = {
    home: 'Castor - 网站快速成型工具',
    guide: '指南 | Castor',
    component: '组件 | Castor',
  };
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
});

export default router;
