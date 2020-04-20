import Vue from 'vue';
import Router from 'vue-router';

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

export default router;
