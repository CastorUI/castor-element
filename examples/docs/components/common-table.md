## CommonTable 通用表格

用于展示多条结构类似的数据，可对数据进行排序或其他自定义操作。

### 基础

展示表格的基础用法。

:::demo 当`ca-common-table`元素中注入`dataList`对象数组和`tableColumns`列数组后即可填入数据。在列数组中，`type`属性用来定义列类型，`label`属性用来定义列名，`dataField`属性用来定义数据字段。

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
            extendProps: {
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

### 序号列

展示序号列的用法。

:::demo 在`tableColumns`中添加`type`为`index`的对象即可。

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
            extendProps: {
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
            extendProps: {
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

### 超链接列

展示超链接列的用法。

:::demo 在`tableColumns`中添加`type`为`link`的对象，并在`linkCommand`中绑定事件。通过在`extendProps`中添加`type`属性值设置样式。

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
          },
          {
            type: 'link',
            label: '编号',
            dataField: 'code',
            linkCommand: 'handleLink',
            extendProps: {
              type: 'primary',
            },
          },
          {
            type: 'default',
            label: '名称',
            dataField: 'name',
            extendProps: {
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

### 数据转换列

展示数据转换列的用法。

:::demo 在`tableColumns`中添加`type`为`keyToValue`的对象，并在`options`中绑定数据源。

```html
<template>
  <ca-common-table :dataSource="table.dataList" :columns="tableColumns" />
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
            extendProps: {
              minWidth: 2,
            },
          },
          {
            type: 'keyToValue',
            label: '项目类型',
            dataField: 'type',
            options: this.optionsMap['type'],
            extendProps: {
              width: '120px',
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

### 状态列

展示状态列的用法。

:::demo 在`tableColumns`中添加`type`为`status`的对象，并在`options`中绑定数据源。状态列与数据转换列类似，但更为定制化，可以指定图标和字体颜色。

```html
<template>
  <ca-common-table :dataSource="table.dataList" :columns="tableColumns" />
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
            extendProps: {
              minWidth: 2,
            },
          },
          {
            type: 'status',
            label: '项目类型',
            dataField: 'type',
            options: this.optionsMap['type'],
            extendProps: {
              width: '140px',
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

### 操作列

展示操作列的用法。

:::demo 在`tableColumns`中添加`type`为`commands`的对象。

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
            extendProps: {
              minWidth: 2,
            },
          },
          {
            type: 'commands',
            label: '操作',
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
            extendProps: {
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

### 分页

展示表格分页的用法。

:::demo 在`pagination`中配置分页相关属性，包含`pageIndex`和`pageSize`和`total`。这里的分页用于后台分页，所以需要配置`getList`方法用于调用后台接口，每次切换分页时都会调用此方法。当后台返回`total`值大于设置的`pageSize`属性值时，会自动显示分页组件。

```html
<template>
  <ca-common-table
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
            extendProps: {
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

### 分页-数据不足一页

展示表格分页的用法。

:::demo 在`pagination`中配置分页相关属性，包含`pageIndex`和`pageSize`和`total`。这里的分页用于后台分页，所以需要配置`getList`方法用于调用后台接口，每次切换分页时都会调用此方法。当后台返回`total`值大于设置的`pageSize`属性值时，会自动显示分页组件。

```html
<template>
  <ca-common-table
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
            extendProps: {
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

### 新增

展示新增功能的用法。

:::demo 新增功能约定以链接的形式放在表格的左上角。`addText`属性来控制其是否显示，`handleAdd`方法用来响应新增事件。

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :addCommand="table.addCommand"
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
          addCommand: {
            text: '新增任务',
            command: 'handleAdd',
            visibleValidator: () => true,
            disableValidator: () => {},
            extendProps: {
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
            extendProps: {
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

### 定制事件

展示定制事件的用法。

:::demo 定制事件约定放置在表格的右上角。`customCommands`属性用来配置定制事件集合。定制事件一般与多选列配置使用，所以要添加`type`为`selection`的列。

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :customCommands="table.customCommands"
    @handleStar="handleStar"
    @handleUnstar="handleUnstar"
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
              extendProps: {
                icon: 'el-icon-star-on',
              },
            },
            {
              text: '取消关注',
              command: 'handleUnstar',
              extendProps: {
                icon: 'el-icon-star-off',
              },
            },
          ],
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
            extendProps: {
              width: '40px',
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
            extendProps: {
              minWidth: 2,
            },
          },
        ];
      },
    },
    methods: {
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

### 扩展属性

展示扩展属性的用法。

:::demo

```html
<template>
  <ca-common-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :extendProps="table.extendProps"
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
          extendProps: {
            border: false,
            stripe: true,
            style: 'width:100%;min-width:720px;height:auto;color:red;',
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
            extendProps: {
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

### Attributes

| 参数           | 说明                                                                                                             | 类型     | 可选值 | 默认值 |
| -------------- | ---------------------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| loading        | 是否显示 loading                                                                                                 | boolean  | —      | false  |
| dataSource     | 数据源                                                                                                           | array    | —      | []     |
| columns        | 列集合 [详情](http://0.0.0.0:8085/#/component/common-table#column-options)                                       | array    | —      | []     |
| pagination     | 分页对象 [详情](http://0.0.0.0:8085/#/component/sharing-config#pagination-options)                               | object   | —      | {}     |
| addCommand     | 新增事件对象 [详情](http://0.0.0.0:8085/#/component/sharing-config#command-shi-jian-ming-ling)                   | object   | —      | {}     |
| customCommands | 自定义事件，显示在表格上方右侧 [详情](http://0.0.0.0:8085/#/component/sharing-config#command-shi-jian-ming-ling) | array    | —      | []     |
| getList        | 查询数据方法                                                                                                     | function | —      | —      |
| extendProps    | 扩展属性 [详情](http://0.0.0.0:8085/#/component/sharing-config#extendprops-kuo-zhan-shu-xing)                    | object   | -      | -      |

### Column Options

| 参数        | 说明                                                                                                                         | 类型     | 可选值                                                              | 默认值    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------- | --------- |
| type        | 类型                                                                                                                         | string   | default / selection / index / link / keyToValue / status / commands | default   |
| label       | 标题                                                                                                                         | string   | —                                                                   | 10        |
| dataField   | 绑定字段                                                                                                                     | string   | —                                                                   | 0         |
| commands    | 行事件集合，当 `type` 为 `commands` 时使用 [详情](http://0.0.0.0:8085/#/component/sharing-config#command-shi-jian-ming-ling) | array    | -                                                                   | []        |
| options     | 数据转换数据源                                                                                                               | array    | -                                                                   | []        |
| extendProps | 扩展属性 [详情](http://0.0.0.0:8085/#/component/sharing-config#extendprops-kuo-zhan-shu-xing)                                | string   | -                                                                   | ascending |
| align       | 对齐方式                                                                                                                     | string   | -                                                                   | center    |
| linkCommand | 超链接事件，当 `type` 为 `link` 时使用                                                                                       | function | -                                                                   | -         |
| reportType  | 报表列类型 , 报表表格组件专用                                                                                                | string   | data/title                                                          | -         |

### Events

| 事件名           | 说明                                         | 参数              |
| ---------------- | -------------------------------------------- | ----------------- |
| row-click        | 当某一行被点击时会触发该事件                 | row               |
| selection-change | 用于多选表格，当选择项发生变化时会触发该事件 | multipleSelection |
