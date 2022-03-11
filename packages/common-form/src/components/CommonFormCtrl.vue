<template>
  <el-form-item
    v-if="!visibleValidator || visibleValidator.call(this, model)"
    :prop="dataField"
    :style="{
      width: `calc(${width} - ${
        extendProps.marginLeft || (labelPosition === 'top' ? '16px' : '0px')
      })`,
      marginBottom: extendProps.marginBottom || '22px',
      marginLeft:
        extendProps.marginLeft || (labelPosition === 'top' ? '16px' : '0px'),
    }"
    v-bind="{ ...(label ? { label: `${label} :` } : { labelWidth: '0' }) }"
  >
    <el-select
      v-if="type === 'select' || type === 'multiSelect'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      :multiple="type === 'multiSelect'"
      v-bind="{
        clearable: true,
        filterable: true,
        style: 'width:100%;',
        allowCreate: false,
        placeholder: `选择${label}`,
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
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
      v-else-if="type === 'groupedSelect'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      v-bind="{
        clearable: true,
        filterable: true,
        style: 'width:100%;',
        allowCreate: false,
        placeholder: `选择${label}`,
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
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
      v-else-if="type === 'radioGroup'"
      v-model="model[dataField]"
      v-bind="elementProps"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
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
      v-else-if="type === 'checkboxGroup'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      v-bind="{ style: 'width:100%;', ...elementProps }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    >
      <el-checkbox
        v-for="option in extendProps.options"
        :key="option.label"
        :label="option.label"
        :disabled="option.disabled"
      />
    </el-checkbox-group>
    <div
      v-else-if="type === 'groupTitle'"
      v-bind="{
        ...elementProps,
        style:
          'overflow:hidden;width:100%;font-size:16px;font-weight:bold;' +
          (elementProps.style || ''),
      }"
    >
      <div style="float: left">{{ extendProps.groupTitle }}</div>
      <div v-if="extendProps.groupCommands" style="float: right">
        <el-link
          v-for="(item, index) of extendProps.groupCommands"
          v-show="
            !item.visibleValidator || item.visibleValidator.call(this, model)
          "
          :key="index"
          type="primary"
          :disabled="
            item.disableValidator && item.disableValidator.call(this, model)
          "
          v-bind="{ type: 'primary', underline: true, ...item.elementProps }"
          @click.stop="handleGroupCommand.call(this, item, model)"
          v-on="$listeners"
        >
          {{ item.text }}
        </el-link>
      </div>
    </div>
    <span
      v-else-if="type === 'text'"
      v-bind="{ style: 'display:inline-block;', ...elementProps }"
    >{{
      `${
        (extendProps.options
          ? extendProps.options.filter((r) => r.value === model[dataField])[0]
            .label
          : model[dataField]) || '暂无'
      }${extendProps.appendText || ''}`
    }}</span>
    <span
      v-else-if="
        type === 'status' &&
          extendProps.options.some((r) => r.value === model[dataField])
      "
      :style="{
        color: extendProps.options.filter(
          (r) => r.value === model[dataField]
        )[0].color,
      }"
    >
      <i
        :class="
          extendProps.options.filter((r) => r.value === model[dataField])[0]
            .icon
        "
      />
      {{
        extendProps.options.filter((r) => r.value === model[dataField])[0].label
      }}
    </span>
    <hr v-else-if="type === 'hr'" v-bind="elementProps">
    <!-- <div
      v-else-if="type==='diy'"
      v-bind="elementProps"
    >
      // eslint-disable-next-line vue/no-v-html
      <div v-html="elementProps.vHtml" />
    </div> -->
    <el-switch
      v-else-if="type === 'switch'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    />
    <el-date-picker
      v-else-if="
        [
          'dateTimeRange',
          'dateRange',
          'monthRange',
          'date',
          'month',
          'datetime',
        ].indexOf(type) > -1
      "
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      :type="type.toLocaleLowerCase()"
      v-bind="{
        placeholder: '请选择',
        startPlaceholder: '开始日期',
        rangeSeparator: '~',
        endPlaceholder: '结束日期',
        valueFormat: 'yyyy-MM-dd',
        pickerOptions: pickerOptions,
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    />
    <el-input-number
      v-else-if="type === 'inputNumber'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      v-bind="{
        placeholder: `输入${label}`,
        precision: 0,
        clearable: true,
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    />
    <el-cascader
      v-else-if="type === 'cascader'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      :options="extendProps.options"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    />
    <el-input
      v-else-if="
        type === 'complexInput' &&
          extendProps.currentField.options.filter(
            (r) => r.value === model[extendProps.currentField.dataField]
          ).length > 0
      "
      v-model="
        extendProps.currentField.options.filter(
          (r) => r.value === model[extendProps.currentField.dataField]
        )[0].label
      "
      :class="['complexInput']"
      v-bind="{
        disabled: true,
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    >
      <template slot="append">
        <span
          v-if="
            extendProps.appendField.options &&
              model[extendProps.appendField.dataField]
          "
          :style="
            'color:' +
              extendProps.appendField.options.filter(
                (r) => r.value === model[extendProps.appendField.dataField]
              )[0].color +
              ';'
          "
        >
          <i
            :class="
              extendProps.appendField.options.filter(
                (r) => r.value === model[extendProps.appendField.dataField]
              )[0].icon
            "
          />
          {{
            extendProps.appendField.options
              .filter(
                (r) => r.value === model[extendProps.appendField.dataField]
              )[0]
              .label.slice(0, 5)
          }}
        </span>
      </template>
    </el-input>
    <component
      :is="customComponents[extendProps.componentKey]"
      v-else-if="type === 'custom'"
      :component-data.sync="model[dataField]"
      :model="model"
      :operate-type="operateType"
      v-bind="elementProps"
    />
    <el-input
      v-else-if="type === 'textArea'"
      v-model.trim="model[dataField]"
      type="textarea"
      :disabled="disableValidator && disableValidator.call(this, model)"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        rows: 2,
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    />
    <el-autocomplete
      v-else-if="type === 'autoComplete'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      :fetch-suggestions="querySearch"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...elementProps,
      }"
      @select="
        (item) =>
          extendProps.onSelect && extendProps.onSelect.call(this, model, item)
      "
      @clear="
        () => extendProps.onClear && extendProps.onClear.call(this, model)
      "
      @blur="handleAutoCompleteBlur"
    />
    <el-upload
      v-else-if="type === 'avatarUploader'"
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
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-input
      v-else
      v-model.trim="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this, model)"
      v-bind="{
        placeholder: `输入${label}`,
        clearable: true,
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="extendProps.onChange && extendProps.onChange.call(this, model)"
    >
      <template v-if="extendProps.appendText" slot="append">
        {{ extendProps.appendText }}
      </template>
    </el-input>
    <template
      v-if="type === 'autoComplete' && model[dataField] && autoCompleteNoData"
    >
      <div
        role="region"
        class="el-autocomplete-suggestion el-popper"
        style="
          transform-origin: center top;
          z-index: 2084;
          width: 100%;
          position: absolute;
        "
        x-placement="bottom-start"
      >
        <div class="el-scrollbar">
          <div
            class="el-autocomplete-suggestion__wrap el-scrollbar__wrap"
            style="margin-bottom: -17px; margin-right: -17px"
          >
            <ul
              id="el-autocomplete-5354"
              class="el-scrollbar__view el-autocomplete-suggestion__list"
              role="listbox"
            >
              <li id="el-autocomplete-5354-item-0" role="option" class="">
                没有匹配的数据
              </li>
            </ul>
          </div>
          <div class="el-scrollbar__bar is-horizontal">
            <div
              class="el-scrollbar__thumb"
              style="transform: translateX(0%)"
            />
          </div>
          <div class="el-scrollbar__bar is-vertical">
            <div
              class="el-scrollbar__thumb"
              style="transform: translateY(0%)"
            />
          </div>
        </div>
        <div x-arrow="" class="popper__arrow" style="left: 35px" />
      </div>
    </template>
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
    labelPosition: {
      type: String,
      default: 'right'
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
    width: {
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
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
    elementProps: {
      type: Object,
      default: () => {}
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
  data() {
    return {
      autoCompleteNoData: false
    };
  },
  computed: {
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
          this.elementProps.pickerOptions || {
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
    async querySearch(queryString, cb) {
      queryString = this.trim(queryString || '');
      console.log('query', queryString);
      var options = this.extendProps.options;
      let results = [];
      if (options) {
        results = queryString
          ? options.filter(this.createFilter(queryString))
          : options;
      } else if (this.extendProps.getSuggestOptions) {
        results = await this.extendProps.getSuggestOptions(queryString);
      }
      this.autoCompleteNoData = (results || []).length === 0;

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
    },
    handleAutoCompleteBlur(event) {
      console.log('handleAutoCompleteBlur', event);
      if (this.extendProps.onBlur) {
        this.extendProps.onBlur.call(this, this.model, this.autoCompleteNoData);
      }
      this.autoCompleteNoData = false;
    },
    handleGroupCommand(item, model) {
      console.log('handleGroupCommand', item, model);
      console.log('$listeners', this.$listeners);
      this.$emit(item.command, model);
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
