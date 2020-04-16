// 导入组件，组件必须声明 name
import CommonTable from './src/main';

// 为组件提供 install 安装方法，供按需引入
CommonTable.install = function (Vue) {
  Vue.component(CommonTable.name, CommonTable);
}

// 默认导出组件
export default CommonTable;