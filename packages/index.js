import CommonTable from './common-table';
import ReportTable from './report-table';
import EditTable from './edit-table';
import CommonForm from './common-form';
import CommonQuery from './common-query';
import TreeEditTable from './tree-edit-table';

// 存储组件列表
const components = [
  CommonTable,
  ReportTable,
  EditTable,
  CommonForm,
  CommonQuery,
  TreeEditTable,
];

/**
 * 定义 install 方法，接收 Vue 作为参数。
 * 如果使用 use 注册插件，则所有的组件都将被注册
 */
const install = function(Vue, options) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  if (options) {
    Vue.prototype.$pageSizeList = options.pageSizeList
  }
  components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...components,
};
