<template>
  <el-form
    ref="form"
    v-loading="loading"
    class="form"
    :model="model"
    :rules="rules"
    :disabled="operateType === 'view'"
    v-bind="{ labelWidth: '120px', labelPosition: 'right', ...elementProps }"
    @submit.native.prevent
  >
    <div
      v-if="customCommands"
      style="position: absolute; top: 60px; right: 20px; z-index: 99"
    >
      <el-link
        v-for="(item, index) of customCommands"
        :key="index"
        type="primary"
        :disabled="
          item.disableValidator && item.disableValidator.call(this, model)
        "
        v-bind="{ type: 'primary', underline: true, ...item.elementProps }"
        @click.stop="$emit(item.command, model)"
      >
        {{ item.text }}
      </el-link>
    </div>
    <common-form-ctrl
      v-for="item in fields"
      :key="item.dataField ? item.dataField : undefined"
      :type="item.type"
      :label="item.label"
      :operate-type="operateType"
      :model="model"
      :data-field="item.dataField"
      :width="(100 / rowFieldsCount) * (item.columnSpan || 1) + '%'"
      :label-position="elementProps.labelPosition || 'right'"
      :custom-components="customComponents"
      :disable-validator="item.disableValidator"
      :visible-validator="item.visibleValidator"
      :element-props="item.elementProps || {}"
      :extend-props="item.extendProps || {}"
      :on-change="item.onChange"
      v-on="$listeners"
    />
    <el-form-item
      v-if="operateType !== 'view' && commands && commands.length"
      label-width="10px"
      style="width: 100%; padding-right: 10px; float: right; text-align: right"
    >
      <el-button
        v-for="(item, index) of commands"
        v-show="
          !item.visibleValidator || item.visibleValidator.call(this, model)
        "
        :key="index"
        class="command"
        :loading="item.loading"
        :disabled="
          item.disableValidator && item.disableValidator.call(this, model)
        "
        v-bind="item.elementProps"
        @click="$emit(item.command, item)"
      >
        {{ item.text }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import CommonFormCtrl from './components/CommonFormCtrl';
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
    operateType: {
      type: String,
      default: 'add'
    },
    rowFieldsCount: {
      type: Number,
      default: 2
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
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
    elementProps: {
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
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
