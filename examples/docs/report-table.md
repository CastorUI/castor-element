## ReportTable 报表表格

用于展示报表数据，可以自定义表头和动态展示列。
报表表格基于通用表格，基本用法请参考通用表格。这里只展示其独有的用法。

### 多级表头

目前只支持最多三级表头。

:::demo

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
