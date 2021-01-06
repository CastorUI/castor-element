<template>
  <el-form-item
    :label="label+' :'"
    :prop="dataField"
    :style="'float:left;width:'+width+';height:'+height+';'"
  >
    <el-select
      v-if="type === 'select' || type === 'multiSelect'"
      v-model="model[dataField]"
      :multiple="type==='multiSelect'"
      v-bind="{
        placeholder:`${label}`,
        size:'small',
        style:'width:100%;',
        clearable:true,
        filterable: true,
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    >
      <el-option
        v-for="option in extendProps.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
    <el-date-picker
      v-else-if="type==='dateTimeRange' || type==='dateRange' || type==='monthRange'|| type==='date' || type==='month'"
      v-model="model[dataField]"
      :type="type.toLocaleLowerCase()"
      v-bind="{
        size:'small',
        startPlaceholder: '开始日期', 
        rangeSeparator: '~', 
        endPlaceholder: '结束日期', 
        valueFormat: 'yyyy-MM-dd',
        pickerOptions: pickerOptions,
        style: 'width:100%;',
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-switch
      v-else-if="type==='switch'"
      v-model="model[dataField]"
      v-bind="{style: 'width:40px;', ...elementProps}"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-checkbox-group
      v-else-if="type==='checkboxGroup'"
      v-model="model[dataField]"
      class="query-item"
      v-bind="{style: 'width:100%;', ...elementProps}"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    >
      <el-checkbox
        v-for="option in extendProps.options"
        :key="option.value"
        :label="option.label"
        :disabled="option.disabled"
      />
    </el-checkbox-group>
    <input-number-range
      v-else-if="type==='inputNumberRange'"
      class="query-item"
      style="width:100%;"
      :model="model"
      :from-field="extendProps.fromField"
      :to-field="extendProps.toField"
      :element-props="elementProps"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-input
      v-else
      v-model="model[dataField]"
      class="filter-item filter-list query-item"
      v-bind="{
        size: 'small',
        placeholder: `${label}`,
        clearable: true,
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
  </el-form-item>
</template>
<script>
import InputNumberRange from './input-number-range';
export default {
  components: { InputNumberRange },
  props: {
    type: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    model: {
      type: Object,
      default: undefined,
    },
    dataField: {
      type: String,
      default: undefined,
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: '36px',
    },
    elementProps: {
      type: Object,
      default: function () {
        return {
          valueFormat: 'yyyy-MM-dd',
        };
      },
    },
    extendProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    heightStyle() {
      return `height:${this.height};`;
    },
    pickerOptions: function () {
      if (this.type === 'dateTimeRange' || this.type === 'dateRange') {
        return (
          this.elementProps.pickerOptions || {
            shortcuts: [
              {
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                },
              },
              {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                },
              },
              {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                },
              },
            ],
          }
        );
      } else if (this.type === 'monthRange') {
        return (
          this.elementProps.pickerOptions || {
            shortcuts: [
              {
                text: '本月',
                onClick(picker) {
                  picker.$emit('pick', [new Date(), new Date()]);
                },
              },
              {
                text: '今年至今',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date(new Date().getFullYear(), 0);
                  picker.$emit('pick', [start, end]);
                },
              },
              {
                text: '最近六个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setMonth(start.getMonth() - 6);
                  picker.$emit('pick', [start, end]);
                },
              },
            ],
          }
        );
      } else {
        return {};
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-select--small,
.el-input--small {
  line-height: 13px;
}
</style>
