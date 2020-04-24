## CommonForm 通用表单

### 基础

展示通用表单的基础用法。

:::demo 当`ca-common-table`元素中注入`dataList`对象数组和`tableColumns`列数组后即可填入数据。在列数组中，`type`属性用来定义列类型，`label`属性用来定义列名，`dataField`属性用来定义数据字段，`columnSpan`属性用来定义列占用的宽度占比。

```html
<template>
  <ca-common-form
    :formId="form.formId"
    :ref="form.formId"
    :operateType="form.operateType"
    :fields="formFields"
    :dataSource="form.dataSource"
    :commands="form.commands"
    @handleCancel="handleCancel"
    @handleSave="handleSave"
  />
</template>

<script>
  export default {
    data() {
      return {
        form: {
          formId: 'editForm',
          operateType: 'add',
          dataSource: {},
          commands: [
            {
              text: '取消',
              command: 'handleCancel',
            },
            {
              text: '保存',
              command: 'handleSave',
            },
          ],
        },
      };
    },
    computed: {
      formFields() {
        return [
          {
            type: 'input',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
          },
          {
            type: 'input',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
          },
          {
            type: 'input',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
          },
        ];
      },
    },
    methods: {
      handleCancel(model) {
        this.form.visible = false;
        this.getList();
      },
      handleSave(model) {
        console.log('model', model);
        this.form.visible = false;
        this.getList();
      },
    },
  };
</script>
```

:::
