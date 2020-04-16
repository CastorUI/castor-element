import CommonTable from './src/main';

CommonTable.install = function(Vue) {
  Vue.component(CommonTable.name, CommonTable);
};

export default CommonTable;
