## 共享配置

### command 事件（命令）

command 代表一个可交互的命令或事件，包含两种情况：

- 显示的操作，如通用表格的行内操作，新增操作，上方右侧定制事件等
- 内置的命令，如可编辑表格的编辑命令，保存命令等。

#### Command Options

| 参数             | 说明                                                                                                        | 类型     | 可选值 | 默认值 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | -------- | ------ | ------ |
| text             | 显示文本                                                                                                    | string   | —      | —      |
| command          | 绑定事件名称                                                                                                | string   | —      | —      |
| visibleValidator | 可见性校验,返回 `true` 时可见                                                                               | function | —      | —      |
| disableValidator | 可用性校验,返回 `true` 时禁用                                                                               | function | —      | —      |
| elementProps     | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | object   | —      | —      |
| extendProps      | 扩展属性                                                                                                    | object   | —      | —      |

#### Command Extend Options

| 参数       | 说明     | 类型   | 可选值 | 默认值 |
| ---------- | -------- | ------ | ------ | ------ |
| imageUrl   | 图片地址 | string | —      | —      |
| imageStyle | 图片样式 | string | —      | —      |

### elementProps ElementUI 属性

支持所有的`ElementUI`属性，命名与 `ElementUI` 官方文档属性一致，但统一采用驼峰形式。

- 通用表格
  - 表格参考 `el-table`
  - 表格各列参考 `el-table-column`
  - 分页参考 `el-pagination`
  - 事件（命令）参考 `el-button` 或 `el-link`
    - 新增事件和定制事件参考 `el-button`
    - `type` 为 `link` 和 `commands` 的行内事件参考 `el-link`
- 通用表单
  - 表单参考 `el-form`
  - 事件参考 `el-button`
  - 定制事件参考 `el-button`
  - 字段参考 `el-form-item`
    - `type` 为 `select` 和 `multiSelect` 时同时参考 `el-select`
    - `type` 为 `radioGroup` 时同时参考 `el-radio-group`
    - `type` 为 `checkboxGroup` 时同时参考 `el-checkbox-group`
    - `type` 为 `dateTimeRange` 和 `dateRange` 和 `date` 时同时参考 `el-date-picker`
    - `type` 为 `inputNumber` 时同时参考 `el-input-number`
    - `type` 为 `cascader` 时同时参考 `el-cascader`
    - `type` 为 `input` 和 `textArea` 时同时参考 `el-input`
- 通用查询
  - 表单参考 `el-form`
    - 事件参考 `el-button`
    - 字段参考 `el-form-item`
      - `type` 为 `select` 和 `multiSelect` 时同时参考 `el-select`
      - `type` 为 `dateTimeRange` 和 `dateRange` 和 `monthRange` 和 `month` 和 `date` 时同时参考 `el-date-picker`
      - `type` 为 `switch` 时同时参考 `el-switch`
      - `type` 为 `checkboxGroup` 时同时参考 `el-checkbox-group`
      - `type` 为 `inputNumberRange` 时同时参考 `el-input-number`
      - `type` 为 `input` 和 `textArea` 时同时参考 `el-input`

### Pagination Options

| 参数      | 说明         | 类型   | 可选值               | 默认值    |
| --------- | ------------ | ------ | -------------------- | --------- |
| pageIndex | 分页索引     | number | —                    | 1         |
| pageSize  | 每页显示条数 | number | —                    | 10        |
| total     | 数据条数总计 | number | -                    | 0         |
| sortField | 排序字段     | string | —                    | —         |
| order     | 排序方式     | string | ascending/descending | ascending |
