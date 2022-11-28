# EditTable 可编辑表格

可编辑表格支持两种模式，手动触发和自动触发两种。手动触发模式需要手动点击编辑按钮才能触发，而自动触发则在点击行时即触发。

## 自动触发-基础

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
        optionsMap: {
          role: [
            {
              value: 1,
              label: '歌星',
            },
            {
              value: 2,
              label: '电视剧演员',
            },
            {
              value: 3,
              label: '电影演员',
            },
          ],
          sex: [
            {
              value: 0,
              label: '男',
            },
            {
              value: 1,
              label: '女',
            },
          ],
          enabled: [
            {
              value: false,
              label: '已禁用',
              color: '#d0021b',
              icon: 'el-icon-remove',
            },
            {
              value: true,
              label: '已启用',
              color: '#4a90e2',
              icon: 'el-icon-top',
            },
          ],
        },
        table: {
          dataList: [
            {
              id: 1001,
              code: 'A1',
              en_name: 'Karen Mok',
              cn_name: '莫文蔚',
              age: 30,
              role: [1, 3],
              sex: 1,
              createTime: '2020-11-24 00:00:01',
              enabled: false,
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              age: 30,
              role: [1, 3],
              sex: 0,
              createTime: '2020-11-24 00:00:01',
              enabled: true,
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              age: 30,
              role: [1, 2, 3],
              sex: 0,
              createTime: '2020-11-24 00:00:01',
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
            elementProps: {
              width: '60px',
            },
          },
          {
            type: 'default',
            label: '汉语名',
            dataField: 'cn_name',
            editable: true,
            elementProps: {
              minWidth: '100px',
            },
            extendProps: {
              autoFocus: true,
            },
          },
          {
            type: 'inputNumber',
            label: '年龄',
            dataField: 'age',
            editable: true,
            elementProps: {
              minWidth: '130px',
            },
          },
          {
            type: 'select',
            label: '性别',
            dataField: 'sex',
            elementProps: {
              minWidth: '80px',
            },
            extendProps: {
              options: this.optionsMap['sex'],
            },
          },
          {
            type: 'select',
            label: '角色',
            dataField: 'role',
            editable: true,
            elementProps: {
              multiple: true,
              minWidth: '160px',
            },
            extendProps: {
              options: this.optionsMap['role'],
            },
          },
          {
            type: 'datetime',
            label: '创建时间',
            dataField: 'createTime',
            editable: true,
            elementProps: {
              minWidth: '210px',
              valueFormat: 'yyyy-MM-dd HH:mm:ss',
              placeholder: '创建时间',
            },
          },
          {
            type: 'switch',
            label: '启用状态',
            dataField: 'enabled',
            editable: true,
            elementProps: {
              minWidth: '90px',
              align: 'center',
            },
            extendProps: {
              options: this.optionsMap['enabled'],
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
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
        callback();
      },
    },
  };
</script>
```

:::

## 自动触发-校验

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
        optionsMap: {
          role: [
            {
              value: 1,
              label: '歌星',
            },
            {
              value: 2,
              label: '电视剧演员',
            },
            {
              value: 3,
              label: '电影演员',
            },
          ],
        },
        table: {
          validateStatus: true,
          dataList: [
            {
              id: 1001,
              code: 'A1',
              en_name: 'Jack Li',
              cn_name: '李连杰',
              age: 30,
              role: [1, 3],
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              age: 30,
              role: [1, 3],
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              age: 30,
              role: [1, 2, 3],
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
            type: 'select',
            label: '角色',
            dataField: 'role',
            editable: true,
            rules: [{ required: true, message: '不能为空' }],
            elementProps: {
              multiple: true,
            },
            extendProps: {
              options: this.optionsMap['role'],
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
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
        callback();
      },
    },
  };
</script>
```

:::

## 手动触发-基础

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
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
        callback();
      },
      handleCancel(index, row, callback) {
        console.log('handleCancel,', index, row);
        row.operateType = 'view';
        callback();
      },
      handleDelete(index, row, callback) {
        console.log('handleDelete,', index, row);
        callback();
      },
    },
  };
</script>
```

:::

## 手动触发-校验

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
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
        callback();
      },
      handleCancel(index, row, callback) {
        console.log('handleCancel,', index, row);
        row.operateType = 'view';
        callback();
      },
      handleDelete(index, row, callback) {
        console.log('handleDelete,', index, row);
        callback();
      },
    },
  };
</script>
```

:::

## 表格内部-新增

展示新增功能的用法。

:::demo 新增功能约定以链接的形式放在表格的左上角。`addCommand`属性来控制其是否显示及响应事件。

```html
<template>
  <ca-edit-table
    editTriggerMode="auto"
    :addInside="table.addInside"
    :title="table.title"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :validateStatus.sync="table.validateStatus"
    :addCommand="table.addCommand"
    :editCommand="rowEditCommand"
    :saveCommand="rowSaveCommand"
    @handleCancel="handleCancel"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          role: [
            {
              value: 1,
              label: '歌星',
            },
            {
              value: 2,
              label: '电视剧演员',
            },
            {
              value: 3,
              label: '电影演员',
            },
          ],
        },
        table: {
          validateStatus: true,
          title: '示例表格',
          dataList: [
            {
              id: 1001,
              code: 'A1',
              name: '上海燃气一期工程',
              role: [1, 3],
            },
            {
              id: 1002,
              code: 'A2',
              name: '上海燃气二期工程',
              role: [1, 3],
            },
            {
              id: 1003,
              code: 'A3',
              name: '上海燃气三期工程',
              role: [1, 3],
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
            addable: false,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            addable: false,
            editable: true,
            extendProps: {
              autoFocus: true,
            },
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            editable: true,
            elementProps: {
              minWidth: 2,
            },
          },
          {
            type: 'select',
            label: '角色',
            dataField: 'role',
            editable: true,
            rules: [{ required: true, message: '不能为空' }],
            elementProps: {
              multiple: true,
            },
            extendProps: {
              options: this.optionsMap['role'],
            },
          },
          {
            type: 'commands',
            label: '操作',
            dataField: '',
            elementProps: {
              width: '120px',
            },
            extendProps: {
              editableCommands: [
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
      handleCancel(index, row, callback) {
        console.log('handleCancel,', index, row);
        row.operateType = 'view';
        callback();
        this.table.validateStatus = true;
        this.table.dataList = [
          {
            id: 1001,
            code: 'A1',
            name: '上海燃气一期工程',
            role: [1, 3],
          },
          {
            id: 1002,
            code: 'A2',
            name: '上海燃气二期工程',
            role: [1, 3],
          },
          {
            id: 1003,
            code: 'A3',
            name: '上海燃气三期工程',
            role: [1, 3],
          },
        ];
      },
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        row.operateType = 'view';
        callback();
      },
    },
  };
</script>
```

:::

## 行内事件

展示行内事件的用法。

:::demo 行内事件分为两种状态：`常规态`和`编辑态`。`常规态`的事件`extendProps.commands`中，`编辑态`的事件`extendProps.editableCommands`中。

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
    @handleDelete="handleDelete"
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
          {
            type: 'commands',
            label: '操作',
            elementProps: {
              width: '140px',
            },
            extendProps: {
              commands: [
                {
                  text: '删除',
                  command: 'handleDelete',
                  elementProps: {
                    type: 'danger',
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
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        callback();
      },
      handleDelete(index, row, callback) {
        console.log('handleDelete,', index, row);
        callback();
      },
    },
  };
</script>
```

:::

## 定制事件

展示行内事件的用法。

:::demo 行内事件分为两种状态：`常规态`和`编辑态`。`常规态`的事件`extendProps.commands`中，`编辑态`的事件`extendProps.editableCommands`中。

```html
<template>
  <ca-edit-table
    editTriggerMode="auto"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :editCommand="rowEditCommand"
    :saveCommand="rowSaveCommand"
    :customCommands="table.customCommands"
    @handleEdit="handleEdit"
    @handleSave="handleSave"
    @handleDelete="handleDelete"
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
          customCommands: [
            {
              text: '关注',
              command: 'handleStar',
            },
            {
              text: '取消关注',
              command: 'handleUnstar',
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
          {
            type: 'commands',
            label: '操作',
            elementProps: {
              width: '140px',
            },
            extendProps: {
              commands: [
                {
                  text: '删除',
                  command: 'handleDelete',
                  elementProps: {
                    type: 'danger',
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
      handleEdit(index, row, callback) {
        console.log('handleEdit,', index, row);
        row.operateType = 'edit';
        callback();
      },
      handleSave(index, row, callback) {
        console.log('handleSave,', index, row);
        callback();
      },
      handleDelete(index, row, callback) {
        console.log('handleDelete,', index, row);
        callback();
      },
      handleStar() {
        console.log('star');
      },
      handleUnstar() {
        console.log('unstar');
      }
    },
  };
</script>
```

:::

## 分页

展示表格分页的用法。

:::demo 在`pagination`中配置分页相关属性，包含`pageIndex`和`pageSize`和`total`。这里的分页用于后台分页，所以需要配置`getList`方法用于调用后台接口，每次切换分页时都会调用此方法。当后台返回`total`值大于设置的`pageSize`属性值时，会自动显示分页组件。

```html
<template>
  <ca-edit-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    :getList="getList"
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
            {
              id: 1004,
              code: 'A4',
              name: '上海燃气四期工程',
            },
            {
              id: 1005,
              code: 'A5',
              name: '上海燃气三期工程',
            },
            {
              id: 1006,
              code: 'A6',
              name: '上海燃气三期工程',
            },
            {
              id: 1007,
              code: 'A7',
              name: '上海燃气三期工程',
            },
            {
              id: 1008,
              code: 'A8',
              name: '上海燃气三期工程',
            },
            {
              id: 1009,
              code: 'A9',
              name: '上海燃气三期工程',
            },
            {
              id: 1010,
              code: 'A10',
              name: '上海燃气三期工程',
            },
          ],
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 30,
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
    },
    methods: {
      getList() {
        console.log('this.table.pagination', this.table.pagination);
      },
    },
  };
</script>
```

:::

## Table Attributes

常规属性可参考 [通用表格](http://castor.polarwin.cn/#/component/common-table) , 独有属性如下：

| 参数              | 说明                                                                                                        | 类型    | 可选值                | 默认值      |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ----------- |
| editTriggerMode   | 编辑状态触发方式                                                                                            | string  | manual\auto           | manual      |
| addInside         | 是否在表格内部添加新行                                                                                      | boolean | —                     | false       |
| addInsidePosition | 添加新行位置                                                                                                | string  | beforeFirst\afterLast | beforeFirst |
| addCommand        | 新增命令                                                                                                    | {}      | —                     | —           |
| editCommand       | 单行编辑命令，仅限 editTriggerMode 为 auto 时使用                                                           | {}      | —                     | —           |
| saveCommand       | 单行保存命令，仅限 editTriggerMode 为 auto 时使用                                                           | {}      | —                     | —           |
| appendContent     | 插入至表格最后一行之后的内容                                                                                | string  | —                     | —           |
| elementProps      | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | —                     | {}          |

## Column Options

| 参数         | 说明                                                                                                        | 类型    | 可选值                                                             | 默认值  |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------ | ------- |
| type         | 类型                                                                                                        | string  | default / index / expand / input / inputNumber / select / commands | default |
| label        | 标题                                                                                                        | string  | —                                                                  | 10      |
| dataField    | 绑定字段                                                                                                    | string  | —                                                                  | 0       |
| addable      | 新增时是否可编辑                                                                                            | boolean | —                                                                  | true    |
| editable     | 修改时是否可编辑                                                                                            | boolean | —                                                                  | false   |
| elementProps | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | -                                                                  | {}      |
| extendProps  | 扩展属性，参考 `Column ExtendProps Options`                                                                 | object  | -                                                                  | {}      |

## Column ExtendProps Options

| 参数         | 说明                                                                                                                               | 类型     | 可选值 | 默认值 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| defaultValue | 当前列字段的默认值（类型与列类型一致）                                                                                             | any      | -      |        |
| autoFocus    | 当行处于编辑状态时，是否默认选中当前列（只设置一列）                                                                               | boolean  | -      | false  |
| commands     | 行事件集合，当 `type` 为 `commands` 时使用 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling) | array    | -      | []     |
| onChange     | 当前行处于编辑状态时，当前单元格的值发生变化时触发                                                                                 | Function | -      |        |
| onEnter      | 当前行处于编辑状态时，回车键触发                                                                                                   | Function | -      |        |

## Table Events

| 事件名    | 说明                         | 参数 |
| --------- | ---------------------------- | ---- |
| row-click | 当某一行被点击时会触发该事件 | row  |

## 注意事项

校验方式采用 Element Form 组件内置的 validate 事件，使用方式推荐：

1. 配置 rules 的 trigger 指定为 blur
2. 配置列的 autoFocus 为 true(指定一个有校验规则的列)
3. 配置 saveCommand 的 disableValidator（校验 table.validateStatus）
