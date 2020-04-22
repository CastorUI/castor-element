## CommonTable 通用表格

用于展示多条结构类似的数据，可对数据进行排序或其他自定义操作。

### 基础

展示表格的基础用法。

:::demo 当`ca-common-table`元素中注入`dataList`对象数组和`tableColumns`列数组后即可填入数据。在列数组中，`type`属性用来定义列类型，`label`属性用来定义列名，`dataField`属性用来定义数据字段，`columnSpan`属性用来定义列占用的宽度占比。

```html
<template>
  <ca-common-table :dataSource="table.dataList" :columns="tableColumns" />
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
            columnSpan: 1,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            columnSpan: 2,
          },
        ];
      },
    },
  };
</script>
```

:::

### 序号列

展示序号列的用法。

:::demo 在`tableColumns`中添加 type 为`index`的对象即可。

```html
<template>
  <ca-common-table :dataSource="table.dataList" :columns="tableColumns" />
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
            type: 'index',
            label: '序号',
            dataField: '',
            width: '80px',
          },
          {
            type: 'default',
            label: 'ID',
            dataField: 'id',
            columnSpan: 1,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            columnSpan: 2,
          },
        ];
      },
    },
  };
</script>
```

:::

### 超链接列

展示超链接列的用法。

:::demo 在`tableColumns`中添加 type 为`link`的对象，并在`linkCommand`中绑定事件。通过在`extendProps`中添加`type`属性值设置样式。

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    @handleLink="handleLink"
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
            columnSpan: 1,
          },
          {
            type: 'link',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
            linkCommand: 'handleLink',
            extendProps: {
              type: 'primary',
            },
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            columnSpan: 2,
          },
        ];
      },
    },
    methods: {
      handleLink(index, row) {
        console.log('handleLink');
        console.log(index, row);
      },
    },
  };
</script>
```

:::

### 操作列

展示操作列的用法。

:::demo 在`tableColumns`中添加 type 为`commands`的对象。

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    @handleEdit="handleEdit"
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
            columnSpan: 1,
          },
          {
            type: 'default',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            columnSpan: 2,
          },
          {
            type: 'commands',
            label: '操作',
            width: '180px',
            commands: [
              {
                text: '编辑',
                command: 'handleEdit',
                extendProps: {
                  type: 'primary',
                },
              },
              {
                text: '删除',
                command: 'handleDelete',
                extendProps: {
                  type: 'danger',
                },
              },
            ],
          },
        ];
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit');
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log('handleDelete');
        console.log(index, row);
      },
    },
  };
</script>
```

:::
