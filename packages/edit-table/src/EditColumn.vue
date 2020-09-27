<template>
  <el-table-column
    v-if="type==='expand'"
    :label="label"
    v-bind="{align: 'center', ...elementProps}"
  />
  <el-table-column
    v-else-if="type==='index'"
    :type="type"
    :label="label"
    v-bind="{align: 'center', ...elementProps}"
  />
  <!-- <el-table-column
    v-else-if="type==='custom'"
    :label="label"
    :prop="dataField"
    v-bind="{minWidth: 1, align: 'center', ...elementProps}"
  >
    <template slot-scope="scope">
      <div v-html="dataTemplate(scope.row)" />
    </template>
  </el-table-column> -->
  <el-table-column
    v-else-if="type==='commands'"
    :label="label"
    v-bind="{align: 'center', ...elementProps}"
  >
    <template slot-scope="scope">
      <template v-if="editingRow != null && editingRow.id === scope.row.id">
        <el-link
          v-for="(item,index) of extendProps.editableCommands"
          v-show="!item.visibleValidator || item.visibleValidator.call(this, scope.row)"
          :key="index"
          class="command-link"
          :disabled="item.disableValidator && item.disableValidator.call(this,scope.row)"
          v-bind="item.elementProps"
          @click.stop="handleEmitEvent(item.commandType,item.command,scope.$index,scope.row)"
        >
          {{ item.text }}
        </el-link>
      </template>
      <template v-else>
        <el-link
          v-for="(item,index) of extendProps.commands"
          v-show="!item.visibleValidator || item.visibleValidator.call(this, scope.row)"
          :key="index"
          class="command-link"
          :disabled="editing || (item.disableValidator && item.disableValidator.call(this,scope.row))"
          v-bind="item.elementProps"
          @click.stop="handleEmitEvent(item.commandType,item.command,scope.$index,scope.row)"
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
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...elementProps}"
  >
    <template slot-scope="scope">
      <template v-if="editingRow!=null && scope.row.id === editingRow.id && editable">
        <el-form
          :id="dataField+'Form'"
          :ref="dataField+'Form'"
          class="tree-column-form"
          :model="editingRow"
          :rules="getFormRules(dataField, rules)"
          label-width="0px"
          size="medium"
          :style="'display:inline-block; width:calc(100% - ' + (editingRow.dataLevel||0) * 16 + 'px)'"
          @validate="handleValidateForm"
        >
          <el-form-item
            label
            :prop="dataField"
            label-width="0"
            :inline-message="true"
          >
            <el-input
              v-if="type==='default' || type==='input'"
              v-model="editingRow[dataField]"
              v-inputFocus="extendProps.autoFocus"
              class="edit-table-input"
            />
            <el-input-number
              v-else-if="type==='inputNumber'"
              v-model="editingRow[dataField]"
              v-inputNumberFocus="extendProps.autoFocus"
              v-bind="{precision: 0, style: 'width:100%;', ...elementProps}"
              @focus="$event.target.select()"
            />
            <el-select
              v-if="type === 'select'"
              v-model="editingRow[dataField]"
              v-bind="{clearable: true, filterable: true,style: 'width:100%;',allowCreate: false, placeholder: `选择${label}`, ...elementProps}"
              @clear="editingRow[dataField]=undefined"
            >
              <el-option
                v-for="option in extendProps.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        <template v-if="type === 'select'">
          <template v-if=" elementProps.multiple">
            {{ extendProps.options.filter(r=>(scope.row[dataField]||[]).some(t=>t==r.value)).map(r=>r.label).join() }}
          </template>
          <template v-else>
            {{ (extendProps.options.filter(r=>r.value == scope.row[dataField])[0]||{}).label || '' }}
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
      inserted: function (el, binding) {
        if (binding.value) {
          el.children[2].children[0].focus();
        }
      },
    },
    inputFocus: {
      inserted: function (el, binding) {
        if (binding.value) {
          el.children[0].focus();
        }
      },
    },
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: '',
    },
    dataField: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    dataTemplate: {
      type: Function,
      default: () => {},
    },
    handleEmitEvent: {
      type: Function,
      default: () => {},
    },
    handleValidateForm: {
      type: Function,
      default: () => {},
    },
    editable: {
      type: Boolean,
      default: true,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    editingRow: {
      type: Object,
      default: null,
    },
    elementProps: {
      type: Object,
      default: function () {
        return {};
      },
    },
    extendProps: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    getFormRules(dataField, rules) {
      const formRules = {};
      formRules[dataField] = rules;
      return formRules;
    },
  },
};
</script>
<style lang="scss">
.command-link {
  margin: 0 10px;
}
.tree-column-form {
  .el-form-item {
    margin-bottom: 0;
    .edit-table-input {
      .el-input__inner {
        padding: 1px;
      }
    }
  }
}
</style>
