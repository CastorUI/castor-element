<template>
  <el-table-column
    v-if="type==='expand'"
    :label="label"
    :width="width"
    :fixed="fixed"
    :align="align"
  />
  <el-table-column
    v-else-if="type==='index'"
    :type="type"
    :label="label"
    :width="width"
    align="center"
  />
  <!-- <el-table-column
    v-else-if="type==='custom'"
    :label="label"
    :width="width"
    :min-width="minWidth"
    :fixed="fixed"
    :align="align"
    :prop="dataField"
  >
    <template slot-scope="scope">
      <div v-html="dataTemplate(scope.row)" />
    </template>
  </el-table-column> -->
  <el-table-column
    v-else-if="type==='commands'"
    :label="label"
    :width="width"
    :fixed="fixed"
    :align="align"
  >
    <template slot-scope="scope">
      <template v-if="editingRow != null && editingRow.id === scope.row.id">
        <el-link
          v-for="(item,index) of editableCommands"
          :key="index"
          class="command-link"
          :type="item.linkType"
          :disabled="item.disableValidator && item.disableValidator.call(this,scope.row)"
          @click.stop="handleEmitEvent(item.commandType,item.command,scope.$index,scope.row)"
        >
          {{ item.text }}
        </el-link>
      </template>
      <template v-else>
        <el-link
          v-for="(item,index) of commands.filter(r =>r.maxLevel===undefined|| r.maxLevel >= scope.row.dataLevel)"
          :key="index"
          class="command-link"
          :type="item.linkType"
          :disabled="item.disableValidator && item.disableValidator.call(this,scope.row)"
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
    :width="width"
    :min-width="minWidth"
    :fixed="fixed"
    :align="align"
    :prop="dataField"
    show-overflow-tooltip
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
              :size="extendProps.size"
              :min="extendProps.min"
              :max="extendProps.max"
              :step="extendProps.step || 1"
              :precision="extendProps.precision||0"
              style="width:100%;"
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
      inserted: function(el,binding) {
        if(binding.value) {
          el.children[2].children[0].focus()
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
    commands: {
      type: Array,
      default: () => []
    },
    editableCommands: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: '1'
    },
    fixed: {
      type: String,
      default: ''
    },
    dataTemplate: {
      type: Function,
      default: () => { }
    },
    align: {
      type: String,
      default: 'center'
    },
    handleEmitEvent: {
      type: Function,
      default: () => { }
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
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    getFormRules(dataField,rules) {
      const formRules={};
      formRules[dataField]=rules;
      return formRules;
    },
    handleValidateForm(validateField,validateStatus) {
      this.$emit('update:validateStatus',validateStatus);
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
