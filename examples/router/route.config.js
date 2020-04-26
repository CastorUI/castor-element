import navs from './nav.config';

const load = function(path) {
  return require(`../views/${path}.vue`).default;
};

const loadDocs = function(path) {
  return require(`../docs${path}.md`);
};

const registerRoute = () => {
  let route = [];
  route.push({
    path: `/component`,
    redirect: `/component/installation`,
    component: load('component'),
    children: [],
  });
  navs.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((nav) => {
          addRoute(nav);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((nav) => {
        addRoute(nav);
      });
    } else {
      addRoute(nav);
    }
  });
  function addRoute(page) {
    const component =
      page.path === '/changelog' ? load('changelog') : loadDocs(page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component,
    };

    route[0].children.push(child);
  }

  return route;
};

let route = registerRoute();

const generateMiscRoutes = function() {
  let guideRoute = {
    path: `/guide`, // 指南
    redirect: `/guide/design`,
    component: load('guide'),
    children: [
      {
        path: 'design', // 设计原则
        name: 'guide-design',
        meta: {},
        component: load('design'),
      },
      {
        path: 'nav', // 导航
        name: 'guide-nav',
        meta: {},
        component: load('nav'),
      },
    ],
  };

  let indexRoute = {
    path: `/`, // 首页
    meta: {},
    name: 'home',
    component: load('home'),
  };

  return [guideRoute, indexRoute];
};
route = route.concat(generateMiscRoutes());
// route = route.concat([
//   // 首页
//   {
//     path: '/',
//     meta: {},
//     name: 'home',
//     redirect: '/component',
//   },
// ]);

export default route;
