# CommonDesc 通用描述

用于展示详情页信息的组件，提供了丰富的配置项来满足各种展示需求。

#### 更完整的示例

下面的示例涵盖了大部分常用功能。您可以通过顶部的控件来实时改变组件的属性和数据，观察其变化。

:::demo
```html
<template>
  <div>
    <el-form :inline="true" class="demo-controls">
      <el-form-item label="标题">
        <el-input v-model="description.title" style="width: 150px;" />
      </el-form-item>
      <el-form-item label="加载状态">
        <el-switch v-model="loading" />
      </el-form-item>
      <el-form-item label="每行字段数">
        <el-input-number v-model="rowFieldsCount" :min="1" :max="4" style="width: 120px;" />
      </el-form-item>
      <el-form-item label="动态显隐字段">
        <el-switch v-model="description.model.visible" />
      </el-form-item>
       <el-form-item label="切换状态(控制按钮)">
        <el-radio-group v-model="description.model.status">
          <el-radio-button label="active">激活</el-radio-button>
          <el-radio-button label="inactive">禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <ca-common-desc
      :title="description.title"
      :model="description.model"
      :fields="descFields"
      :commands="description.commands"
      :custom-components="description.customComponents"
      :row-fields-count="rowFieldsCount"
      :loading="loading"
      @handleLink="handleLink"
      @handleQRcode="handleQRcode"
      @handleDownload="handleDownload"
      @handleEditInfo="handleEditInfo"
      @handleSwitch="handleSwitch"
    />
  </div>
</template>

<script>
  // 定义一个简单的自定义组件
  const CustomFieldComponent = {
    props: ['model', 'dataField'],
    template: `<div style="color: #409EFF; font-weight: bold;">自定义渲染: {{ model[dataField] }}</div>`,
  };

  export default {
    data() {
      return {
        loading: false,
        rowFieldsCount: 3,
        optionsMap: {
          user_type: [
            { value: 1, label: '供应商', color: 'rgb(224,110,29)' },
            { value: 2, label: '经销商', color: 'rgb(24,121,255)' },
          ],
          status: [
            { value: 'active', label: '激活' },
            { value: 'inactive', label: '禁用' },
          ]
        },
        description: {
          title: '培训实施详情',
          model: {
            name: '培训项目名称',
            userType: 1,
            contacts: '联系人',
            trainingTime: '2022-10-10~2022-12-12',
            date: '2024-08-20T09:04:46+0800',
            trainingHours: 60,
            address: '培训地点',
            trainingMaterial: 'http://castor.polarwin.cn/',
            testLink: 'http://castor.polarwin.cn/',
            trainingForm: '线上',
            company: 'spaceX',
            customData: '这是来自自定义组件的数据',
            tags: '核心, 重要',
            status: 'active',
            visible: true,
            visibleLabel: '一个动态字段',
          },
          commands: [
            {
              text: '下载签到码',
              command: 'handleQRcode',
              elementProps: { type: 'primary' }
            },
            {
              text: '导出',
              command: 'handleDownload',
              // 当 model.status 不为 'active' 时禁用
              statusValidator: (model) => model.status === 'active',
              elementProps: { type: 'success' }
            },
            {
              text: '编辑',
              command: 'handleEditInfo',
              // 当 model.status 不为 'active' 时隐藏
              visibleValidator: (model) => model.status === 'active',
              elementProps: { type: 'warning' }
            },
          ],
          // 注册自定义组件
          customComponents: {
            MyCustomField: CustomFieldComponent,
          },
        },
      };
    },
    computed: {
      descFields() {
        return [
          { type: 'default', label: '培训主题', dataField: 'name' },
          { type: 'default', label: '培训学时', dataField: 'trainingHours', elementProps: { suffix: ' 小时' } },
          { type: 'date', label: '培训日期', dataField: 'date', extendProps: { format: 'YYYY-MM-DD HH:mm' } },
          { type: 'keyTag', label: '供应商类型', dataField: 'userType', extendProps: { options: this.optionsMap['user_type'] } },
          { type: 'tag', label: '标签', dataField: 'tags' },
          { type: 'keyToValue', label: '状态', dataField: 'status', extendProps: { options: this.optionsMap['status'] } },
          { type: 'link', label: '培训资料', dataField: 'trainingMaterial', elementProps: { type: 'primary', icon: 'el-icon-link' }, extendProps: { linkCommand: 'handleLink' } },
          { type: 'button', label: '公司信息', dataField: 'company', extendProps: { command: 'handleSwitch' }, elementProps: { type: 'text' } },
          {
            type: 'custom',
            label: '自定义字段',
            dataField: 'customData',
            extendProps: {
              componentKey: 'MyCustomField', // 对应 customComponents 中的 key
            },
          },
          {
            type: 'default',
            label: '动态字段',
            dataField: 'visibleLabel',
            // 当 description.model.visible 为 false 时隐藏
            visibleValidator: (model) => model.visible,
          },
        ];
      },
    },
    methods: {
      handleLink(data) {
        this.$message.info('打开链接: ' + data.model.trainingMaterial);
      },
      handleQRcode(model) {
        this.$message('触发了 handleQRcode 事件');
      },
      handleDownload(model) {
        this.$message.success('触发了 handleDownload 事件');
      },
      handleSwitch(data) {
        this.$message.info('触发了 handleSwitch 事件，公司: ' + data.model.company);
      },
      handleEditInfo(model) {
        this.$message.warning('触发了 handleEditInfo 事件');
      },
    },
  };
</script>

<style scoped>
.demo-controls {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
}
.demo-controls .el-form-item {
  margin-bottom: 0;
}
</style>
```
:::

## Attributes

| 参数             | 说明                                                                 | 类型    | 默认值 |
| ---------------- | -------------------------------------------------------------------- | ------- | ------ |
| title            | 标题，显示在描述列表的顶部                                           | string  | ''     |
| model            | 数据源对象                                                           | object  | {}     |
| fields           | 字段配置数组，详见 `Field Options`                                   | array   | []     |
| commands         | 命令按钮配置数组，显示在头部右侧，详见 `Command Options`             | array   | []     |
| rowFieldsCount   | 每行显示的字段数量                                                   | number  | 2      |
| loading          | 是否显示加载中状态                                                   | boolean | false  |
| customComponents | 自定义组件集合，用于 `type` 为 `custom` 的字段                       | object  | {}     |
| elementProps     | 传递给 `el-descriptions` 组件的[原生属性](https://element.eleme.cn/#/zh-CN/component/descriptions#descriptions-attributes) | object  | {}     |

## Field Options

| 参数             | 说明                                                                                             | 类型     | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------ | -------- | ------ |
| type             | 字段展示类型, 详见 `Field Type Options`                                                          | string   | 'default' |
| label            | 字段的标签文本                                                                                   | string   | ''     |
| dataField        | 绑定 `model` 中的字段名                                                                          | string   | ''     |
| elementProps     | 传递给内部 `el-descriptions-item` 或其他 ElementUI 组件的[原生属性](https://element.eleme.cn/) | object   | {}     |
| extendProps      | 扩展属性，用于特定 `type` 的高级配置，详见 `Field ExtendProps Options`                           | object   | {}     |
| visibleValidator | `(model) => boolean`，一个函数，用于控制该字段是否显示。返回 `true` 显示，`false` 隐藏。         | function | -      |

## Field Type Options

| 类型         | 说明                                                               |
| ------------ | ------------------------------------------------------------------ |
| `default`    | 默认文本展示。若值为空则显示“暂无”。可通过 `elementProps.suffix` 设置后缀，如 `{ suffix: '元' }` |
| `tag`        | 使用 `el-tag` 展示文本                                             |
| `keyTag`     | 根据 `extendProps.options` 里的 `value` 匹配 `label` 和 `color`，并用 `el-tag` 展示 |
| `keyToValue` | 根据 `extendProps.options` 里的 `value` 匹配 `label` 并用文本展示  |
| `link`       | 使用 `el-link` 展示一个可点击的链接                                |
| `date`       | 将[日期格式](https://day.js.org/docs/en/display/format)的字符串或时间戳格式化后展示 |
| `button`     | 使用 `el-button` 展示一个可点击的按钮                              |
| `custom`     | 渲染一个自定义的 Vue 组件                                          |

## Field ExtendProps Options

| 参数           | 适用 `type`               | 说明                                                              |
| -------------- | ------------------------- | ----------------------------------------------------------------- |
| `options`      | `keyTag`, `keyToValue`    | 选项数据源，格式为 `[{ value: any, label: string, color: string }]` |
| `linkCommand`  | `link`                    | 点击链接时派发的事件名称                                          |
| `command`      | `button`                  | 点击按钮时派发的事件名称                                          |
| `format`       | `date`                    | 日期显示格式，默认为 `YYYY-MM-DD`                                 |
| `componentKey` | `custom`                  | 在 `customComponents` 对象中注册的自定义组件的键名                |

## Command Options

`commands` 数组中的每个对象都是一个命令按钮的配置。

| 参数             | 说明                                                                                             | 类型     | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------ | -------- | ------ |
| text             | 按钮上显示的文本                                                                                 | string   | ''     |
| command          | 点击按钮时派发的事件名称                                                                         | string   | ''     |
| elementProps     | 传递给 `el-button` 组件的[原生属性](https://element.eleme.cn/#/zh-CN/component/button#attributes) | object   | {}     |
| visibleValidator | `(model) => boolean`，一个函数，用于控制该按钮是否显示。返回 `true` 显示，`false` 隐藏。         | function | -      |
| statusValidator  | `(model) => boolean`，一个函数，用于控制该按钮是否禁用。返回 `true` 可用，`false` 禁用。         | function | -      |

## Events

| 事件名称        | 说明                                                                     | 回调参数                               |
| --------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `[command]`     | 由 `commands` 配置的按钮点击时触发，`[command]` 为配置的 `command` 字符串 | `(model)` - 当前组件的 `model` 数据对象 |
| `[linkCommand]` | 由 `type` 为 `link` 的字段点击时触发，`[linkCommand]` 为配置的 `linkCommand` 字符串 | `({ model })` - 包含 `model` 的对象     |
| `[command]`     | 由 `type` 为 `button` 的字段点击时触发，`[command]` 为配置的 `command` 字符串 | `({ model })` - 包含 `model` 的对象     |
''