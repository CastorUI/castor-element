<!--  -->
<template>
  <div>
    <el-input-number
      v-model="model[extendProps.from.dataField]"
      :placeholder="'输入'+extendProps.from.label"
      :min="extendProps.from.min || -Infinity"
      :max="extendProps.from.max || Infinity"
      :step="extendProps.from.step || 1"
      :precision="extendProps.from.precision||0"
      clearable
      style="float:left;width:calc(50% - 10px);"
    />
    <el-input-number
      v-model="model[extendProps.to.dataField]"
      :placeholder="'输入'+extendProps.to.label"
      :min="extendProps.to.min || -Infinity"
      :max="extendProps.to.max || Infinity"
      :step="extendProps.to.step || 1"
      :precision="extendProps.to.precision||0"
      clearable
      style="float:right;width:calc(50% - 10px);"
    />
    <div style="width:20px;margin: 0 calc(50% - 10px);text-align:center;">~</div>
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
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
