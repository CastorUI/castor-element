## EditTable 可编辑表格

可编辑表格支持两种模式，手动触发和点击触发两种。手动触发模式需要手动点击编辑按钮才能触发，而点击触发则在点击行时即触发。

### 点击触发-基础

展示点击触发的基本效果。选中行进入到编辑状态，当前行失去焦点时恢复到原始状态。

:::demo `editTriggerMode`属性用于配置触发模式，`editCommand`属性用于配置行编辑事件，`saveCommand`用于配置行保存事件。

```html
<template>
  <ca-edit-table
    editTriggerMode="click-row"
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
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
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
            columnSpan: 1,
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
            editable: true,
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

### 点击触发-校验

校验功能用于在保存前检查行数据。如果校验不通过，则当前行保持编辑状态，且控件显示错误提示。

:::demo 字段的校验规则配置在`tableColumns`计算属性的`rules`子属性中，所有字段的校验结果会同步到变量`validateStatus`中去。`saveCommand`属性对象和`editCommand`中都包括`statusValidator`子属性，用于配置校验方法，需要配套使用。

```html
<template>
  <ca-edit-table
    editTriggerMode="click-row"
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
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
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
            columnSpan: 1,
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
            editable: true,
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
    editTriggerMode="manual-row"
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
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
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
            columnSpan: 1,
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'commands',
            label: '操作',
            width: '200px',
            fixed: 'right',
            commands: [
              {
                text: '编辑',
                command: 'handleEdit',
                linkType: 'primary',
              },
              {
                text: '删除',
                command: 'handleDelete',
                linkType: 'danger',
              },
            ],
            editableCommands: [
              {
                text: '保存',
                command: 'handleSave',
                linkType: 'primary',
              },
              {
                text: '取消',
                command: 'handleCancel',
                linkType: 'primary',
              },
            ],
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
    editTriggerMode="manual-row"
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
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
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
            columnSpan: 1,
            editable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'default',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            editable: true,
            rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
            editable: true,
          },
          {
            type: 'commands',
            label: '操作',
            width: '200px',
            fixed: 'right',
            commands: [
              {
                text: '编辑',
                command: 'handleEdit',
                linkType: 'primary',
                disableValidator: () => !this.table.validateStatus,
              },
              {
                text: '删除',
                command: 'handleDelete',
                linkType: 'danger',
                disableValidator: () => !this.table.validateStatus,
              },
            ],
            editableCommands: [
              {
                text: '保存',
                command: 'handleSave',
                linkType: 'primary',
                disableValidator: () => !this.table.validateStatus,
              },
              {
                text: '取消',
                command: 'handleCancel',
                linkType: 'primary',
                disableValidator: () => !this.table.validateStatus,
              },
            ],
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
