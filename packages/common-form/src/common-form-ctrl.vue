<template>
  <el-form-item
    v-if="!visibleValidator || visibleValidator.call(this,model)"
    :prop="dataField"
    :style="'float:left;padding-right:10px;minWidth:300px;width:'+width+';'+ heightStyle"
    v-bind="{ ...(label ? {label: `${label} :`} : {labelWidth: '0'})}"
  >
    <el-select
      v-if="type === 'select' || type === 'multiSelect'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :multiple="type==='multiSelect'"
      v-bind="{clearable: true, filterable: true,style: 'width:100%;',allowCreate: false, placeholder: `选择${label}`, ...extendProps}"
      @change="onChange && onChange.call(this,model)"
      @clear="handleClear"
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
    <el-select
      v-else-if="type === 'groupedSelect' "
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{clearable: true, filterable: true,style: 'width:100%;',allowCreate: false, placeholder: `选择${label}`, ...extendProps}"
      @change="onChange && onChange.call(this,model)"
      @clear="handleClear"
    >
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="option in group.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-option-group>
    </el-select>
    <el-radio-group
      v-else-if="type==='radioGroup'"
      v-model="model[dataField]"
      v-bind="extendProps"
      @change="onChange && onChange.call(this,model)"
    >
      <el-radio
        v-for="option in options"
        :key="option.value"
        :label="option.value"
      >
        {{ option.label }}
      </el-radio>
    </el-radio-group>
    <el-checkbox-group
      v-else-if="type==='checkboxGroup'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{style: 'width:100%; height: 36px;', ...extendProps}"
      @change="onChange && onChange.call(this,model)"
    >
      <el-checkbox
        v-for="option in options"
        :key="option.label"
        :label="option.label"
        :disabled="option.disabled"
      />
    </el-checkbox-group>
    <el-button
      v-else-if="type==='groupTitle'"
      type="text"
      v-bind="{style: 'font-size:16px;font-weight:bold;', ...extendProps}"
    >
      {{ groupTitle }}
    </el-button>
    <span
      v-else-if="type==='text'"
      v-bind="{style: 'display:inline-block;font-size:14px;height: 36px;line-height: 36px;', ...extendProps}"
    >{{ options ? options.filter(r => r.value === model[dataField])[0].label : model[dataField] }}</span>
    <hr
      v-else-if="type==='hr'"
      v-bind="extendProps"
    >
    <!-- <div
      v-else-if="type==='diy'"
      v-bind="extendProps"
    >
      // eslint-disable-next-line vue/no-v-html
      <div v-html="extendProps.vHtml" />
    </div> -->
    <el-switch
      v-else-if="type==='switch'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      @change="onChange && onChange.call(this,model)"
    />
    <el-date-picker
      v-else-if="type==='dateTimeRange' || type==='dateRange' || type==='monthRange'|| type==='date' || type==='month'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :type="type.toLocaleLowerCase()"
      v-bind="{
        startPlaceholder: '开始日期', 
        rangeSeparator: '至', 
        endPlaceholder: '结束日期', 
        valueFormat: 'yyyy-MM-dd',
        pickerOptions: pickerOptions,
        style: 'width:100%;',
        ...extendProps
      }"
      @change="onChange && onChange.call(this,model)"
    />
    <el-input-number
      v-else-if="type==='inputNumber'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{
        placeholder: `输入${label}`,
        precision:0,
        clearable: true,
        style: 'width:100%;',
        ...extendProps
      }"
      @change="onChange && onChange.call(this,model)"
    />
    <el-cascader
      v-else-if="type==='cascader'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :options="options"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...extendProps
      }"
      @change="onChange && onChange.call(this,model)"
    />
    <el-input
      v-else-if="type==='complexInput' && currentField.options.filter(r=>r.value === model[currentField.dataField]).length > 0"
      v-model="currentField.options.filter(r=>r.value === model[currentField.dataField])[0].label"
      :class="['complexInput']"
      v-bind="{
        disabled: true,
        style: 'width:100%;',
        ...extendProps
      }"
      @change="onChange && onChange.call(this,model)"
    >
      <template slot="append">
        <span
          v-if="appendField.options && model[appendField.dataField]"
          :style="'color:'+appendField.options.filter(r=>r.value === model[appendField.dataField])[0].color+';'"
        >
          <i :class="appendField.options.filter(r=>r.value === model[appendField.dataField])[0].icon" />
          {{ appendField.options.filter(r=>r.value === model[appendField.dataField])[0].label.slice(0,5) }}
        </span>
      </template>
    </el-input>
    <component
      :is="customComponents[componentKey]"
      v-else-if="type==='custom'"
      :component-data.sync="model[dataField]"
      :model="model"
      :operate-type="operateType"
      v-bind="extendProps"
    />
    <el-input
      v-else-if="type==='textArea'"
      v-model="model[dataField]"
      type="textarea"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        rows: 2,
        style: 'width:100%;',
        ...extendProps
      }"
      @change="onChange && onChange.call(this,model)"
    />
    <el-autocomplete
      v-else-if="type==='autocomplete'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :fetch-suggestions="querySearch"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...extendProps
      }"
      @select="onChange && onChange.call(this,model)"
    />
    <el-input
      v-else
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...extendProps
      }"
      @change="onChange && onChange.call(this,model)"
    >
      <template
        v-if="extendProps.appendText"
        slot="append"
      >
        {{ extendProps.appendText }}
      </template>
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: undefined
    },
    label: {
      type: String,
      default: undefined
    },
    operateType: {
      type: String,
      default: 'add'
    },
    model: {
      type: Object,
      default: undefined
    },
    dataField: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      default: undefined
    },
    width: {
      type: String,
      default: undefined
    },
    height: {
      type: String,
      default: '36px'
    },
    groupTitle: {
      type: String,
      default: undefined
    },
    disableValidator: {
      type: Function,
      default: undefined
    },
    visibleValidator: {
      type: Function,
      default: () => true
    },
    currentField: {
      type: Object,
      default: function() {
        return {};
      }
    },
    appendField: {
      type: Object,
      default: function() {
        return {};
      }
    },
    componentKey: {
      type: String,
      default: ''
    },
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
    extendProps: {
      type: Object,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    heightStyle() {
      return ['custom', 'groupTitle', 'textArea'].indexOf(this.type) > -1
        ? ''
        : `height:${this.height};`;
    },
    pickerOptions() {
      if (this.type === 'dateTimeRange' || this.type === 'dateRange') {
        return (
          this.extendProps.pickerOptions || {
            shortcuts: [
              {
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }
            ]
          }
        );
      } else if (this.type === 'monthRange') {
        return (
          this.extendProps.pickerOptions || {
            shortcuts: [
              {
                text: '本月',
                onClick(picker) {
                  picker.$emit('pick', [new Date(), new Date()]);
                }
              },
              {
                text: '今年至今',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date(new Date().getFullYear(), 0);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '最近六个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setMonth(start.getMonth() - 6);
                  picker.$emit('pick', [start, end]);
                }
              }
            ]
          }
        );
      } else {
        return {};
      }
    }
  },
  methods: {
    handleClear() {
      this.model[this.dataField] = undefined;
    },
    handleFilter(query, method, options) {
      method.call(this, query, options, this.model);
    },
    querySearch(queryString, cb) {
      var options = this.options;
      queryString = this.trim(queryString);
      console.log('query', queryString);
      var results = queryString
        ? options.filter(this.createFilter(queryString))
        : options;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return option => {
        return (
          option.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    trim(str) {
      return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
    }
  }
};
</script>
<style lang="scss">
.complexInput {
  .el-input-group__append {
    padding: 0 5px;
  }
}
</style>
