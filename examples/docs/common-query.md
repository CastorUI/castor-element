## CommonQuery 通用查询

### 基础

展示通用查询基础功能的用法。

:::demo `operateType`用于区分表单的各种操作类型；`model`用于绑定数据；`commands`用于配置表单事件，默认放置在表单右下角位置,若`operateType`为`view`则不显示；`fields`用于配置表单字段；

```html
<template>
  <ca-common-query
    :ref="search.formId"
    :model="search.model"
    :commands="search.commands"
    :fields="searchFields"
    label-width="120px"
    @handleFilter="handleFilter"
    @handleReset="handleReset"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          user_role: [
            {
              value: 1,
              label: '供应商',
            },
            {
              value: 2,
              label: '经销商',
            },
            {
              value: 3,
              label: '用户',
            },
            {
              value: 4,
              label: '管理员',
            },
          ],
          user_type: [
            {
              value: 1,
              label: '供应商',
            },
            {
              value: 2,
              label: '经销商',
            },
          ],
          equipment: [
            {
              label: '双压记录仪',
              disabled: false,
            },
            {
              label: '压力远传处理仪',
              disabled: false,
            },
          ],
        },
        search: {
          formId: 'editForm',
          operateType: 'add',
          model: {
            code: '1001',
            en_name: undefined,
            cn_name: undefined,
            valid_end_date: undefined,
            user_type: undefined,
            enabled: false,
            equipment: [],
          },
          commands: [
            {
              text: '查询',
              command: 'handleFilter',
              icon: 'el-icon-search',
            },
            {
              text: '重置',
              command: 'handleReset',
              icon: 'el-icon-refresh',
            },
          ],
        },
      };
    },
    computed: {
      searchFields() {
        return [
          {
            type: 'input',
            label: '编号',
            dataField: 'code',
            columnSpan: 1,
          },
          {
            type: 'input',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
          },
          {
            type: 'input',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
          },
          {
            type: 'date',
            label: '有效期',
            dataField: 'valid_end_date',
            columnSpan: 1,
          },
          {
            type: 'multiSelect',
            label: '角色',
            dataField: 'user_role',
            columnSpan: 1,
            options: this.optionsMap['user_role'],
          },
          {
            type: 'switch',
            label: '是否启用',
            dataField: 'enabled',
            columnSpan: 1,
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            options: this.optionsMap['user_type'],
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            options: this.optionsMap['equipment'],
          },
        ];
      },
    },
    methods: {
      handleFilter() {
        this.table.pagination.pageIndex = 1;
        this.getList();
      },
      handleReset() {
        this.$refs['queryForm'].$refs['form'].resetFields();
      },
    },
  };
</script>
```

:::
