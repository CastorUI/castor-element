<template>
  <el-descriptions
    class="margin-top"
    :title="title"
    :column="rowFieldsCount"
    v-bind="{ ...elementProps }"
    border
  >
    <template slot="extra">
      <el-button
        v-for="(item,index) of commands"
        v-show="validateVisible(model,item.visibleValidator)"
        :key="index"
        v-debounce
        v-bind="item.elementProps"
        :disabled="!validate(model,item.statusValidator)"
        :size="item.size"
        class="command"
        @click="$emit(item.command,model)"
      >{{ item.text }}</el-button>
    </template>
    <el-descriptions-item
      v-for="(field, index) in fields"
      :key="index"
      :default-model="model"
      v-bind="{ ...field, ...(field.elementProps || {}) }"
      :element-props="field.elementProps || {}"
      :extend-props="field.extendProps || {}"
    >
      <DescriptionsCtrl
        :key="index"
        :default-model="model"
        v-bind="field"
        :element-props="field.elementProps || {}"
        :extend-props="field.extendProps || {}"
        :custom-components="customComponents"
        :command="(field.extendProps || {}).command"
        v-on="$listeners"
      />
      <!-- <template slot="label">
          <i class="el-icon-user" />
          用户名
        </template>
        kooriookami -->
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
// import debounce from '@/directive/debounce';
import DescriptionsCtrl from './components/CommonDescCtrl';

export default {
  name: 'CaCommonDesc',
  components: { DescriptionsCtrl },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    rowFieldsCount: {
      type: Number,
      default: 2,
    },
    title: {
      type: String,
      default: '',
    },
    model: {
      type: Object,
      default: function () {
        return {};
      },
    },
    fields: {
      type: Array,
      default: function () {
        return [];
      },
    },
    commands: {
      type: Array,
      default: function () {
        return [];
      },
    },
    customCommands: {
      type: Array,
      default: function () {
        return [];
      },
    },
    customComponents: {
      type: Object,
      default: function () {
        return {};
      },
    },
    elementProps: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {}
  },
  watch: {},
  methods: {
    validate(model, statusValidator) {
      return !statusValidator || statusValidator.call(this, model);
    },
    validateVisible(model, visibleValidator) {
      return !visibleValidator || visibleValidator.call(this, model);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.form {
  overflow: hidden;
}
.footer-class {
  background-color: #f0f1f5;
  margin-bottom: 0;
  padding: 8px 16px 8px 0;
}
</style>
