# CommonQuery 通用查询

## 基础查询

展示通用查询基础功能的用法。

:::demo `model`用于绑定数据；`commands`用于配置查询事件，默认放置在表单右下角位置；`fields`用于配置查询字段；`label-width`用于配置标签宽度。

```html
<template>
  <ca-common-query
    :ref="search.formId"
    :form-id="search.formId"
    :model="search.model"
    :commands="search.commands"
    :fields="searchFields"
    :elementProps="search.elementProps"
    @handleFilter="handleFilter"
    @handleReset="handleReset"
    @handleUserTypeAutoSelect="handleUserTypeAutoSelect"
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
          sex: [
            {
              value: 1,
              label: '男',
            },
            {
              value: 2,
              label: '女',
            },
          ],
        },
        search: {
          formId: 'basicSearchForm',
          operateType: 'add',
          model: {
            code: '1001',
            en_name: undefined,
            user_sex: 1,
            author_sex: 2,
            valid_end_date: undefined,
            user_type: undefined,
            user_type_auto: undefined,
            enabled: false,
            equipment: [],
            from_num: 200,
            to_num: 500,
            create_date_range: undefined,
            create_split_date_range: undefined,
            create_month_range: undefined,
            create_month: undefined,
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
          elementProps: {
            labelWidth: '120px',
          },
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
            extendProps: {
              helpText: '请输入',
              onFocus: this.handleCodeFocus,
            },
          },
          {
            type: 'input',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            disableValidator: () => true,
            visibleValidator: () => true,
          },
          {
            type: 'switch',
            label: '是否启用',
            dataField: 'enabled',
            columnSpan: 1,
          },
          {
            type: 'radioGroup',
            label: '用户性别',
            dataField: 'user_sex',
            columnSpan: 1,
            extendProps: {
              options: this.optionsMap['sex'],
              onChange: this.handleUserSexChange,
            },
          },
          {
            type: 'radioButtonGroup',
            label: '作者性别',
            dataField: 'author_sex',
            columnSpan: 1,
            extendProps: {
              options: this.optionsMap['sex'],
              onChange: this.handleAuthorSexChange,
            },
          },
          {
            type: 'date',
            label: '有效期',
            dataField: 'valid_end_date',
            columnSpan: 1,
          },
          {
            type: 'year',
            label: '有效年份',
            dataField: 'valid_year',
            columnSpan: 1,
          },
          {
            type: 'multiSelect',
            label: '角色',
            dataField: 'user_role',
            columnSpan: 1,
            extendProps: {
              options: this.optionsMap['user_role'],
            },
          },
          {
            type: 'inputNumberRange',
            dataField: '',
            label: '工程编号',
            columnSpan: 2,
            showType: 'static',
            disableValidator: () => true,
            visibleValidator: () => true,
            elementProps: {
              precision: 2,
              step: 5,
              min: 100,
              max: 1000,
            },
            extendProps: {
              fromField: 'from_num',
              toField: 'to_num',
            },
          },
          {
            type: 'select',
            label: '业务类型',
            dataField: 'user_type',
            columnSpan: 1,
            extendProps: {
              options: this.optionsMap['user_type'],
            },
          },
          {
            type: 'autoComplete',
            label: '业务类型Auto',
            dataField: 'user_type_auto',
            columnSpan: 1,
            elementProps: {
              fetchSuggestions: this.getUserTypesAuto,
            },
            extendProps: {
              onSelect: this.handleUserTypeAutoSelect,
            },
          },
          {
            type: 'dateRange',
            label: '创建日期区间',
            dataField: 'create_date_range',
            columnSpan: 2,
            showType: 'static',
          },
          {
            type: 'splitDateRange',
            label: '独立日期区间',
            dataField: 'create_split_date_range',
            columnSpan: 2,
            showType: 'static',
          },
          {
            type: 'monthRange',
            label: '创建月份区间',
            dataField: 'create_month_range',
            columnSpan: 2,
            showType: 'static',
            elementProps: {
              valueFormat: 'yyyy-MM',
            },
          },
          {
            type: 'month',
            label: '创建月份',
            dataField: 'create_month',
            showType: 'static',
            elementProps: {
              valueFormat: 'yyyy-MM',
            },
          },
          {
            type: 'yearRange',
            label: '创建年份区间',
            dataField: 'create_year_range',
            columnSpan: 2,
            showType: 'static',
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            columnSpan: 2,
            extendProps: {
              options: this.optionsMap['equipment'],
            },
          },
        ];
      },
    },
    methods: {
      handleCodeFocus(model) {
        console.log('handleCodeFocus', model);
      },
      handleUserSexChange(model) {
        console.log('handleUserSexChange', model);
      },
      handleAuthorSexChange(model) {
        console.log('handleAuthorSexChange', model);
      },
      handleFilter() {
        console.log('handleFilter', this.search.model);
      },
      handleReset() {
        this.$refs['searchForm'].$refs['form'].resetFields();
      },
      getUserTypesAuto(queryString, cb) {
        console.log('getUserTypesAuto', queryString);
        setTimeout(() => {
          const res = this.optionsMap['user_type'].map((r) => {
            return {
              value: r.label,
              id: r.value,
            };
          });
          const finalRes = queryString
            ? res.filter(
                (r) =>
                  r.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
              )
            : res;
          cb(finalRes);
        }, 500);
      },
      handleUserTypeAutoSelect(item, model) {
        console.log('handleUserTypeAutoSelect', item, model);
      },
    },
  };
</script>
```

:::

## 动态查询

展示动态查询的用法。

:::demo 设置字段的`showType`属性值为`dynamic`即为动态查询字段。动态查询字段默认不展示，通过`筛选`功能来动态控制。

```html
<template>
  <ca-common-query
    :ref="search.formId"
    :form-id="search.formId"
    :model="search.model"
    :commands="search.commands"
    :fields="searchFields"
    :default-checked-keys="['code']"
    label-width="120px"
    dynamicFieldsPosition="start"
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
          formId: 'dynamicSearchForm',
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
            showType: 'dynamic',
          },
          {
            type: 'input',
            label: '英文名',
            dataField: 'en_name',
            columnSpan: 1,
            showType: 'dynamic',
          },
          {
            type: 'input',
            label: '汉语名',
            dataField: 'cn_name',
            columnSpan: 1,
            showType: 'dynamic',
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
            extendProps: {
              options: this.optionsMap['user_role'],
            },
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
            extendProps: {
              options: this.optionsMap['user_type'],
            },
          },
          {
            type: 'checkboxGroup',
            label: '主打产品',
            dataField: 'equipment',
            columnSpan: 2,
            extendProps: {
              options: this.optionsMap['equipment'],
            },
          },
        ];
      },
    },
    methods: {
      handleFilter() {
        console.log('handleFilter', this.search.model);
      },
      handleReset() {
        this.$refs['searchForm'].$refs['form'].resetFields();
      },
    },
  };
</script>
```

:::

## Attributes

| 参数                  | 说明                                                                                                                           | 类型    | 可选值     | 默认值 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------- | ------ |
| formId                | 表单标识                                                                                                                       | string  | —          | -      |
| loading               | 命令按钮是否显示 loading                                                                                                       | boolean | —          | false  |
| maxFieldWidth         | 表单字段最大宽度                                                                                                               | number  | —          | 230    |
| commandsFloat         | 命令按钮浮动位置                                                                                                               | string  | right\left | right  |
| model                 | 表单数据源                                                                                                                     | object  | —          | {}     |
| fields                | 查询字段集合,见 `Field Options`                                                                                                | array   | —          | []     |
| commands              | 命令集合 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling)                               | array   | —          | []     |
| dynamicFieldsPosition | 动态查询字段插入位置                                                                                                           | string  | start\end  | end    |
| defaultCheckedKeys    | 动态查询默认选中字段                                                                                                           | array   | —          | []     |
| downloadOpt           | 下拉命令项                                                                                                                     | object  | —          | {}     |
| elementProps          | ElementUI 属性,作用于 ElForm 组件 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object  | —          | {}     |

## Field Options

| 参数         | 说明                                                                                                        | 类型   | 可选值         | 默认值    |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------ | -------------- | --------- |
| type         | 类型, 见 `Field Type Options`                                                                               | string | —              | input     |
| label        | 标签                                                                                                        | string | —              | 10        |
| model        | 表单数据源                                                                                                  | object | —              | {}        |
| dataField    | 绑定字段                                                                                                    | string | —              | 0         |
| columnSpan   | 字段所占列数                                                                                                | number | —              | 1         |
| showType     | 展示方式                                                                                                    | string | static/dynamic | static    |
| elementProps | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | string | -              | ascending |
| extendProps  | 扩展属性，参考 `Field ExtendProps Options`                                                                  | object | -              | {}        |

## Field ExtendProps Options

| 参数      | 说明                                                                                    | 类型     | 可选值 | 默认值 |
| --------- | --------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| fromField | 最小值绑定字段，只限于 `type` 为`inputNumberRange`                                      | string   | —      | 0      |
| toField   | 最大值绑定字段，只限于 `type` 为`inputNumberRange`                                      | string   | —      | 0      |
| options   | 选项数据源,限于`type` 为 `select multiSelect checkboxGroup radioGroup radioButtonGroup` | array    | -      | []     |
| onChange  | 值变动时回调事件                                                                        | function | —      | —      |

## Field Type Options

| 类型             | 说明                 |
| ---------------- | -------------------- |
| input            | 输入框               |
| autoComplete     | 自动完成输入框       |
| radioGroup       | 单选框组（默认样式） |
| radioButtonGroup | 单选框组（按钮样式） |
| select           | 下拉框               |
| multiSelect      | 多选下拉框           |
| date             | 日期选择器           |
| month            | 月份选择器           |
| dateRange        | 日期区间选择器       |
| splitDateRange   | 独立日期区间选择器   |
| dateTimeRange    | 时间区间选择器       |
| monthRange       | 月份区间选择器       |
| yearRange        | 年份区间选择器       |
| switch           | 开关                 |
| checkboxGroup    | 复选框组             |
| inputNumberRange | 数字区间选择器       |
