## CommonTable 通用表格

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础表格

基础的表格展示用法。

:::demo 当`el-table`元素中注入`data`对象数组后，在`el-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。

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
