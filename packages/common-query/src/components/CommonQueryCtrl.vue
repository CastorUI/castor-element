<template>
  <el-form-item
    :label="label+' :'"
    :prop="dataField"
    :style="'float:left;width:'+width+';'+heightStyle"
  >
    <div :style="{display:'inline-block',width: (extendProps && extendProps.helpText)?'calc(100% - 16px)':'100%'}">
      <el-select
        v-if="type === 'select' || type === 'multiSelect'"
        v-model="model[dataField]"
        :multiple="type==='multiSelect'"
        v-bind="{
          placeholder:`${label}`,
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
          placeholder: `${label}`,
          clearable: true,
          ...elementProps
        }"
        @change="extendProps.onChange && extendProps.onChange.call(this,model)"
      />
    </div>
    <el-tooltip
      v-if="extendProps && extendProps.helpText"
      popper-class="normal"
      effect="dark"
      placement="top"
    >
      <div slot="content">
        {{ extendProps.helpText }}
      </div>
      <svg
        v-if="extendProps && extendProps.helpText"
        style="display:inline-block;margin-left:2px;"
        t="1609742301560"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="9312"
        width="14"
        height="14"
      >
        <path
          d="M512 128c-212.100096 0-384 171.899904-384 384s171.899904 384 384 384 384-171.899904 384-384-171.899904-384-384-384z m233.324544 617.324544c-30.30016 30.30016-65.624064 54.150144-104.92416 70.725632-40.650752 17.250304-83.85024 25.950208-128.400384 25.950208s-87.749632-8.699904-128.39936-25.875456c-39.30112-16.65024-74.550272-40.424448-104.925184-70.724608-30.30016-30.30016-54.150144-65.625088-70.725632-104.925184-17.250304-40.72448-25.950208-83.924992-25.950208-128.475136s8.699904-87.749632 25.875456-128.39936c16.65024-39.30112 40.424448-74.550272 70.724608-104.925184 30.30016-30.30016 65.625088-54.150144 104.925184-70.725632 40.72448-17.250304 83.924992-25.950208 128.475136-25.950208s87.749632 8.699904 128.39936 25.875456c39.30112 16.65024 74.550272 40.424448 104.925184 70.724608 30.30016 30.30016 54.150144 65.625088 70.725632 104.925184 17.250304 40.72448 25.950208 83.924992 25.950208 128.475136s-8.699904 87.749632-25.875456 128.39936c-16.65024 39.30112-40.424448 74.626048-70.79936 104.925184zM508.099584 625.92512c-0.899072 0-1.799168-0.074752-2.699264-0.150528-14.850048-1.424384-25.6512-14.69952-24.225792-29.549568 3.67616-37.425152 31.125504-67.649536 61.350912-97.874944 48.37376-48.374784 49.199104-63.750144 50.024448-80.0256 0.974848-18.97472-6.00064-37.349376-19.800064-51.82464-15.674368-16.499712-37.874688-25.950208-60.899328-25.950208h-0.150528c-44.324864 0.075776-80.475136 36.225024-80.475136 80.625664 0 14.9248-12.075008 26.999808-26.999808 26.999808-14.9248 0-26.999808-12.075008-26.999808-26.999808 0-35.924992 13.949952-69.675008 39.300096-95.099904 25.350144-25.42592 59.10016-39.450624 95.025152-39.525376 37.874688-0.074752 74.474496 15.524864 100.349952 42.749952 24.07424 25.350144 36.374528 57.974784 34.574336 91.875328-1.87392 34.72384-12.524544 62.099456-65.774592 115.349504-26.999808 26.999808-44.024832 47.250432-45.750272 65.025024-1.349632 13.949952-13.124608 24.375296-26.84928 24.375296z m-33.449984 78.974976a32.475136 32.475136 0 1 1 64.950272 0c0 17.93536-14.539776 32.475136-32.475136 32.475136s-32.475136-14.539776-32.475136-32.475136z"
          p-id="9313"
          fill="#909090"
        />
      </svg>
    </el-tooltip>
  </el-form-item>
</template>
<script>
import InputNumberRange from './InputNumberRange';
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
      if (['multiSelect'].indexOf(this.type) > -1) {
        return `min-height:${this.height};`;
      } else {
        return `height:${this.height};`;
      }
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
