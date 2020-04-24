<template>
  <el-form-item
    v-if="visibleValidator && visibleValidator.call(this,model)"
    :label="label?(label+' :'):''"
    :prop="dataField"
    :label-width="label?labelWidth:'0'"
    :style="'float:left;padding-right:10px;minWidth:300px;width:'+width+';'+ heightStyle"
    :required="extendProps && extendProps.required"
  >
    <el-select
      v-if="type === 'select' || type === 'multiSelect'"
      v-model="model[dataField]"
      :placeholder="'选择'+label"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :multiple="type==='multiSelect'"
      :allow-create="extendProps.allowCreate || false"
      clearable
      filterable
      style="width:100%;"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
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
      v-else-if="type === 'selectWithCustomFilter'"
      v-model="model[dataField]"
      :placeholder="'选择'+label"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :multiple="type==='multiSelect'"
      :allow-create="extendProps.allowCreate || false"
      clearable
      filterable
      :filter-method="(query)=> extendProps.filterMethod && handleFilter(query,extendProps.filterMethod,options)"
      style="width:100%;"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
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
      :placeholder="'选择'+label"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :multiple="type==='multiSelect'"
      clearable
      filterable
      style="width:100%;"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
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
      :max="extendProps.maxCheck"
      :disabled="disableValidator && disableValidator.call(this,model)"
      style="width:100%; height: 36px;"
    >
      <el-checkbox
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :disabled="option.disabled"
      />
    </el-checkbox-group>
    <span
      v-else-if="type==='groupTitle'"
      style="font-size:16px;font-weight:bold;color:#006934FF"
    >{{ groupTitle }}</span>
    <span
      v-else-if="type==='text'"
      style="display:inline-block;font-size:14px;height: 36px;line-height: 36px;"
    >{{ options ? options.filter(r => r.value === model[dataField])[0].label : model[dataField] }}</span>
    <hr
      v-else-if="type==='hr'"
      :style="extendProps.style"
    >
    <!-- <div
      v-else-if="type==='diy'"
      :style="extendProps.style"
    >
      // eslint-disable-next-line vue/no-v-html
      <div v-html="extendProps.vHtml" />
    </div> -->
    <el-switch
      v-else-if="type==='switch'"
      v-model="model[dataField]"
      :active-text="extendProps.activeText"
      :inactive-text="extendProps.inactiveText"
      :disabled="disableValidator && disableValidator.call(this,model)"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-date-picker
      v-else-if="type==='dateTimeRange' || type==='dateRange' || type==='date'"
      v-model="model[dataField]"
      :value-format="extendProps.valueFormat"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :type="type.toLocaleLowerCase()"
      :picker-options="type==='date' ? '' : (extendProps.pickerOptions || pickerOptions)"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:100%; "
    />
    <el-input-number
      v-else-if="type==='inputNumber'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :size="extendProps.size"
      :placeholder="'输入'+label"
      :min="extendProps.min || -Infinity"
      :max="extendProps.max || Infinity"
      :step="extendProps.step || 1"
      :precision="extendProps.precision||0"
      clearable
      style="width:100%;"
    />
    <el-cascader
      v-else-if="type==='cascader'"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'选择'+label"
      :options="options"
      style="width:100%; "
      clearable
    />
    <el-input
      v-else-if="type==='complexInput' && currentField.options.filter(r=>r.value === model[currentField.dataField]).length > 0"
      v-model="currentField.options.filter(r=>r.value === model[currentField.dataField])[0].label"
      :class="['complexInput']"
      disabled
      style="width:100%;"
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
    />
    <el-input
      v-else-if="type==='textArea' && extendProps.needTrim"
      v-model.trim="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'输入'+label"
      :rows="extendProps.rows || 2"
      type="textarea"
      clearable
      style="width:100%;"
    />
    <el-input
      v-else-if="type==='textArea' && !extendProps.needTrim"
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'输入'+label"
      :rows="extendProps.rows || 2"
      type="textarea"
      clearable
      style="width:100%;"
    />
    <el-autocomplete
      v-else-if="type==='input' && extendProps.autocomplete && !extendProps.needTrim"
      v-model="model[dataField]"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="extendProps.triggerOnFocus"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'输入'+label"
      clearable
      style="width:100%;"
      @select="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-autocomplete
      v-else-if="type==='input' && extendProps.autocomplete && extendProps.needTrim"
      v-model.trim="model[dataField]"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="extendProps.triggerOnFocus"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'输入'+label"
      clearable
      style="width:100%;"
      @select="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-input
      v-else-if="type==='input' && extendProps.needTrim"
      v-model.trim="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'输入'+label"
      clearable
      style="width:100%;"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
    />
    <el-input
      v-else
      v-model="model[dataField]"
      :disabled="disableValidator && disableValidator.call(this,model)"
      :placeholder="'输入'+label"
      clearable
      style="width:100%;"
      @change="extendProps.onChange && extendProps.onChange.call(this,model)"
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
    labelWidth: {
      type: String,
      default: '120px'
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
    extendProps: {
      type: Object,
      default: function() {
        return {
          valueFormat: 'yyyy-MM-dd'
        };
      }
    },
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end=new Date();
              const start=new Date();
              start.setTime(start.getTime()-3600*1000*24*7);
              picker.$emit('pick',[start,end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end=new Date();
              const start=new Date();
              start.setTime(start.getTime()-3600*1000*24*30);
              picker.$emit('pick',[start,end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end=new Date();
              const start=new Date();
              start.setTime(start.getTime()-3600*1000*24*90);
              picker.$emit('pick',[start,end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    heightStyle() {
      return this.type==='custom'? '':`height:${this.height};`;
    }
  },
  methods: {
    handleClear() {
      this.model[this.dataField]=undefined;
    },
    handleFilter(query,method,options) {
      method.call(this,query,options,this.model);
    },
    querySearch(queryString,cb) {
      var options=this.options;
      queryString=this.extendProps.needTrim&&this.trim(queryString);
      console.log('query',queryString);
      var results=queryString? options.filter(this.createFilter(queryString)):options;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (option) => {
        return (option.value.toLowerCase().indexOf(queryString.toLowerCase())>=0);
      };
    },
    trim(str) {
      return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
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
