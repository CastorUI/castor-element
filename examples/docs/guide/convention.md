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

- 组件中应用到的样式相关的`ElementUI`属性统一放在 `ExtendProps` 中，采用驼峰命名，与`ElementUI`属性保持一致。

  ```html
  <template>
    <ca-common-form
      :ref="form.formId"
      :operateType="form.operateType"
      :model="form.model"
      :commands="form.commands"
      :fields="formFields"
      :extendProps="form.extendProps"
    />
  </template>

  <script>
    export default {
      data() {
        return {
          optionsMap: {},
          form: {
            formId: 'editForm',
            operateType: 'add',
            model: {},
            commands: [],
            extendProps: {
              labelWidth: '110px',
              labelPosition: 'right',
            },
          },
        };
      },
      computed: {
        formFields() {
          return [];
        },
      },
    };
  </script>
  ```

- 自定义事件以`handle`前缀来命名，如`handleAdd`
- 每个可以显示的`command`都支持两种校验器：`disableValidator`和`visibleValidator`
  - `disableValidator` 返回 `true` 时禁用
  - `visibleValidator` 返回 `false` 时不可见
