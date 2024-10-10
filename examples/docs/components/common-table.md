# CommonTable 通用表格

用于展示多条结构类似的数据，可对数据进行排序或其他自定义操作。

## 基础

展示表格的基础用法。

:::demo 当`ca-common-table`元素中注入`dataList`对象数组和`tableColumns`列数组后即可填入数据。在列数组中，`type`属性用来定义列类型，`label`属性用来定义列名，`dataField`属性用来定义数据字段。

```html
<template>
  <ca-common-table
    table-tag="demo-basic"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
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
              age: 10,
              date: '2024-05-30T00:00:00+0800',
            },
            {
              id: 1002,
              code: 'A2',
              age: 0,
              date: '2024-05-29T00:00:00+0800',
              name:
                '上海燃气二期工程 it will work no matter where your popper and reference elements live, even in the most complex scenarios like nested scrolling containers or alternative offsetParent contexts. it will work no matter where your popper and reference elements live, even in the most complex scenarios like nested scrolling containers or alternative offsetParent contexts.',
            },
            {
              id: 1003,
              code: 'A3',
              age: 20,
              name: '上海燃气三期工程',
              date: '2024-05-31T00:00:00+0800',
            },
          ],
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
            showPagination: true,
          },
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'selection',
            label: '',
            dataField: 'selection',
            elementProps: {
              width: '40px',
              fixed: 'left',
            },
          },
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
            label: '年龄',
            dataField: 'age',
          },
          {
            type: 'default',
            label: '测试表格列',
            dataField: 'name',
            elementProps: {
              minWidth: 2,
            },
          },
          {
            type: 'date',
            label: '时间转换',
            dataField: 'date',
            elementProps: {
              minWidth: 2,
            },
            extendProps: {
              format: 'DD/MM/YYYY HH:mm:ss'
            }
          },
        ];
      },
    },
    methods: {},
  };
</script>
```

:::

## 序号列

展示序号列的用法。

:::demo 在`tableColumns`中添加`type`为`index`的对象即可。序号列的内部计算依赖分页对象`pagination`.

```html
<template>
  <ca-common-table
    table-tag="demo-index"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
          },
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'index',
            label: '序号',
            dataField: 'index',
            elementProps: {
              width: '80px',
            },
          },
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
              minWidth: 4,
              align: 'left',
            },
          },
        ];
      },
    },
  };
</script>
```
:::

## 树形数据

展示树形数据的用法。

:::demo 在`tableColumns`中添加`type`为`index`的对象即可。序号列的内部计算依赖分页对象`pagination`.

```html
<template>
  <ca-common-table
    table-tag="demo-index"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    :elementProps="table.elementProps"
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
              testChildren: [
                {
                  id: 10011,
                  code: 'A11',
                  name: '上海燃气一期工程-1',
                },
                {
                  id: 10012,
                  code: 'A12',
                  name: '上海燃气一期工程-2',
                },
              ]
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
          },
          elementProps: {
            treeProps: {
              children: 'testChildren',
              hasChildren: 'hasChildren',
            },
          },
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'index',
            label: '序号',
            dataField: 'index',
            elementProps: {
              width: '80px',
            },
          },
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
              minWidth: 4,
              align: 'left',
            },
          },
        ];
      },
    },
  };
</script>
```
:::

## 超链接列

展示超链接列的用法。

:::demo 在`tableColumns`中添加`type`为`link`的对象，并在`elementProps`中添加`linkCommand`属性值中绑定事件。通过在`elementProps`中添加`type`属性值设置样式。

```html
<template>
  <ca-common-table
    table-tag="demo-link"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
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
            type: 'link',
            label: '编号',
            dataField: 'code',
            elementProps: {
              type: 'primary',
            },
            extendProps: {
              linkCommand: 'handleLink',
            },
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
      handleLink(index, row) {
        console.log('handleLink,', index, row);
      },
    },
  };
</script>
```

:::

## 数据转换列

展示数据转换列的用法。

:::demo 在`tableColumns`中添加`type`为`keyToValue`的对象，并在`options`中绑定数据源。

```html
<template>
  <ca-common-table
    table-tag="demo-keyToValue"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          type: [],
        },
        table: {
          dataList: [],
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
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
          {
            type: 'keyToValue',
            label: '项目类型',
            dataField: 'type',
            elementProps: {
              width: '120px',
            },
            extendProps: {
              options: this.optionsMap['type'],
            },
          },
        ];
      },
    },
    async created() {
      await this.getBasic();
      await this.getList();
    },
    methods: {
      async getBasic() {
        const typePromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                value: 1,
                label: '住宅配套项目',
              },
              {
                value: 2,
                label: '工营事业项目',
              },
              {
                value: 3,
                label: '道路工程项目',
              },
            ]);
          }, 3000);
        });
        this.optionsMap['type'] = await typePromise;
      },
      async getList() {
        this.table.dataList = await Promise.resolve([
          {
            id: 1001,
            code: 'A1',
            name: '上海燃气一期工程',
            type: 1,
          },
          {
            id: 1002,
            code: 'A2',
            name: '上海燃气二期工程',
            type: 2,
          },
          {
            id: 1003,
            code: 'A3',
            name: '上海燃气三期工程',
            type: 3,
          },
        ]);
      },
    },
  };
</script>
```

:::

## 数据转换列(多选)

展示数据转换列的用法。

:::demo 在`tableColumns`中添加`type`为`multiKeyToValue`的对象，并在`options`中绑定数据源。

```html
<template>
  <ca-common-table
    table-tag="demo-multiKeyToValue"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          type: [
            {
              value: 1,
              label: '住宅配套项目',
            },
            {
              value: 2,
              label: '工营事业项目',
            },
            {
              value: 3,
              label: '道路工程项目',
            },
          ],
        },
        table: {
          dataList: [
            {
              id: 1001,
              code: 'A1',
              name: '上海燃气一期工程',
              type: [1],
            },
            {
              id: 1002,
              code: 'A2',
              name: '上海燃气二期工程',
              type: [1, 2],
            },
            {
              id: 1003,
              code: 'A3',
              name: '上海燃气三期工程',
              type: [1, 2, 3],
            },
          ],
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
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
          {
            type: 'multiKeyToValue',
            label: '项目类型',
            dataField: 'type',
            elementProps: {
              width: '240px',
            },
            extendProps: {
              options: this.optionsMap['type'],
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

## 状态列

展示状态列的用法。

:::demo 在`tableColumns`中添加`type`为`status`的对象，并在`options`中绑定数据源。状态列与数据转换列类似，但更为定制化，可以指定图标和字体颜色。

```html
<template>
  <ca-common-table
    table-tag="demo-status"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          type: [
            {
              value: 1,
              label: '住宅配套项目',
              color: '#f5a623',
              icon: 'el-icon-success',
            },
            {
              value: 2,
              label: '工营事业项目',
              color: '#d0021b',
              icon: 'el-icon-remove',
            },
            {
              value: 3,
              label: '道路工程项目',
              color: '#3d1ab7',
              icon: 'el-icon-time',
            },
            {
              value: 4,
              label: '街坊管位移项目',
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
              name: '上海燃气一期工程',
              type: 1,
            },
            {
              id: 1002,
              code: 'A2',
              name: '上海燃气二期工程',
              type: 2,
            },
            {
              id: 1003,
              code: 'A3',
              name: '上海燃气三期工程',
              type: 3,
            },
          ],
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
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
          {
            type: 'status',
            label: '项目类型',
            dataField: 'type',
            elementProps: {
              width: '140px',
            },
            extendProps: {
              options: this.optionsMap['type'],
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

## 操作列

展示操作列的用法。

:::demo 在`tableColumns`中添加`type`为`commands`的对象。

```html
<template>
  <ca-common-table
    table-tag="demo-commands"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
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
                  extendProps: {
                    imageUrl:
                      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
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
            },
            elementProps: {
              width: '180px',
            },
          },
        ];
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
      },
      handleDelete(index, row) {
        console.log('handleDelete,', index, row);
      },
    },
  };
</script>
```

:::

## 操作列-状态控制

展示操作列的用法。

:::demo 在`tableColumns`中添加`type`为`commands`的数组,在每个 command 对象中通过`disableValidator`和`visibleValidator`进行状态控制

```html
<template>
  <ca-common-table
    table-tag="demo-command-staus-validator"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    @handleEdit="handleEdit"
    @handleDelete="handleDelete"
    @row-click="handleRowClick"
    @cell-click="handleCellClick"
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
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
          {
            type: 'commands',
            label: '操作',
            dataField: '',
            extendProps: {
              commands: [
                {
                  text: '编辑',
                  command: 'handleEdit',
                  disableValidator: (row) => true,
                  elementProps: {
                    type: 'primary',
                  },
                  extendProps: {
                    imageUrl:
                      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                  },
                },
                {
                  text: '删除',
                  command: 'handleDelete',
                  disableValidator: (row) => true,
                  elementProps: {
                    type: 'danger',
                  },
                },
              ],
            },
            elementProps: {
              width: '180px',
            },
          },
        ];
      },
    },
    methods: {
      handleEdit(index, row) {
        console.log('handleEdit,', index, row);
      },
      handleDelete(index, row) {
        console.log('handleDelete,', index, row);
      },
      handleRowClick(row) {
        console.log('handleRowClick,', row);
      },
      handleCellClick(row,column,cell) {
        console.log('handleRowClick,', row,column,cell);
      },
    },
  };
</script>
```

:::

## 分页（常规）

展示表格分页的用法。

:::demo 在`pagination`中配置分页相关属性，包含`pageIndex`和`pageSize`和`total`。这里的分页用于后台分页，所以需要配置`getList`方法用于调用后台接口，每次切换分页时都会调用此方法。

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    :getList="getList"
    table-tag="demo-pagination"
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
      fetchdata() {
       // 创建一个Promise对象
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              // 模拟数据获取成功
              const data = {
                total: 50,
                results: [
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
                  },]
              }

              // 使用resolve方法传递数据
              resolve(data);
              // 或者使用reject方法模拟获取数据失败
              // reject('Error: Unable to fetch data');
            }, 1000); // 1秒钟的延时
          });
      },
      getList() {
        // 模拟获取数据
          this.fetchdata().then((data) => {
          // 获取数据成功后，将数据赋值给dataList
          this.table.dataList = data.results;
          // 获取数据成功后，将数据总数赋值给pagination.total
          this.table.pagination.total = data.total;
          return this.table.dataList
        });
      },
    },
  };
</script>
```

:::

## 分页（大数据）

展示大数据表格分页的用法。由于数据量巨大，无法支持总页码计算和跳页查询。

:::demo 在`pagination`中配置分页属性`pageSize`，并指定`type`为`bigData`。这里的分页用于后台分页，所以需要配置`getList`方法用于调用后台接口，每次切换分页时都会调用此方法。

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    :getList="getList"
    table-tag="demo-pagination"
    @big-data-page-index-change="handlePageIndexChange"
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
            type: 'bigData',
            pageSize: 10,
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
      handlePageIndexChange(type) {
        console.log('handlePageIndexChange', type);
        let params = {
          pageSize: this.table.pagination.pageSize,
        };
        if (type === 'previous') {
          params = { ...params, minId: this.table.dataList[0].id };
        } else {
          params = {
            ...params,
            maxId: this.table.dataList[this.table.dataList.length - 1].id,
          };
        }
        console.log('params', params);
      },
    },
  };
</script>
```

:::

## 新增

展示新增功能的用法。

:::demo 新增功能约定以链接的形式放在表格的左上角。`addText`属性来控制其是否显示，`handleAdd`方法用来响应新增事件。

```html
<template>
  <ca-common-table
    table-tag="demo-add"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :addCommand="table.addCommand"
    :pagination="table.pagination"
    @handleAdd="handleAdd"
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
          },
          addCommand: {
            text: '新增任务',
            command: 'handleAdd',
            visibleValidator: () => true,
            disableValidator: () => {},
            elementProps: {
              icon: 'el-icon-circle-plus-outline',
            },
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
      handleAdd() {
        console.log('add new record');
      },
    },
  };
</script>
```

:::

## 定制事件

展示定制事件的用法。

:::demo 定制事件约定放置在表格的右上角,一般与多选列配置使用，所以要添加`type`为`selection`的列。`customCommands`属性用来配置定制事件集合

```html
<template>
  <ca-common-table
    table-tag="demo-custom"
    :title="table.title"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    :customCommands="table.customCommands"
    :settingCommands="table.settingCommands"
    :addCommand="table.addCommand"
    @handleAdd="handleAdd"
    @handleStar="handleStar"
    @handleUnstar="handleUnstar"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          title: '示例表格',
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
          },
          customCommands: [
            {
              text: '关注',
              command: 'handleStar',
              disableValidator: (multipleSelection) =>
                !(multipleSelection && multipleSelection.length),
            },
            {
              text: '取消关注',
              command: 'handleUnstar',
              disableValidator: (multipleSelection) =>
                !(multipleSelection && multipleSelection.length),
            },
          ],
          settingCommands: [
            {
              text: '关注',
              command: 'handleStar',
              disableValidator: (multipleSelection) =>
                !(multipleSelection && multipleSelection.length),
              elementProps: {
                icon: 'el-icon-star-on',
              },
            },
            {
              text: '取消关注',
              command: 'handleUnstar',
              disableValidator: (multipleSelection) =>
                !(multipleSelection && multipleSelection.length),
              elementProps: {
                icon: 'el-icon-star-off',
              },
            },
          ],
          addCommand: {
            text: '新增任务',
            command: 'handleAdd',
            visibleValidator: () => true,
            disableValidator: () => {},
            elementProps: {},
          },
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'selection',
            label: '',
            dataField: '',
            elementProps: {
              width: '100px',
              fixed: 'left',
            },
          },
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
              fixed: 'right',
            },
          },
        ];
      },
    },
    methods: {
      handleAdd() {
        console.log('add new record');
      },
      handleStar(multipleSelection) {
        console.log('star multipleSelection', multipleSelection);
      },
      handleUnstar(multipleSelection) {
        console.log('unstar multipleSelection', multipleSelection);
      },
    },
  };
</script>
```

:::

## 提示信息

展示表格的提示信息。

:::demo `ca-common-table` 使用 `Tips` 对象来表示提示信息。

```html
<template>
  <ca-common-table
    table-tag="demo-tips"
    :tips="table.tips"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          tips: {
            title: '这是表格的提示信息',
            elementProps: {
              type: 'success',
              center: false,
              showIcon: true,
            },
          },
          dataList: [
            {
              id: 1001,
              code: 'A1',
              name: '上海燃气一期工程',
            },
            {
              id: 1002,
              code: 'A2',
              name:
                '上海燃气二期工程 it will work no matter where your popper and reference elements live, even in the most complex scenarios like nested scrolling containers or alternative offsetParent contexts. it will work no matter where your popper and reference elements live, even in the most complex scenarios like nested scrolling containers or alternative offsetParent contexts.',
            },
            {
              id: 1003,
              code: 'A3',
              name: '上海燃气三期工程',
            },
          ],
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
          },
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            type: 'selection',
            label: '',
            dataField: 'selection',
            elementProps: {
              width: '40px',
              fixed: 'left',
            },
          },
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
            label: '测试表格列',
            dataField: 'name',
            elementProps: {
              minWidth: 2,
            },
          },
          {
            type: 'default',
            label: '测试表格列3',
            dataField: 'name2',
            elementProps: {
              minWidth: 2,
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

## ElementUI 属性

展示 ElementUI 属性的用法。

:::demo

```html
<template>
  <ca-common-table
    table-tag="demo-elementPros"
    :dataSource="table.dataList"
    :columns="tableColumns"
    :pagination="table.pagination"
    :elementProps="table.elementProps"
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
          pagination: {
            pageIndex: 1,
            pageSize: 10,
            total: 3,
          },
          elementProps: {
            border: false,
            stripe: true,
            style: 'width:100%;min-width:720px;height:auto;color:red;',
            height: '160px',
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
    methods: {},
  };
</script>
```

:::

## Table Attributes

| 参数           | 说明                                                                                                                   | 类型     | 可选值 | 默认值 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| loading        | 是否显示 loading                                                                                                       | boolean  | —      | false  |
| title          | 表格标题                                                                                                               | string   | —      | —      |
| dataSource     | 数据源                                                                                                                 | array    | —      | []     |
| columns        | 列集合，参考 `Column Options`                                                                                          | array    | —      | []     |
| pagination     | 分页对象 [详情](http://castor.polarwin.cn/#/component/sharing-config#pagination-options)                               | object   | —      | {}     |
| addCommand     | 新增事件对象 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling)                   | object   | —      | {}     |
| customCommands | 自定义事件，显示在表格上方右侧 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling) | array    | —      | []     |
| getList        | 查询数据方法                                                                                                           | function | —      | —      |
| elementProps   | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing)            | object   | —      | —      |
| extendProps    | 扩展属性，参考 `Table ExtendProps Options`                                                                             | object   | -      | {}     |

## Column Options

| 参数         | 说明                                                                                                        | 类型   | 可选值                                                                       | 默认值  |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- | ------- |
| type         | 类型(为 expand 时，父层表格列禁用 fixed 属性)                                                               | string | default / selection / index / link / keyToValue / status / expand / commands | default |
| label        | 标题                                                                                                        | string | —                                                                            | 10      |
| dataField    | 绑定字段                                                                                                    | string | —                                                                            | 0       |
| elementProps | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object | -                                                                            | {}      |
| extendProps  | 扩展属性，参考 `Column ExtendProps Options`                                                                 | object | -                                                                            | {}      |

## Column ExtendProps Options

| 参数        | 说明                                                                                                                               | 类型     | 可选值 | 默认值 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| commands    | 行事件集合，当 `type` 为 `commands` 时使用 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling) | array    | -      | []     |
| options     | 数据转换数据源 ，当 `type` 为 `keyToValue` 或 `status` 时使用                                                                      | array    | -      | []     |
| linkCommand | 超链接事件，当 `type` 为 `link` 时使用                                                                                             | function | -      | -      |

## Table ExtendProps Options

| 参数               | 说明               | 类型    | 可选值 | 默认值 |
| ------------------ | ------------------ | ------- | ------ | ------ |
| showRefresh        | 是否启用刷新功能   | boolean | -      | true   |
| showColumnConfig   | 是否启用列设置功能 | boolean | -      | true   |
| cacheConfigColumns | 列设置是否使用缓存 | boolean | -      | true   |

## Table Events

| 事件名           | 说明                                 | 参数              |
| ---------------- | ------------------------------------ | ----------------- |
| cell-click        | 当某一单元格被单击时触发     | row, column, cell, event    |
| cell-dblclick     | 当某一单元格被双击时触发     | row, column, cell, event    |
| row-click        | 当某一行被单击时触发         | row, column, event          |
| row-dblclick     | 当某一行被双击时触发         | row, column, event          |
| selection-change | 用于多选表格，当选择项发生变化时触发 | multipleSelection |
