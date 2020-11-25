## TreeEditTable 树形可编辑表格

可编辑表格支持两种模式，手动触发和自动触发两种。手动触发模式需要手动点击编辑按钮才能触发，而自动触发则在点击行时即触发。

### 手动触发-基础

展示自动触发的基本效果。选中行进入到编辑状态，当前行失去焦点时恢复到原始状态。

:::demo `editTriggerMode`属性用于配置触发模式，`editCommand`属性用于配置行编辑事件，`saveCommand`用于配置行保存事件。

```html
<template>
  <ca-tree-edit-table
    editTriggerMode="manual"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :addInside="table.addInside"
    :addCommand="table.addCommand"
    :validateStatus.sync="table.validateStatus"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    @handleSave="handleSave"
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
              id: 1,
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
            },
            {
              id: 2,
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
            },
            {
              id: 3,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 31,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                  id: 32,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                },
              ],
            },
            {
              id: 4,
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
            },
          ],
          addInside: true,
          addCommand: {
            text: '新增类别',
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
            label: '日期',
            dataField: 'date',
            editable: true,
            elementProps: {
              width: '200px',
              align: 'left',
            },
            extendProps: {
              autoFocus: true,
              isExpandColumn: true,
            },
          },
          {
            type: 'default',
            label: '姓名',
            dataField: 'name',
            editable: true,
            rules: [{ required: true, message: '不能为空' }],
            elementProps: {
              minWidth: '2',
            },
          },
          {
            type: 'default',
            label: '地址',
            dataField: 'address',
            editable: true,
            elementProps: {
              minWidth: '2',
            },
          },
          {
            type: 'commands',
            label: '操作',
            elementProps: {
              width: '200px',
              fixed: 'right',
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
                  text: '添加子类',
                  commandType: 'addSub',
                  elementProps: {
                    type: 'primary',
                  },
                  visibleValidator: (row) => row.dataLevel < 10,
                  disableValidator: () => !this.table.validateStatus,
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
                  elementProps: {
                    type: 'primary',
                  },
                },
              ],
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
      handleAdd() {
        console.log('add new record');
      },
      handleEdit(index, row, callback) {
        console.log('handleEdit', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleDelete(index, row, callback) {
        console.log('handleDelete', index, row);
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave', index, row);
        row.operateType = 'view';
        callback();
      },
      handleCancel(index, row, callback) {
        console.log('handleCancel', index, row);
        row.operateType = 'view';
        callback();
      },
    },
  };
</script>
```

:::

### 手动触发-校验

展示自动触发的基本效果。选中行进入到编辑状态，当前行失去焦点时恢复到原始状态。

:::demo `editTriggerMode`属性用于配置触发模式，`editCommand`属性用于配置行编辑事件，`saveCommand`用于配置行保存事件。

```html
<template>
  <ca-tree-edit-table
    editTriggerMode="manual"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :addInside="table.addInside"
    :addCommand="table.addCommand"
    :validateStatus.sync="table.validateStatus"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    @handleSave="handleSave"
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
              id: 1,
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄',
            },
            {
              id: 2,
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄',
            },
            {
              id: 3,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 31,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                  id: 32,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                },
              ],
            },
            {
              id: 4,
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄',
            },
          ],
          addInside: true,
          addCommand: {
            text: '新增类别',
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
            label: '日期',
            dataField: 'date',
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            elementProps: {
              width: '200px',
              align: 'left',
            },
            extendProps: {
              autoFocus: true,
              isExpandColumn: true,
            },
          },
          {
            type: 'default',
            label: '姓名',
            dataField: 'name',
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            elementProps: {
              minWidth: '2',
            },
          },
          {
            type: 'default',
            label: '地址',
            dataField: 'address',
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
            elementProps: {
              minWidth: '2',
            },
          },
          {
            type: 'commands',
            label: '操作',
            elementProps: {
              width: '200px',
              fixed: 'right',
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
                  text: '添加子类',
                  commandType: 'addSub',
                  disableValidator: () => !this.table.validateStatus,
                  elementProps: {
                    type: 'primary',
                  },
                  visibleValidator: (row) => row.dataLevel < 10,
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
                  elementProps: {
                    type: 'primary',
                  },
                },
              ],
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
      handleAdd() {
        console.log('add new record');
      },
      handleEdit(index, row, callback) {
        console.log('handleEdit', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleDelete(index, row, callback) {
        console.log('handleDelete', index, row);
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave', index, row);
        row.operateType = 'view';
        callback();
      },
      handleCancel(index, row, callback) {
        console.log('handleCancel', index, row);
        row.operateType = 'view';
        callback();
      },
    },
  };
</script>
```

:::

### Table Attributes

常规属性可参考 [通用表格](http://castor.polarwin.cn/#/component/common-table) , 独有属性如下：

| 参数              | 说明                                                                                                        | 类型    | 可选值                | 默认值      |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ----------- |
| editTriggerMode   | 编辑状态触发方式                                                                                            | string  | manual\auto           | manual      |
| addInside         | 是否在表格内部添加新行（此时不需要使用表单，也不需要指定新增事件 handleAdd）                                | boolean | —                     | false       |
| addInsidePosition | 添加新行位置                                                                                                | string  | beforeFirst\afterLast | beforeFirst |
| addCommand        | 新增命令                                                                                                    | {}      | —                     | —           |
| editCommand       | 单行编辑命令，仅限 editTriggerMode 为 auto 时使用                                                           | {}      | —                     | —           |
| saveCommand       | 单行保存命令，仅限 editTriggerMode 为 auto 时使用                                                           | {}      | —                     | —           |
| appendContent     | 插入至表格最后一行之后的内容                                                                                | string  | —                     | —           |
| elementProps      | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | —                     | {}          |

### Column Options

| 参数         | 说明                                                                                                        | 类型    | 可选值                                                             | 默认值  |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------ | ------- |
| type         | 类型                                                                                                        | string  | default / index / expand / input / inputNumber / select / commands | default |
| label        | 标题                                                                                                        | string  | —                                                                  | 10      |
| dataField    | 绑定字段                                                                                                    | string  | —                                                                  | 0       |
| editable     | 是否可编辑                                                                                                  | boolean | —                                                                  | false   |
| elementProps | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | -                                                                  | {}      |
| extendProps  | 扩展属性，参考 `Column ExtendProps Options`                                                                 | object  | -                                                                  | {}      |

### Column ExtendProps Options

| 参数           | 说明                                                                                                                               | 类型    | 可选值 | 默认值 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------ |
| autoFocus      | 当行处于编辑状态时，是否默认选中当前列（只设置一列）                                                                               | boolean | -      | false  |
| isExpandColumn | 是否折叠列                                                                                                                         | boolean | -      | false  |
| commands       | 行事件集合，当 `type` 为 `commands` 时使用 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling) | array   | -      | []     |

### Table Events

| 事件名    | 说明                         | 参数 |
| --------- | ---------------------------- | ---- |
| row-click | 当某一行被点击时会触发该事件 | row  |
