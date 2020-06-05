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
    :elementProps="form.elementProps"
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
          user: [
            {
              value: 1,
              label: '张三',
            },
            {
              value: 2,
              label: '李四',
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
                    {
                      value: '112',
                      label: '江阴区',
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
            user: 1,
            user_type: 2,
            enabled: false,
            equipment: [],
            city: undefined,
            lazy_city: undefined,
            design_cost: undefined,
            create_date_range: undefined,
            remarks: undefined,
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
          elementProps: {
            labelWidth: '120px',
            labelPosition: 'right',
          },
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
            extendProps: {
              groupTitle: '1、基本信息',
            },
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
            extendProps: {
              options: this.optionsMap['user_role'],
            },
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
            extendProps: {
              groupTitle: '2、业务信息',
            },
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            extendProps: {
              options: this.optionsMap['user_type'],
            },
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            extendProps: {
              options: this.optionsMap['equipment'],
            },
          },
          {
            type: 'cascader',
            label: '所属区域',
            dataField: 'city',
            columnSpan: 2,
            extendProps: {
              options: this.optionsMap['city'],
            },
          },
          {
            type: 'cascader',
            label: '区域（lazy）',
            dataField: 'lazy_city',
            columnSpan: 2,
            elementProps: {
              props: {
                lazy: true,
                lazyLoad: this.handleCityLazyLoad,
              },
            },
          },
          {
            type: 'inputNumber',
            label: '设计成本',
            dataField: 'design_cost',
            columnSpan: 1,
            elementProps: {
              precision: 2,
              step: 5,
              min: 100,
              max: 1000,
            },
          },
          {
            type: 'dateRange',
            label: '创建日期区间',
            dataField: 'create_date_range',
            columnSpan: 2,
          },
          {
            type: 'textArea',
            label: '备注',
            dataField: 'remarks',
            columnSpan: 2,
          },
          {
            type: 'complexInput',
            label: '审核人',
            dataField: '',
            columnSpan: 1,
            visibleValidator: (model) => model.user && model.user_type,
            extendProps: {
              currentField: {
                dataField: 'user',
                options: this.optionsMap['user'],
              },
              appendField: {
                dataField: 'user_type',
                options: this.optionsMap['user_type'],
              },
            },
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
      handleCityLazyLoad(node, resolve) {
        console.log('handleCityLazyLoad,node:', node);
        setTimeout(() => {
          if (node.level === 0) {
            const nodes = this.optionsMap['city'].map((r) => {
              return {
                value: r.value,
                label: r.label,
                leaf: !r.children,
              };
            });
            resolve(nodes);
          } else if (node.level == 1) {
            const nodes = this.optionsMap['city']
              .filter((r) => r.value === node.value)[0]
              .children.map((r) => {
                return {
                  value: r.value,
                  label: r.label,
                  leaf: !r.children,
                };
              });
            resolve(nodes);
          } else if (node.level == 2) {
            const nodes = this.optionsMap['city']
              .filter((r) => r.value === node.parent.value)[0]
              .children.filter((r) => r.value === node.value)[0]
              .children.map((r) => {
                return {
                  value: r.value,
                  label: r.label,
                  leaf: !r.children,
                };
              });
            resolve(nodes);
          }
        }, 1000);
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
            user_role: [],
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
            extendProps: {
              groupTitle: '1、基本信息',
            },
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
            rules: [{ required: true, message: '不能为空' }],
            extendProps: {
              options: this.optionsMap['user_role'],
            },
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
            extendProps: {
              groupTitle: '2、业务信息',
            },
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            rules: [{ required: true, message: '不能为空' }],
            extendProps: {
              options: this.optionsMap['user_type'],
            },
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            rules: [{ required: true, message: '不能为空' }],
            extendProps: {
              options: this.optionsMap['equipment'],
            },
          },
          {
            type: 'cascader',
            label: '所属区域',
            dataField: 'city',
            columnSpan: 2,
            rules: [{ required: true, message: '不能为空' }],
            extendProps: {
              options: this.optionsMap['city'],
            },
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

### 查看状态

`查看状态`下所有控件字段为只读，且不显示操作按钮

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
          operateType: 'view',
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
            extendProps: {
              groupTitle: '1、基本信息',
            },
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
            extendProps: {
              options: this.optionsMap['user_role'],
            },
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
            extendProps: {
              groupTitle: '2、业务信息',
            },
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            extendProps: {
              options: this.optionsMap['user_type'],
            },
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            extendProps: {
              options: this.optionsMap['equipment'],
            },
          },
          {
            type: 'cascader',
            label: '所属区域',
            dataField: 'city',
            columnSpan: 2,
            extendProps: {
              options: this.optionsMap['city'],
            },
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

### 状态校验

所有的表单字段都支持 `visibleValidator` 和 `disableValidator`

:::demo 通过`visibleValidator` 和 `disableValidator`可以实现动态显示或动态控制。

```html
<template>
  <ca-common-form
    :ref="form.formId"
    :operateType="form.operateType"
    :model="form.model"
    :fields="formFields"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          anditor_id: [
            {
              value: 1,
              label: '张三',
            },
            {
              value: 2,
              label: '李四',
            },
          ],
        },
        form: {
          formId: 'editForm',
          operateType: 'edit',
          model: {
            anditor_id: undefined,
            audit_enabled: false,
          },
        },
      };
    },
    computed: {
      formFields() {
        return [
          {
            type: 'switch',
            label: '启用审核',
            dataField: 'audit_enabled',
            columnSpan: 1,
            disableValidator: (model) => model.anditor_id > 0,
          },
          {
            type: 'select',
            label: '审核人',
            dataField: 'anditor_id',
            columnSpan: 1,
            visibleValidator: (model) => model.audit_enabled,
            extendProps: {
              options: this.optionsMap['anditor_id'],
            },
          },
        ];
      },
    },
    methods: {},
  };
</script>
```

:::

### Attributes

| 参数             | 说明                                                                                                               | 类型    | 可选值        | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------- | ------------- | ------ |
| loading          | 是否显示 loading                                                                                                   | boolean | —             | false  |
| operateType      | 表单操作类型                                                                                                       | string  | add/edit/view | add    |
| model            | 数据源                                                                                                             | object  | —             | {}     |
| fields           | 查询字段集合,见 `Field Options`                                                                                    | array   | —             | []     |
| rowFieldsCount   | 每行显示字段数                                                                                                     | number  | —             | 2      |
| rowHeight        | 行高                                                                                                               | number  | —             | 36     |
| commands         | 命令集合，显示在表单底部 [详情](http://0.0.0.0:8085/#/component/sharing-config#command-shi-jian-ming-ling)         | array   | —             | []     |
| customCommands   | 定制命令集合，显示在表单顶部右侧 [详情](http://0.0.0.0:8085/#/component/sharing-config#command-shi-jian-ming-ling) | array   | —             | []     |
| customComponents | 定制组件集合                                                                                                       | array   | —             | []     |
| elementProps     | ElementUI 属性 [详情](http://0.0.0.0:8085/#/component/sharing-config#elementProps-kuo-zhan-shu-xing)               | object  | —             | {}     |

### Field Options

| 参数             | 说明                                                                                                 | 类型     | 可选值 | 默认值    |
| ---------------- | ---------------------------------------------------------------------------------------------------- | -------- | ------ | --------- |
| type             | 类型, 见 `Field Type Options`                                                                        | string   | —      | input     |
| model            | 表单数据源                                                                                           | object   | —      | {}        |
| label            | 标签                                                                                                 | string   | —      | 10        |
| dataField        | 绑定字段                                                                                             | string   | —      | 0         |
| columnSpan       | 字段所占列数                                                                                         | number   | —      | 1         |
| rules            | 字段校验规则                                                                                         | array    | -      | []        |
| visibleValidator | 可见性校验,返回 `true` 时可见                                                                        | function | —      | —         |
| disableValidator | 可用性校验,返回 `true` 时禁用                                                                        | function | —      | —         |
| elementProps     | ElementUI 属性 [详情](http://0.0.0.0:8085/#/component/sharing-config#elementProps-kuo-zhan-shu-xing) | string   | -      | ascending |
| extendProps      | 扩展属性 [详情](http://0.0.0.0:8085/#/component/common-table#column-extendprops-options)             | object   | -      | {}        |

### Field ExtendProps Options

| 参数         | 说明                                                                                    | 类型   | 可选值 | 默认值 |
| ------------ | --------------------------------------------------------------------------------------- | ------ | ------ | ------ |
| groupTitle   | 分组标题名称，只限于 `type` 为 `groupTitle`                                             | string | -      | —      |
| componentKey | 自定义组件名称，只限于 `type` 为 `custom`                                               | string | -      | —      |
| options      | 选项数据源,用于`type` 为 `select multiSelect groupedSelect radioGroup checkboxGroup text cascade` | array  | -      | []     |
| currentField   | 当前字段，只限于 `type` 为 `complexInput`                                             | object | -      | —      |
| appendField   | 附加字段，只限于 `type` 为 `complexInput`                                             | object | -      | —      |

### Field Type Options

| 类型          | 说明           |
| ------------- | -------------- |
| text          | 只读文本       |
| input         | 输入框         |
| autocomplete  | 自动填充输入框 |
| inputNumber   | 数字输入框     |
| textArea      | 多行文本       |
| select        | 下拉框         |
| multiSelect   | 多选下拉框     |
| groupedSelect | 分组选择下拉框 |
| cascader      | 级联选择器     |
| switch        | 开关           |
| radioGroup    | 单选框组       |
| checkboxGroup | 复选框组       |
| date          | 日期选择器     |
| dateRange     | 日期区间选择器 |
| dateTimeRange | 时间区间选择器 |
| hr            | 分行           |
| groupTitle    | 组标题         |
| complexInput  | 组合输入框     |
| custom        | 定制组件       |
