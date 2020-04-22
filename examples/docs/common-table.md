## CommonTable 通用表格

用于展示多条结构类似的数据，可对数据进行排序或其他自定义操作。

### 基础用法

展示表格的基础用法。

:::demo 当`ca-common-table`元素中注入`dataSource`对象数组和`columns`列数组后即可填入数据。在列数组中，`type`属性用来定义列类型，`label`属性用来定义列名，`dataField`属性用来定义数据字段，`columnSpan`属性用来定义列占用的宽度占比。

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
              id: 1,
              code: 'A1',
              name: '上海燃气一期工程',
            },
            {
              id: 2,
              code: 'A2',
              name: '上海燃气二期工程',
            },
            {
              id: 3,
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
