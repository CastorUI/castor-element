## CommonForm 通用表单

### 基础

展示通用表单基础功能的用法。

:::demo `operateType`用于区分表单的各种操作类型；`model`用于绑定数据；`commands`用于配置表单事件，默认放置在表单右下角位置,若`operateType`为`view`则不显示；`fields`用于配置表单字段；

```html
<template>
  <ca-common-form
    :ref="form.formId"
    :operateType="form.operateType"
    :model="form.model"
    :commands="form.commands"
    :fields="formFields"
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
          model: {
            code: undefined,
            en_name: undefined,
            cn_name: undefined,
          },
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
      handleCancel() {
        console.log('handleCancel,model:', this.form.model);
      },
      handleSave() {
        console.log('handleSave,model:', this.form.model);
      },
    },
  };
</script>
```

:::

### 字段固定默认值

展示字段默认值的用法。

:::demo 直接为`model`的各个字段赋值即可。

```html
<template>
  <ca-common-form
    :ref="form.formId"
    :operateType="form.operateType"
    :model="form.model"
    :commands="form.commands"
    :fields="formFields"
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
          model: {
            code: '1001',
            en_name: undefined,
            cn_name: undefined,
          },
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
      handleCancel() {
        console.log('handleCancel,model:', this.form.model);
      },
      handleSave() {
        console.log('handleSave,model:', this.form.model);
      },
    },
  };
</script>
```

:::

### 字段动态默认值

展示字段动态默认值的用法。

:::demo 有时字段的默认值不是固定的，而是在异步操作后才会赋值，这时为`model`属性的字段动态赋值即可。

```html
<template>
  <ca-common-form
    :ref="form.formId"
    :operateType="form.operateType"
    :model="form.model"
    :commands="form.commands"
    :fields="formFields"
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
          model: {
            code: '1001',
            en_name: undefined,
            cn_name: undefined,
          },
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
    created() {
      console.log('created');
      setTimeout(() => {
        this.form.model.cn_name = '张三';
      }, 2000);
    },
    methods: {
      handleCancel() {
        console.log('handleCancel,model:', this.form.model);
      },
      handleSave() {
        console.log('handleSave,model:', this.form.model);
      },
    },
  };
</script>
```

:::

### 字段校验

展示字段校验的用法。

:::demo

```html
<template>
  <ca-common-form
    :ref="form.formId"
    :operateType="form.operateType"
    :model="form.model"
    :commands="form.commands"
    :fields="formFields"
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
          model: {
            code: undefined,
            en_name: undefined,
            cn_name: undefined,
          },
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
            rules: [{ required: true, message: '编号不能为空' }],
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
      handleCancel() {
        console.log('handleCancel,model:', this.form.model);
      },
      handleSave() {
        console.log('handleSave,model:', this.form.model);
        this.$refs['editForm'].$refs['form'].validate((valid) => {
          console.log('校验结果，', valid);
        });
      },
    },
  };
</script>
```

:::
