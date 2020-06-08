## EditTable 可编辑表格

可编辑表格支持两种模式，手动触发和自动触发两种。手动触发模式需要手动点击编辑按钮才能触发，而自动触发则在点击行时即触发。

### 自动触发-基础

展示自动触发的基本效果。选中行进入到编辑状态，当前行失去焦点时恢复到原始状态。

:::demo `editTriggerMode`属性用于配置触发模式，`editCommand`属性用于配置行编辑事件，`saveCommand`用于配置行保存事件。

```html
<template>
  <ca-edit-table
    editTriggerMode="auto"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :editCommand="rowEditCommand"
    :saveCommand="rowSaveCommand"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          dataList: [
            {
              id: 1001,
              code: 'A1',
              en_name: 'Jack Li',
              cn_name: '李连杰',
              age: 30,
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              age: 30,
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              age: 30,
            },
          ],
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'default',
            label: 'ID',
            dataField: 'id',
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            editable: true,
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            editable: true,
          },
          {
            type: 'inputNumber',
            label: '年龄',
            dataField: 'age',
            editable: true,
            elementProps: {
              width: '140px',
            },
          },
        ];
      },
      rowEditCommand() {
        return {
          command: 'handleEdit',
        };
      },
      rowSaveCommand() {
        return {
          command: 'handleSave',
        };
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
      },
      handleSave(index, row) {
        console.log('handleSave,', index, row);
      },
    },
  };
</script>
```

:::

### 自动触发-校验

校验功能用于在保存前检查行数据。如果校验不通过，则当前行保持编辑状态，且控件显示错误提示。

:::demo 字段的校验规则配置在`tableColumns`计算属性的`rules`子属性中，所有字段的校验结果会同步到变量`validateStatus`中去。`saveCommand`属性对象和`editCommand`中都包括`statusValidator`子属性，用于配置校验方法，需要配套使用。

```html
<template>
  <ca-edit-table
    editTriggerMode="auto"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :validateStatus.sync="table.validateStatus"
    :editCommand="rowEditCommand"
    :saveCommand="rowSaveCommand"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          validateStatus: true,
          dataList: [
            {
              id: 1001,
              code: 'A1',
              en_name: 'Jack Li',
              cn_name: '李连杰',
              age: 30,
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              age: 30,
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              age: 30,
            },
          ],
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'default',
            label: 'ID',
            dataField: 'id',
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            editable: true,
          },
          {
            type: 'inputNumber',
            label: '年龄',
            dataField: 'age',
            editable: true,
            elementProps: {
              width: '140px',
            },
          },
        ];
      },
      rowEditCommand() {
        return {
          command: 'handleEdit',
          disableValidator: () => !this.table.validateStatus,
        };
      },
      rowSaveCommand() {
        return {
          command: 'handleSave',
          disableValidator: () => !this.table.validateStatus,
        };
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
      },
      handleSave(index, row) {
        console.log('handleSave,', index, row);
      },
    },
  };
</script>
```

:::

### 手动触发-基础

展示手动触发的基本效果。

:::demo 在操作列中，`commands`属性用于配置原始状态下的事件，`editableCommands`属性用于配置编辑状态下的事件。

```html
<template>
  <ca-edit-table
    editTriggerMode="manual"
    :dataSource="table.dataList"
    :columns="tableColumns"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
    @handleDelete="handleDelete"
    @handleCancel="handleCancel"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          dataList: [
            {
              id: 1001,
              code: 'A1',
              en_name: 'Jack Li',
              cn_name: '李连杰',
              age: 30,
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              age: 30,
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              age: 30,
            },
          ],
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'default',
            label: 'ID',
            dataField: 'id',
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            editable: true,
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            editable: true,
          },
          {
            type: 'inputNumber',
            label: '年龄',
            dataField: 'age',
            editable: true,
            elementProps: {
              width: '140px',
            },
          },
          {
            type: 'commands',
            label: '操作',
            dataField: '',
            extendProps: {
              commands: [
                {
                  text: '编辑',
                  command: 'handleEdit',
                  elementProps: {
                    type: 'primary',
                  },
                },
                {
                  text: '删除',
                  command: 'handleDelete',
                  elementProps: {
                    type: 'danger',
                  },
                },
              ],
              editableCommands: [
                {
                  text: '保存',
                  command: 'handleSave',
                  elementProps: {
                    type: 'primary',
                  },
                },
                {
                  text: '取消',
                  command: 'handleCancel',
                  elementProps: {
                    type: 'primary',
                  },
                },
              ],
            },
            elementProps: {
              fixed: 'right',
              width: '200px',
            },
          },
        ];
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
      },
      handleSave(index, row) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
      },
      handleCancel(index, row) {
        row.operateType = 'view';
        console.log('handleCancel,', index, row);
      },
      handleDelete(index, row) {
        console.log('handleDelete,', index, row);
      },
    },
  };
</script>
```

:::

### 手动触发-校验

校验功能用于在保存前检查行数据。如果校验不通过，则当前行保持编辑状态，且控件显示错误提示。

:::demo 字段的校验规则配置在`tableColumns`计算属性的`rules`子属性中，所有字段的校验结果会同步到变量`validateStatus`中去。在操作列中，`commands`属性用于配置原始状态下的事件，`editableCommands`属性用于配置编辑状态下的事件。每个事件可以使用`disableValidator`函数属性来控制可用性。

```html
<template>
  <ca-edit-table
    editTriggerMode="manual"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :validateStatus.sync="table.validateStatus"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
    @handleDelete="handleDelete"
    @handleCancel="handleCancel"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          validateStatus: true,
          dataList: [
            {
              id: 1001,
              code: 'A1',
              en_name: 'Jack Li',
              cn_name: '李连杰',
              age: 30,
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              age: 30,
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              age: 30,
            },
          ],
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'default',
            label: 'ID',
            dataField: 'id',
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            editable: true,
          },
          {
            type: 'inputNumber',
            label: '年龄',
            dataField: 'age',
            editable: true,
            elementProps: {
              width: '140px',
            },
          },
          {
            type: 'commands',
            label: '操作',
            dataField: '',
            editable: false,
            elementProps: {
              fixed: 'right',
              width: '200px',
            },
            extendProps: {
              commands: [
                {
                  text: '编辑',
                  command: 'handleEdit',
                  disableValidator: () => !this.table.validateStatus,
                  elementProps: {
                    type: 'primary',
                  },
                },
                {
                  text: '删除',
                  command: 'handleDelete',
                  disableValidator: () => !this.table.validateStatus,
                  elementProps: {
                    type: 'danger',
                  },
                },
              ],
              editableCommands: [
                {
                  text: '保存',
                  command: 'handleSave',
                  disableValidator: () => !this.table.validateStatus,
                  elementProps: {
                    type: 'primary',
                  },
                },
                {
                  text: '取消',
                  command: 'handleCancel',
                  disableValidator: () => !this.table.validateStatus,
                  elementProps: {
                    type: 'primary',
                  },
                },
              ],
            },
          },
        ];
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
      },
      handleSave(index, row) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
      },
      handleCancel(index, row) {
        row.operateType = 'view';
        console.log('handleCancel,', index, row);
      },
      handleDelete(index, row) {
        console.log('handleDelete,', index, row);
      },
    },
  };
</script>
```

:::

### 表格内部-新增

展示新增功能的用法。

:::demo 新增功能约定以链接的形式放在表格的左上角。`addText`属性来控制其是否显示，`handleAdd`方法用来响应新增事件。

```html
<template>
  <ca-edit-table
    editTriggerMode="auto"
    :addInside="table.addInside"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :addCommand="table.addCommand"
    :editCommand="rowEditCommand"
    :saveCommand="rowSaveCommand"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          dataList: [
            {
              id: 1001,
              code: 'A1',
              name: '上海燃气一期工程',
            },
            {
              id: 1002,
              code: 'A2',
              name: '上海燃气二期工程',
            },
            {
              id: 1003,
              code: 'A3',
              name: '上海燃气三期工程',
            },
          ],
          addInside: true,
          addCommand: {
            text: '新增任务',
            command: 'handleAdd',
            icon: 'el-icon-circle-plus-outline',
            visibleValidator: () => true,
            disableValidator: () => {},
          },
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'default',
            label: 'ID',
            dataField: 'id',
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            elementProps: {
              minWidth: 2,
            },
          },
        ];
      },
      rowEditCommand() {
        return {
          command: 'handleEdit',
        };
      },
      rowSaveCommand() {
        return {
          command: 'handleSave',
        };
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
      },
      handleSave(index, row) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
      },
    },
  };
</script>
```

:::

### Table Attributes

常规属性可参考 [通用表格](http://castor.polarwin.cn/#/component/common-table) , 独有属性如下：

| 参数              | 说明                                                                                                        | 类型    | 可选值                                           | 默认值      |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------ | ----------- |
| type              | 类型，较通用表格支持的类型要少                                                                              | string  | default / input / index / inputNumber / commands | —           |
| editTriggerMode   | 编辑状态触发方式                                                                                            | string  | manual\auto                                      | manual      |
| addInside         | 是否在表格内部添加新行                                                                                      | boolean | —                                                | false       |
| addInsidePosition | 添加新行位置                                                                                                | string  | beforeFirst\afterLast                            | beforeFirst |
| appendContent     | 插入至表格最后一行之后的内容                                                                                | string  | —                                                | —           |
| elementProps      | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | —                                                | {}          |

### Column Options

| 参数         | 说明                                                                                                        | 类型    | 可选值                                                              | 默认值  |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- | ------- |
| type         | 类型                                                                                                        | string  | default / selection / index / link / keyToValue / status / commands | default |
| label        | 标题                                                                                                        | string  | —                                                                   | 10      |
| dataField    | 绑定字段                                                                                                    | string  | —                                                                   | 0       |
| editable     | 是否可编辑                                                                                                  | boolean | —                                                                   | false   |
| elementProps | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | -                                                                   | {}      |
| extendProps  | 扩展属性，参考 `Column ExtendProps Options`                                                                 | object  | -                                                                   | {}      |

### Column ExtendProps Options

| 参数     | 说明                                                                                                                               | 类型  | 可选值 | 默认值 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----- | ------ | ------ |
| commands | 行事件集合，当 `type` 为 `commands` 时使用 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling) | array | -      | []     |

### Table Events

| 事件名    | 说明                         | 参数 |
| --------- | ---------------------------- | ---- |
| row-click | 当某一行被点击时会触发该事件 | row  |
