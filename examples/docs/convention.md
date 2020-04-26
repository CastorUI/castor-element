## 约定

- 构建一个基础页面，一般有三部分数据，分别放在 table、seach、form 三个对象中。

  ```javascript
  export default {
    data(){
      search:{},
      table:{},
      form:{}
    }
  }
  ```

- optionsMap 独立处理

  - optionsMap 有三个用途：
    - 查询组件的选择数据绑定
    - 表单组件的选择数据绑定
    - 表格组件的列数据转换

  ```javascript
  export default {
    data(){
      optionsMap:{},
    }
  }
  ```

- ElementUI 相关属性都放在 ExtendProps 中处理
- 自定义事件以`handle`前缀来命名，如`handleAdd`
