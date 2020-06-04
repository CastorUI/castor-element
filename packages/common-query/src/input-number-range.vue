<!--  -->
<template>
  <div>
    <el-input-number
      v-model="model[fromField]"
      v-bind="{
        size: 'small',
        placeholder: '起始值',
        precision:0,
        clearable: true,
        style: 'float:left;width:calc(50% - 10px);',
        ...elementProps
      }"
    />
    <el-input-number
      v-model="model[toField]"
      v-bind="{
        size: 'small',
        placeholder: '终止值',
        precision:0,
        clearable: true,
        style: 'float:right;width:calc(50% - 10px);',
        ...elementProps
      }"
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
    elementProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
