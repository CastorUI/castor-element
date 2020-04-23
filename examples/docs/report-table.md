## ReportTable 报表表格

用于展示报表数据，可以自定义表头和动态展示列。
报表表格基于通用表格，基本用法请参考通用表格。这里只展示其独有的用法。

### 多级表头

目前只支持最多三级表头。

:::demo 多级表头使用`reportType`属性来区分数据列和标题列，表头的级别通过嵌套结构来实现。

```html
<template>
  <ca-report-table :dataSource="table.dataList" :columns="tableColumns" />
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
            reportType: 'data',
            type: 'default',
            label: 'ID',
            dataField: 'id',
            columnSpan: 1,
          },
          {
            reportType: 'title',
            label: '项目信息',
            align: 'center',
            children: [
              {
                reportType: 'data',
                type: 'default',
                label: '编号',
                dataField: 'code',
                columnSpan: 1,
              },
              {
                reportType: 'title',
                type: 'default',
                label: '名称',
                dataField: '',
                align: 'center',
                columnSpan: 2,
                children: [
                  {
                    reportType: 'data',
                    type: 'default',
                    label: '英文名',
                    dataField: 'en_name',
                    columnSpan: 1,
                  },
                  {
                    reportType: 'data',
                    type: 'default',
                    label: '汉语名',
                    dataField: 'cn_name',
                    columnSpan: 1,
                  },
                ],
              },
            ],
          },
        ];
      },
    },
    methods: {},
  };
</script>
```

:::

### 动态列

通过控制列是否展示来实现动态效果。

:::demo 使用`showType`属性来标示当前列为静态列或动态列，静态列默认显示，动态列通过`dynamicFields`属性来控制是否显示。

```html
<template>
  <ca-report-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :dynamicFields="table.dynamicFields"
  />
</template>

<script>
  export default {
    data() {
      return {
        table: {
          dynamicFields: ['英文名'],
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
            reportType: 'data',
            showType: 'static',
            type: 'default',
            label: 'ID',
            dataField: 'id',
            columnSpan: 1,
          },
          {
            reportType: 'title',
            showType: 'static',
            label: '项目信息',
            align: 'center',
            children: [
              {
                reportType: 'data',
                showType: 'static',
                type: 'default',
                label: '编号',
                dataField: 'code',
                columnSpan: 1,
              },
              {
                reportType: 'title',
                showType: 'static',
                type: 'default',
                label: '名称',
                dataField: '',
                align: 'center',
                columnSpan: 2,
                children: [
                  {
                    reportType: 'data',
                    showType: 'dynamic',
                    type: 'default',
                    label: '英文名',
                    dataField: 'en_name',
                    columnSpan: 1,
                  },
                  {
                    reportType: 'data',
                    showType: 'dynamic',
                    type: 'default',
                    label: '汉语名',
                    dataField: 'cn_name',
                    columnSpan: 1,
                  },
                ],
              },
            ],
          },
        ];
      },
    },
    methods: {},
  };
</script>
```

:::

### 合并单元格

合并单元法需要设定算法。

:::demo 使用`spanMethod`方法来设置算法。

```html
<template>
  <ca-report-table
    :dataSource="table.dataList"
    :columns="tableColumns"
    :spanMethod="spanMethod"
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
              nationality: '新加坡',
            },
            {
              id: 1002,
              code: 'A2',
              en_name: 'Jack Chen',
              cn_name: '成龙',
              nationality: '香港',
            },
            {
              id: 1003,
              code: 'A3',
              en_name: 'Donnie Yen',
              cn_name: '甄子丹',
              nationality: '香港',
            },
          ],
        },
      };
    },
    computed: {
      tableColumns() {
        return [
          {
            reportType: 'data',
            type: 'default',
            label: 'ID',
            dataField: 'id',
            columnSpan: 1,
          },
          {
            reportType: 'title',
            label: '项目信息',
            align: 'center',
            children: [
              {
                reportType: 'data',
                type: 'default',
                label: '编号',
                dataField: 'code',
                columnSpan: 1,
              },
              {
                reportType: 'title',
                type: 'default',
                label: '名称',
                dataField: '',
                align: 'center',
                columnSpan: 2,
                children: [
                  {
                    reportType: 'data',
                    type: 'default',
                    label: '国籍',
                    dataField: 'nationality',
                    columnSpan: 1,
                  },
                  {
                    reportType: 'data',
                    type: 'default',
                    label: '英文名',
                    dataField: 'en_name',
                    columnSpan: 1,
                  },
                  {
                    reportType: 'data',
                    type: 'default',
                    label: '汉语名',
                    dataField: 'cn_name',
                    columnSpan: 1,
                  },
                ],
              },
            ],
          },
        ];
      },
    },
    methods: {
      spanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 2) {
          if (rowIndex === 1) {
            return {
              rowspan: 2,
              colspan: 1,
            };
          } else if (rowIndex == 2) {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
    },
  };
</script>
```

:::
