<template>
  <el-table-column v-if="type === 'expand'" type="expand" v-bind="elementProps">
    <template slot-scope="scope">
      <component
        :is="customComponents[extendProps.componentKey]"
        :component-data.sync="scope.row[dataField]"
        :model="scope.row"
        v-bind="elementProps"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'index'"
    :type="type"
    :label="label"
    v-bind="{ align: 'center', ...elementProps }"
  />
  <el-table-column
    v-else-if="type === 'commands'"
    :label="label"
    v-bind="{ align: 'center', ...elementProps }"
  >
    <template slot-scope="scope">
      <template v-if="editingRow != null && editingRow.id === scope.row.id">
        <el-link
          v-for="(item, index) of extendProps.editableCommands"
          v-show="
            !item.visibleValidator ||
              item.visibleValidator.call(this, scope.row)
          "
          :key="index"
          class="command-link"
          :disabled="
            item.disableValidator && item.disableValidator.call(this, scope.row)
          "
          v-bind="item.elementProps"
          @click.stop="
            handleEmitEvent(
              item.commandType,
              item.command,
              scope.$index,
              scope.row
            )
          "
        >
          {{ item.text }}
        </el-link>
      </template>
      <template v-else>
        <el-link
          v-for="(item, index) of extendProps.commands"
          v-show="
            !item.visibleValidator ||
              item.visibleValidator.call(this, scope.row)
          "
          :key="index"
          class="command-link"
          :disabled="
            editing ||
              (item.disableValidator &&
                item.disableValidator.call(this, scope.row))
          "
          v-bind="item.elementProps"
          @click.stop="
            handleEmitEvent(
              item.commandType,
              item.command,
              scope.$index,
              scope.row
            )
          "
        >
          {{ item.text }}
        </el-link>
      </template>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      <template
        v-if="
          editingRow != null &&
            scope.row.id === editingRow.id &&
            ((scope.row.id < 0 && addable) || (scope.row.id > 0 && editable))
        "
      >
        <el-form
          :id="dataField + 'Form'"
          :ref="dataField + 'Form'"
          class="tree-column-form"
          :model="editingRow"
          :rules="getFormRules(dataField, rules)"
          label-width="0px"
          :style="{
            display: 'inline-block',
            width:
              'calc(100% - ' +
              (extendProps.isExpandColumn ? editingRow.dataLevel : 0) * 16 +
              'px)',
          }"
          @validate="handleValidateForm"
        >
          <el-form-item
            label
            :prop="dataField"
            label-width="0"
            :inline-message="true"
          >
            <el-input
              v-if="type === 'default' || type === 'input'"
              v-model.trim="editingRow[dataField]"
              v-inputFocus="extendProps.autoFocus"
              v-bind="{ style: 'width:100%;', ...elementProps }"
              @focus="extendProps.onFocus &&
                extendProps.onFocus.call(this, editingRow)"
              @change="
                extendProps.onChange &&
                  extendProps.onChange.call(this, editingRow)
              "
              @keyup.enter.native="
                handleEnter(scope.$index, scope.row, dataField)
              "
            />
            <el-input-number
              v-else-if="type === 'inputNumber'"
              v-model="editingRow[dataField]"
              v-inputNumberFocus="extendProps.autoFocus"
              v-bind="{ precision: 0, style: 'width:100%;', ...elementProps }"
              @focus="$event.target.select()"
              @change="
                extendProps.onChange &&
                  extendProps.onChange.call(this, editingRow)
              "
              @keyup.enter.native="
                handleEnter(scope.$index, scope.row, dataField)
              "
            />
            <el-select
              v-if="type === 'select'"
              v-model="editingRow[dataField]"
              v-selectFocus="extendProps.autoFocus"
              v-bind="{
                clearable: true,
                filterable: true,
                style: 'width:100%;',
                allowCreate: false,
                placeholder: `选择${label}`,
                ...elementProps,
              }"
              @change="
                extendProps.onChange &&
                  extendProps.onChange.call(this, editingRow)
              "
              @keyup.enter.native="
                handleEnter(scope.$index, scope.row, dataField)
              "
            >
              <el-option
                v-for="option in extendProps.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-switch
              v-if="type === 'switch'"
              v-model="editingRow[dataField]"
              v-switchFocus="extendProps.autoFocus"
              v-bind="elementProps"
              @change="
                extendProps.onChange &&
                  extendProps.onChange.call(this, editingRow)
              "
              @keyup.enter.native="
                handleEnter(scope.$index, scope.row, dataField)
              "
            />
            <el-date-picker
              v-else-if="
                type === 'dateTimeRange' ||
                  type === 'dateRange' ||
                  type === 'monthRange' ||
                  type === 'date' ||
                  type === 'month' ||
                  type === 'year' ||
                  type === 'datetime'
              "
              v-model="editingRow[dataField]"
              v-bind="{
                type: type.toLocaleLowerCase(),
                startPlaceholder: '开始日期',
                rangeSeparator: '~',
                endPlaceholder: '结束日期',
                valueFormat: 'yyyy-MM-dd',
                pickerOptions: pickerOptions,
                style: 'width:100%;',
                ...elementProps,
              }"
              @change="
                extendProps.onChange &&
                  extendProps.onChange.call(this, editingRow)
              "
              @keyup.enter.native="
                handleEnter(scope.$index, scope.row, dataField)
              "
            />
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <template v-if="['select', 'switch'].includes(type)">
          <template v-if="elementProps.multiple">
            {{
              (
                (
                  extendProps.options.filter((r) =>
                    (scope.row[dataField] || []).some((t) => t == r.value)
                  ) || []
                ).map((r) => r.label) || []
              ).join()
            }}
          </template>
          <template v-else>
            <span
              v-if="
                extendProps.options.some(
                  (r) => r.value === scope.row[dataField]
                )
              "
              :style="
                'color:' +
                  extendProps.options.filter(
                    (r) => r.value === scope.row[dataField]
                  )[0].color +
                  ';'
              "
            >
              <i
                :class="
                  extendProps.options.filter(
                    (r) => r.value === scope.row[dataField]
                  )[0].icon
                "
              />
              {{
                extendProps.options.filter(
                  (r) => r.value === scope.row[dataField]
                )[0].label || ''
              }}
            </span>
            <span v-else>{{ scope.row[dataField] || '' }}</span>
          </template>
        </template>
        <template v-else>
          {{ scope.row[dataField] }}
        </template>
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  directives: {
    inputNumberFocus: {
      inserted: function(el, binding) {
        if (binding.value) {
          el.children[2].children[0].focus();
        }
      }
    },
    inputFocus: {
      inserted: function(el, binding) {
        if (binding.value) {
          el.children[0].focus();
        }
      }
    },
    selectFocus: {
      inserted: function(el, binding) {
        console.log('selectFocus', el, binding);
        if (binding.value) {
          el.children[1].children[0].focus();
        }
      }
    },
    switchFocus: {
      inserted: function(el, binding) {
        console.log('switchFocus', el, binding);
        if (binding.value !== null && binding.value !== undefined) {
          el.children[0].focus();
        }
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: {
      type: String,
      default: ''
    },
    dataField: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    dataTemplate: {
      type: Function,
      default: () => {}
    },
    callback: {
      type: Function,
      default: () => {}
    },
    handleEmitEvent: {
      type: Function,
      default: () => {}
    },
    handleValidateForm: {
      type: Function,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    editingRow: {
      type: Object,
      default: null
    },
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
    elementProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
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
      } else if (this.type === 'date' || this.type === 'datetime') {
        return (
          this.elementProps.pickerOptions || {
            shortcuts: [
              {
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              },
              {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              },
              {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }
            ]
          }
        );
      } else {
        return this.elementProps.pickerOptions;
      }
    }
  },
  methods: {
    getFormRules(dataField, rules) {
      const formRules = {};
      formRules[dataField] = rules;
      return formRules;
    },
    // 回车提交
    handleEnter(index, row, dataField) {
      console.log('handleEnter', index, dataField, this.editingRow[dataField]);
      if (this.$refs[`${dataField}Form`]) {
        this.$refs[`${dataField}Form`].validate(valid => {
          if (valid && this.extendProps.onEnter) {
            this.extendProps.onEnter(index, this.editingRow, () => {
              this.callback(row);
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.command-link {
  margin: 0 10px;
}
.tree-column-form {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
