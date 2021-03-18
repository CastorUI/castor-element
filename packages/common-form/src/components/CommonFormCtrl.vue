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
      v-bind="{clearable: true, filterable: true,style: 'width:100%;',allowCreate: false, placeholder: `选择${label}`, ...elementProps}"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
      @clear="handleClear"
    >
      <el-option
        v-for="option in extendProps.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
    <el-select
      v-else-if="type === 'groupedSelect' "
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{clearable: true, filterable: true,style: 'width:100%;',allowCreate: false, placeholder: `选择${label}`, ...elementProps}"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
      @clear="handleClear"
    >
      <el-option-group
        v-for="group in extendProps.options"
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
      v-bind="elementProps"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    >
      <el-radio
        v-for="option in extendProps.options"
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
      v-bind="{style: 'width:100%; height: 36px;', ...elementProps}"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    >
      <el-checkbox
        v-for="option in extendProps.options"
        :key="option.label"
        :label="option.label"
        :disabled="option.disabled"
      />
    </el-checkbox-group>
    <el-button
      v-else-if="type==='groupTitle'"
      type="text"
      v-bind="{style: 'font-size:16px;font-weight:bold;', ...elementProps}"
    >
      {{ extendProps.groupTitle }}
    </el-button>
    <span
      v-else-if="type==='text'"
      v-bind="{style: 'display:inline-block;font-size:14px;height: 36px;line-height: 36px;', ...elementProps}"
    >{{ extendProps.options ? extendProps.options.filter(r => r.value === model[dataField])[0].label : model[dataField] }}</span>
    <hr
      v-else-if="type==='hr'"
      v-bind="elementProps"
    >
    <!-- <div
      v-else-if="type==='diy'"
      v-bind="elementProps"
    >
      // eslint-disable-next-line vue/no-v-html
      <div v-html="elementProps.vHtml" />
    </div> -->
    <el-switch
      v-else-if="type==='switch'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-date-picker
      v-else-if="type==='dateTimeRange' || type==='dateRange' || type==='monthRange'|| type==='date' || type==='month'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :type="type.toLocaleLowerCase()"
      v-bind="{
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
    <el-input-number
      v-else-if="type==='inputNumber'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{
        placeholder: `输入${label}`,
        precision:0,
        clearable: true,
        style: 'width:100%;',
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-cascader
      v-else-if="type==='cascader'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :options="extendProps.options"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-input
      v-else-if="type==='complexInput' && extendProps.currentField.options.filter(r=>r.value === model[extendProps.currentField.dataField]).length > 0"
      v-model="extendProps.currentField.options.filter(r=>r.value === model[extendProps.currentField.dataField])[0].label"
      :class="['complexInput']"
      v-bind="{
        disabled: true,
        style: 'width:100%;',
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    >
      <template slot="append">
        <span
          v-if="extendProps.appendField.options && model[extendProps.appendField.dataField]"
          :style="'color:'+extendProps.appendField.options.filter(r=>r.value === model[extendProps.appendField.dataField])[0].color+';'"
        >
          <i :class="extendProps.appendField.options.filter(r=>r.value === model[extendProps.appendField.dataField])[0].icon" />
          {{ extendProps.appendField.options.filter(r=>r.value === model[extendProps.appendField.dataField])[0].label.slice(0,5) }}
        </span>
      </template>
    </el-input>
    <component
      :is="customComponents[extendProps.componentKey]"
      v-else-if="type==='custom'"
      :component-data.sync="model[dataField]"
      :model="model"
      :operate-type="operateType"
      v-bind="elementProps"
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
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
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
        ...elementProps
      }"
      @select="onChange && onChange.call(this,model)"
    />
    <el-upload
      v-else-if="type==='avatarUploader'"
      class="avatar-uploader"
      v-bind="elementProps"
    >
      <img
        v-if="model[dataField]"
        :src="model[dataField]"
        :style="{
          height: extendProps.height || '178px',
          width: extendProps.width || '178px',
        }"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
    <el-input
      v-else
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...elementProps
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    >
      <template
        v-if="elementProps.appendText"
        slot="append"
      >
        {{ elementProps.appendText }}
      </template>
    </el-input>
  </el-form-item>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    operateType: {
      type: String,
      default: 'add',
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
    disableValidator: {
      type: Function,
      default: undefined,
    },
    visibleValidator: {
      type: Function,
      default: () => true,
    },
    customComponents: {
      type: Object,
      default: function () {
        return {};
      },
    },
    elementProps: {
      type: Object,
      default: () => {},
    },
    extendProps: {
      type: Object,
      default: () => {},
    },
    onChange: {
      type: Function,
      default: undefined,
    },
  },
  computed: {
    heightStyle() {
      return ['custom', 'groupTitle', 'textArea', 'avatarUploader'].indexOf(
        this.type
      ) > -1
        ? ''
        : `height:${this.height};`;
    },
    pickerOptions() {
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
  methods: {
    handleClear() {
      this.model[this.dataField] = undefined;
    },
    handleFilter(query, method, options) {
      method.call(this, query, options, this.model);
    },
    querySearch(queryString, cb) {
      var options = this.extendProps.options;
      queryString = this.trim(queryString);
      console.log('query', queryString);
      var results = queryString
        ? options.filter(this.createFilter(queryString))
        : options;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (option) => {
        return (
          option.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    trim(str) {
      return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
    },
  },
};
</script>
<style lang="scss">
.complexInput {
  .el-input-group__append {
    padding: 0 5px;
  }
}
.avatar-uploader {
  // width: 178px;
  // height: 178px;
  // display: block;
  overflow: hidden;
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
