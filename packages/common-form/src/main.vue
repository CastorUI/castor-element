<template>
  <el-form
    ref="form"
    class="form"
    :model="model"
    :rules="rules"
    :disabled="operateType==='view'"
    v-bind="{size: 'medium',labelWidth: '120px', labelPosition: 'right', style: 'minWidth:600px;', ...extendProps}"
  >
    <div
      v-if="customCommands"
      style="position: absolute;top: 28px;right: 20px;z-index:99;"
    >
      <el-button
        v-for="(item,index) of customCommands"
        :key="index"
        :disabled="item.disableValidator && item.disableValidator.call(this,model)"
        v-bind="{size:'small',type: 'primary',underline: true, ...item.extendProps}"
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
      :height="extendProps.labelPosition==='top'?'72px':'36px'"
      :group-title="item.groupTitle"
      :current-field="item.currentField"
      :append-field="item.appendField"
      :component-key="item.componentKey"
      :custom-components="customComponents"
      :disable-validator="item.disableValidator"
      :visible-validator="item.visibleValidator"
      :extend-props="item.extendProps"
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
        :loading="item.loading && loading"
        :disabled="item.disableValidator && item.disableValidator.call(this,model)"
        v-bind="{type: 'primary', ...item.extendProps}"
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
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    const dataRules = {};
    this.fields.forEach(r => {
      if (r.dataField && r.rules) {
        dataRules[r.dataField] = r.rules;
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
