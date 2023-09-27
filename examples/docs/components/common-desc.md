# CommonDesc 通用描述

## 基础描述

展示通用描述基础功能的用法，常见于详情页的信息展示。

:::demo 待修改 `operateType`用于区分表单的各种操作类型；`model`用于绑定数据；`commands`用于配置表单事件，默认放置在表单右下角位置,若`operateType`为`view`则不显示；`fields`用于配置表单字段；

```html
<template>
  <ca-common-desc
    :fields="descFields"
    :model="description.model"
    :title="description.title"
    :commands="description.commands"
    @handleLink="handleLink"
    @handleQRcode="handleQRcode"
    @handleDownload="handleDownload"
    @handleEditInfo="handleEditInfo"
  />
</template>

<script>
  export default {
    data() {
      return {
        optionsMap: {
          user_type: [
            {
              value: 1,
              label: '供应商',
              color: 'rgb(224,110,29)',
            },
            {
              value: 2,
              label: '经销商',
              color: 'rgb(24,121,255)',
            },
          ],
        },
        description: {
          title: '培训实施详情',
          model: {
            name: '培训项目名称',
            userType: 1,
            contacts: '联系人',
            trainingTime: '2022-10-10~2022-12-12',
            trainingHours: 60,
            address: '培训地点',
            trainingMaterial: 'http://castor.polarwin.cn/',
            trainingForm: '线上',
            refresh: true,
            company: 'spaceX',
            examPaper: '考核试卷',
            evaluationForm: '培训评价表',
          },
          commands: [
            {
              text: '下载签到码',
              command: 'handleQRcode',
              elementProps: {},
            },
            {
              text: '导出',
              command: 'handleDownload',
              elementProps: {},
            },
            {
              text: '编辑',
              command: 'handleEditInfo',
              elementProps: {},
            },
          ],
          // customComponents: {
          //   customTrainHours: CustomTrainHours,
          // },
        },
      };
    },
    computed: {
      descFields() {
        return [
          {
            type: 'default',
            label: '培训主题',
            dataField: 'name',
          },
          {
            type: 'default',
            label: '培训时间',
            dataField: 'trainingTime',
          },
          {
            type: 'keyTag',
            label: '供应商类型',
            dataField: 'userType',
            extendProps: {
              options: this.optionsMap['user_type']
            }
          },
          {
            type: 'default',
            label: '培训地点',
            dataField: 'address',
          },
          {
            type: 'default',
            label: '备注（提醒培训负责人）',
            dataField: 'remark',
          },
          {
            type: 'link',
            label: '培训资料',
            dataField: 'trainingMaterial',
            extendProps: {
              linkCommand: 'handleLink',
            },
          },
          {
            type: 'default',
            label: '培训形式',
            dataField: 'trainingForm',
          },
          {
            type: 'default',
            label: '培训负责人',
            dataField: 'contacts',
          },
          {
            type: 'default',
            label: '考核试卷',
            dataField: 'examPaper',
          },
          {
            type: 'default',
            label: '培训评价表（学员）',
            dataField: 'evaluationForm',
          },
          {
            type: 'button',
            label: '公司信息',
            dataField: 'company',
            extendProps: {
              command: 'handleSwitch',
            },
          },
        ];
      },
    },
    methods: {
      handleLink() {
        window.open(this.description.model.trainingMaterial, '_blank')
      },
      handleQRcode() {
        this.$message('这是QRCODE');
      },
      handleDownload() {
        this.$message({
          message: '恭喜你，下载成功',
          type: 'success',
        });
      },
      handleSwitch() {
        this.description.model.refresh = !this.description.model.refresh
      },
      handleEditInfo() {
        this.$message(JSON.stringify(this.description.model));

      },
    },
  };
</script>
```

:::

## 自定义组件

支持内容为自定义组件，支持获取model

## Attributes

| 参数             | 说明                                                                                                                     | 类型    | 可选值        | 默认值 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- | ------------- | ------ |
| title            | 标题                                                                                                                     | string | —             | ''  |
| rowFieldsCount   | 每行显示字段数                                                                                                           | number  | —             | 2      |
| model            | 数据源                                                                                                                   | object  | —             | {}     |
| fields           | 查询字段集合,见 `Field Options`                                                                                          | array   | —             | []     |
| commands         | 命令集合，显示在头部右侧底部 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling)         | array   | —             | []     |
| customCommands   | 定制命令集合，显示在表单顶部右侧 [详情](http://castor.polarwin.cn/#/component/sharing-config#command-shi-jian-ming-ling) | array   | —             | []     |
| customComponents | 定制组件集合                                                                                                             | array   | —             | []     |
| elementProps     | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing)              | object  | —             | {}     |

## Field Options

| 参数             | 说明                                                                                                        | 类型     | 可选值 | 默认值    |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | -------- | ------ | --------- |
| type             | 类型, 见 `Field Type Options`                                                                               | string   | —      | input     |
| label            | 标签                                                                                                        | string   | —      | 10        |
| dataField        | 绑定字段                                                                                                    | string   | —      | 0         |
| elementProps     | ElementUI 属性 [详情](http://castor.polarwin.cn/#/component/sharing-config#elementprops-elementui-shu-xing) | string   | —      | ascending |
| extendProps      | 扩展属性，参考 `Field ExtendProps Options`                                                                  | object   | —      | {}        |

## Field ExtendProps Options

| 参数              | 说明                                                                                                     | 类型                   | 可选值 | 默认值 |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ---------------------- | ------ | ------ |
| groupTitle        | 分组标题名称，只限于 `type` 为 `groupTitle`                                                              | string                 | —      | —      |
| groupCommands     | 分组命令集合，只限于 `type` 为 `groupTitle`                                                              | array                  | —      | —      |
| componentKey      | 自定义组件名称，只限于 `type` 为 `custom`                                                                | string                 | —      | —      |
| options           | 选项数据源,用于`type` 为 `select multiSelect groupedSelect radioGroup checkboxGroup text status cascade` | array                  | —      | []     |
| currentField      | 当前字段，只限于 `type` 为 `complexInput`                                                                | object                 | —      | —      |
| appendField       | 附加字段，只限于 `type` 为 `complexInput`                                                                | object                 | —      | —      |
| onChange          | 值变动时回调事件                                                                                         | function(model)        | —      | —      |
| onSelect          | 值变动时回调事件，只限于 `type` 为 `autoComplete`                                                        | function(model,item)   | —      | —      |
| getSuggestOptions | 输入时查询匹配结果，只限于 `type` 为 `autoComplete`                                                      | function(queryString)) | —      | —      |
| appendText        | 后缀文本，用于 `type` 为 `input、text`                                                                   | string                 | —      | —      |

## Field Type Options

| 类型           | 说明                         |
| -------------- | ----------------------------|
| text           | 只读文本                     |
| tag            | 只读文本,tag展现形式           |
| keyTag         | 值转换文本tag                 |
| link           | 链接，带图标                  |
| custom         | 定制组件                     |
| button         | 按钮类型                     |
