## 共享配置

### command 事件（命令）

command 代表一个可交互的命令或事件，包含两种情况：

- 显示的操作，如通用表格的行内操作，新增操作，上方右侧定制事件等
- 内置的命令，如可编辑表格的编辑命令，保存命令等。

#### Command Options

| 参数             | 说明                                   | 类型     | 可选值 | 默认值 |
| ---------------- | -------------------------------------- | -------- | ------ | ------ |
| text             | 显示文本                               | string   | —      | —      |
| command          | 绑定事件名称                           | string   | —      | —      |
| visibleValidator | 显示校验,返回 `true` 时可见            | function | —      | —      |
| disableValidator | 可用校验,返回 `true` 时禁用            | function | —      | —      |
| extendProps      | 扩展属性，详情见`extendProps 扩展属性` | object   | —      | —      |

### extendProps 扩展属性

配置样式相关的 ElementUI 属性，，采用驼峰命名，与`ElementUI`属性保持一致。

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
