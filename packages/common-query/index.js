import CommonQuery from './src/main';

CommonQuery.install = function (Vue) {
  Vue.component(CommonQuery.name, CommonQuery);
}

export default CommonQuery;