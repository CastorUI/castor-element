<template>
  <el-form
    ref="form"
    class="form"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :disabled="operateType==='view'"
    size="medium"
    style="minWidth:600px;"
  >
    <div
      v-if="customCommands"
      style="position: absolute;top: 28px;right: 20px;z-index:99;"
    >
      <el-button
        v-for="(item,index) of customCommands"
        :key="index"
        :icon="item.icon"
        :type="item.linkType || 'primary'"
        size="small"
        :underline="true"
        :disabled="item.disableValidator && item.disableValidator.call(this,model)"
        @click.stop="$emit(item.command,model)"
      >
        {{ item.text }}
      </el-button>
    </div>
    <common-form-ctrl
      v-for="item in fields"
      :key="item.dataField?item.dataField:undefined"
      :type="item.type"
      :label="item.label"
      :model="model"
      :data-field="item.dataField"
      :options="item.options"
      :width="100/rowFieldsCount*(item.columnSpan || 1) + '%'"
      :height="labelPosition==='top'?'72px':'36px'"
      :group-title="item.groupTitle"
      :current-field="item.currentField"
      :append-field="item.appendField"
      :component-key="item.componentKey"
      :disable-validator="item.disableValidator"
      :visible-validator="item.visibleValidator"
      :extend-props="item.extendProps"
      :custom-components="customComponents"
    />
    <el-form-item
      v-if="operateType !== 'view'"
      label-width="10px"
      style="width:100%;padding-right:10px;float:right;text-align:right;"
    >
      <el-button
        v-for="(item,index) of commands"
        v-show="!item.visibleValidator || item.visibleValidator.call(this,model)"
        :key="index"
        class="command"
        :icon="item.icon"
        :disabled="item.disableValidator && item.disableValidator.call(this,model)"
        :type="item.styleType || 'primary'"
        :loading="item.loading && loading"
        :plain="item.extendProps && item.extendProps.plain"
        :circle="item.extendProps && item.extendProps.circle"
        :round="item.extendProps && item.extendProps.round"
        @click="$emit(item.command)"
      >
        {{ item.text }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import CommonFormCtrl from './common-form-ctrl';
export default {
  name: 'CaCommonForm',
  components: {
    CommonFormCtrl
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: function() {
        return {};
      }
    },
    fields: {
      type: Array,
      default: function() {
        return [];
      }
    },
    commands: {
      type: Array,
      default: function() {
        return [];
      }
    },
    customCommands: {
      type: Array,
      default: function() {
        return [];
      }
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    rowFieldsCount: {
      type: Number,
      default: 2
    },
    operateType: {
      type: String,
      default: 'add'
    },
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    const dataRules={};
    this.fields.forEach(r => {
      if(r.dataField&&r.rules) {
        dataRules[r.dataField]=r.rules;
      }
    });
    return {
      rules: dataRules
    };
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.form {
  overflow: hidden;
}
</style>
