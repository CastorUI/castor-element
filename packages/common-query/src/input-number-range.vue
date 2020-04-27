<!--  -->
<template>
  <div>
    <el-input-number
      v-model="model[fromField]"
      placeholder="起始值"
      :min="extendProps.min || -Infinity"
      :max="extendProps.max || Infinity"
      :step="extendProps.step || 1"
      :precision="extendProps.precision||0"
      clearable
      style="float:left;width:calc(50% - 10px);"
    />
    <el-input-number
      v-model="model[toField]"
      placeholder="终止值"
      :min="extendProps.min || -Infinity"
      :max="extendProps.max || Infinity"
      :step="extendProps.step || 1"
      :precision="extendProps.precision||0"
      clearable
      style="float:right;width:calc(50% - 10px);"
    />
    <div style="width:20px;margin: 0 calc(50% - 10px);text-align:center;">
      ~
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputNumberRange',
  props: {
    model: {
      type: Object,
      default: undefined
    },
    fromField: {
      type: String,
      default: undefined
    },
    toField: {
      type: String,
      default: undefined
    },
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
