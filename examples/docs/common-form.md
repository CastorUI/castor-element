## CommonForm 通用表单

### 基础表单

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
        optionsMap: {
          user_role: [
            {
              value: 1,
              label: '供应商',
            },
            {
              value: 2,
              label: '经销商',
            },
            {
              value: 3,
              label: '用户',
            },
            {
              value: 4,
              label: '管理员',
            },
          ],
          user_type: [
            {
              value: 1,
              label: '供应商',
            },
            {
              value: 2,
              label: '经销商',
            },
          ],
          equipment: [
            {
              label: '双压记录仪',
              disabled: false,
            },
            {
              label: '压力远传处理仪',
              disabled: false,
            },
          ],
          city: [
            {
              value: '1',
              label: '江苏',
              children: [
                {
                  value: '11',
                  label: '南京市',
                  children: [
                    {
                      value: '111',
                      label: '江宁区',
                    },
                  ],
                },
                {
                  value: '12',
                  label: '苏州市',
                },
              ],
            },
            { value: '2', label: '上海' },
            { value: '3', label: '浙江' },
            { value: '4', label: '河南' },
          ],
        },
        form: {
          formId: 'editForm',
          operateType: 'add',
          model: {
            code: '1001',
            en_name: undefined,
            cn_name: undefined,
            valid_end_date: undefined,
            user_type: undefined,
            enabled: false,
            equipment: [],
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
            type: 'groupTitle',
            label: '',
            dataField: '',
            columnSpan: 2,
            groupTitle: '1、基本信息',
          },
          {
            type: 'text',
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
          {
            type: 'date',
            label: '有效期',
            dataField: 'valid_end_date',
            columnSpan: 1,
          },
          {
            type: 'multiSelect',
            label: '角色',
            dataField: 'user_role',
            columnSpan: 1,
            options: this.optionsMap['user_role'],
          },
          {
            type: 'switch',
            label: '是否启用',
            dataField: 'enabled',
            columnSpan: 1,
          },
          {
            type: 'groupTitle',
            label: '',
            dataField: '',
            columnSpan: 2,
            groupTitle: '2、业务信息',
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            options: this.optionsMap['user_type'],
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            options: this.optionsMap['equipment'],
          },
          {
            type: 'cascader',
            label: '所属区域',
            dataField: 'city',
            columnSpan: 2,
            options: this.optionsMap['city'],
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

### 表单校验

展示表单校验的用法。

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
        optionsMap: {
          user_role: [
            {
              value: 1,
              label: '供应商',
            },
            {
              value: 2,
              label: '经销商',
            },
            {
              value: 3,
              label: '用户',
            },
            {
              value: 4,
              label: '管理员',
            },
          ],
          user_type: [
            {
              value: 1,
              label: '供应商',
            },
            {
              value: 2,
              label: '经销商',
            },
          ],
          equipment: [
            {
              label: '双压记录仪',
              disabled: false,
            },
            {
              label: '压力远传处理仪',
              disabled: false,
            },
          ],
          city: [
            {
              value: '1',
              label: '江苏',
              children: [
                {
                  value: '11',
                  label: '南京市',
                  children: [
                    {
                      value: '111',
                      label: '江宁区',
                    },
                  ],
                },
                {
                  value: '12',
                  label: '苏州市',
                },
              ],
            },
            { value: '2', label: '上海' },
            { value: '3', label: '浙江' },
            { value: '4', label: '河南' },
          ],
        },
        form: {
          formId: 'editForm',
          operateType: 'add',
          model: {
            code: '1001',
            en_name: undefined,
            cn_name: undefined,
            valid_end_date: undefined,
            user_type: undefined,
            enabled: false,
            equipment: [],
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
            type: 'groupTitle',
            label: '',
            dataField: '',
            columnSpan: 2,
            groupTitle: '1、基本信息',
          },
          {
            type: 'text',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
          },
          {
            type: 'input',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            rules: [{ required: true, message: '不能为空' }],
          },
          {
            type: 'input',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
            rules: [{ required: true, message: '不能为空' }],
          },
          {
            type: 'date',
            label: '有效期',
            dataField: 'valid_end_date',
            columnSpan: 1,
            rules: [{ required: true, message: '不能为空' }],
          },
          {
            type: 'multiSelect',
            label: '角色',
            dataField: 'user_role',
            columnSpan: 1,
            options: this.optionsMap['user_role'],
            rules: [{ required: true, message: '不能为空' }],
          },
          {
            type: 'switch',
            label: '是否启用',
            dataField: 'enabled',
            columnSpan: 1,
          },
          {
            type: 'groupTitle',
            label: '',
            dataField: '',
            columnSpan: 2,
            groupTitle: '2、业务信息',
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            options: this.optionsMap['user_type'],
            rules: [{ required: true, message: '不能为空' }],
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            options: this.optionsMap['equipment'],
            rules: [{ required: true, message: '不能为空' }],
          },
          {
            type: 'cascader',
            label: '所属区域',
            dataField: 'city',
            columnSpan: 2,
            options: this.optionsMap['city'],
            rules: [{ required: true, message: '不能为空' }],
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
