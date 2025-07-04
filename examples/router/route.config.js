import navs from './nav.config';

const load = function(path) {
  return require(`../views/${path}.vue`).default;
};

const loadDocs = function(path, modulePath = '') {
  return require(`../docs/${modulePath}${path}.md`);
};

const registerComponentRoute = () => {
  const route = [];
  route.push({
    path: '/component',
    redirect: '/component/installation',
    component: load('component'),
    children: [],
  });
  navs.forEach((nav) => {
    if (nav.href) return;
    if (nav.groups) {
      nav.groups.forEach((group) => {
        group.list.forEach((item) => {
          addRoute(item, nav.code);
        });
      });
    } else if (nav.children) {
      nav.children.forEach((child) => {
        addRoute(child, nav.code);
      });
    } else {
      addRoute(nav);
    }
  });
  function addRoute(page, modulePath = '') {
    const component =
      page.path === '/changelog'
        ? load('changelog')
        : loadDocs(page.path, modulePath);
    const child = {
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
// / 指南
const guideRoute = {
  path: '/guide', // 指南
  redirect: '/guide/aim',
  component: load('guide'),
  children: [
    {
      path: 'aim', // 目标
      name: 'guide-aim',
      meta: {},
      component: load('aim'),
    },
    {
      path: 'design', // 适用场景
      name: 'guide-design',
      meta: {},
      component: load('design'),
    },
  ],
};
// / 首页
const indexRoute = {
  path: '/',
  meta: {},
  name: 'home',
  redirect: '/guide',
};

const route = registerComponentRoute().concat([guideRoute, indexRoute]);
export default route;
