import CommonDesc from './src/main';

CommonDesc.install = function(Vue) {
  Vue.component(CommonDesc.name, CommonDesc);
};

export default CommonDesc;
