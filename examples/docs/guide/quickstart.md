## 快速上手

本节将介绍如何在项目中使用 Castor。

### 引入 Castor

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import CastorUI from 'castor-ui';
import App from './App.vue';

import 'castor-ui/lib/castor-ui.css';

Vue.use(Element, {
  locale,
  size: Cookies.get('size') | 'medium' // set element-ui default size
});
Vue.use(CastorUI);


new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

以上代码便完成了 Castor 的引入。需要注意的是，样式文件需要单独引入。

### 开始使用

至此，一个基于 Vue 和 Castor 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
