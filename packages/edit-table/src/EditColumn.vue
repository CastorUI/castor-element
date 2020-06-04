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
          v-for="(item,index) of extendProps.commands.filter(r =>r.maxLevel===undefined|| r.maxLevel >= scope.row.dataLevel)"
          :key="index"
          class="command-link"
          :disabled="item.disableValidator && item.disableValidator.call(this,scope.row)"
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
          style="width:100%;"
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
              class="edit-table-input"
            />
            <el-input-number
              v-else-if="type==='inputNumber'"
              v-model="editingRow[dataField]"
              v-inputNumberFocus="autoFocus"
              v-bind="{precision: 0, style: 'width:100%;', ...elementProps}"
              @focus="$event.target.select()"
            />
          </el-form-item>
        </el-form>
      </template>
      <template v-else>
        {{ scope.row[dataField] }}
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
    handleEmitEvent: {
      type: Function,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    editing: {
      type: Boolean,
      default: false
    },
    editingRow: {
      type: Object,
      default: null
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
  methods: {
    getFormRules(dataField, rules) {
      const formRules = {};
      formRules[dataField] = rules;
      return formRules;
    },
    handleValidateForm(validateField, validateStatus) {
      this.$emit('update:validateStatus', validateStatus);
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
    .edit-table-input {
      .el-input__inner {
        padding: 1px;
      }
    }
  }
}
</style>
