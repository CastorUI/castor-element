<template>
  <el-form
    class="form"
    ref="form"
    :model="model"
    :rules="rules"
    :id="formId"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :disabled="operateType==='view'"
    size="medium"
    style="minWidth:600px;"
  >
    <div v-if="customCommands" style="position: absolute;top: 28px;right: 20px;z-index:99;">
      <el-button
        v-for="(item,index) of customCommands"
        :key="index"
        :icon="item.icon"
        :type="item.linkType || 'primary'"
        size="small"
        :underline="true"
        :disabled="item.disableValidator && item.disableValidator.call(this,model)"
        @click.stop="$emit(item.command,model)"
      >{{ item.text }}</el-button>
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
      :groupTitle="item.groupTitle"
      :currentField="item.currentField"
      :appendField="item.appendField"
      :componentKey="item.componentKey"
      :disableValidator="item.disableValidator"
      :visibleValidator="item.visibleValidator"
      :extendProps="item.extendProps"
      :customComponents="customComponents"
    />
    <el-form-item
      v-if="operateType !== 'view'"
      label-width="10px"
      style="width:100%;padding-right:10px;float:right;text-align:right;"
    >
      <el-button
        v-for="(item,index) of commands"
        :key="index"
        :icon="item.icon"
        :disabled="item.disableValidator && item.disableValidator.call(this,model)"
        v-show="item.visibleValidator && item.visibleValidator.call(this,model)"
        :type="item.styleType || 'primary'"
        class="command"
        :loading="item.loading && loading"
        :plain="item.extendProps && item.extendProps.plain"
        :circle="item.extendProps && item.extendProps.circle"
        :round="item.extendProps && item.extendProps.round"
        @click="$emit(item.command,model)"
      >{{ item.text }}</el-button>
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
    formId: {
      type: String,
      default: null
    },
    dataSource: {
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
    visibleValidator: {
      type: Function,
      default: () => true
    },
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const dataModel = {};
    const dataRules = {};
    this.fields.forEach(r => {
      if (r.dataField) {
        dataModel[r.dataField] = r.defaultValue ? r.defaultValue : undefined;
        dataRules[r.dataField] = r.rules ? r.rules : undefined;
      }
    });
    return {
      model: { ...dataModel, ...this.dataSource },
      rules: dataRules
    };
  },
  watch: {
    dataSource: {
      handler: function() {
        if (this.model && this.dataSource) {
          this.model = { ...this.model, ...this.dataSource };
        }
      },
      deep: true,
      immediate: false
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.form {
  overflow: hidden;
}
</style>
