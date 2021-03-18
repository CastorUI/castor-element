<template>
  <div class="tree-table-container">
    <div class="table-add-command">
      <el-button
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        :disabled="editing || (addCommand.disableValidator && addCommand.disableValidator.call(this))"
        v-bind="{type: 'primary', icon: 'el-icon-plus', ...addCommand.elementProps}"
        @click="handleAdd"
      >
        {{ addCommand.text }}
      </el-button>
    </div>
    <el-table
      v-if="tableHackVisible"
      ref="elTreeTable"
      v-loading="loading"
      :data="decoratedDataSource"
      style="height:auto;padding:1px;"
      v-bind="{border: true,rowKey:'id', ...elementProps}"
      @row-click="handleRowClick"
      @current-change="handleCurrentChange"
    >
      <tree-column
        v-for="(item,index) of columns"
        :key="index"
        :label="item.label"
        :data-field="item.dataField"
        :rules="item.rules"
        :type="item.type"
        :data-template="item.dataTemplate"
        :editable="item.editable"
        :addable="item.addable"
        :editing="editing"
        :editing-row="editingRow"
        :handle-emit-event="handleEmitEvent"
        :handle-validate-form="handleValidateForm"
        :commands="item.commands"
        :element-props="item.elementProps"
        :extend-props="item.extendProps"
        v-on="$listeners"
      />
      <template
        v-if="decoratedDataSource && decoratedDataSource.length && appendContent"
        v-slot:append
      >
        <span style="padding: 0 10px">{{ appendContent }} </span>
      </template>
    </el-table>
  </div>
</template>

<script>
import EditColumn from './../../components/EditColumn';
export default {
  name: 'CaTreeEditTable',
  components: {
    'tree-column': EditColumn,
  },
  props: {
    editTriggerMode: {
      type: String,
      default: 'manual',
      validator: (value) => ['manual', 'auto'].indexOf(value) > -1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    addInside: { type: Boolean, default: true },
    addInsidePosition: {
      type: String,
      default: 'beforeFirst',
      validator: function (value) {
        return ['beforeFirst', 'afterLast'].indexOf(value) > -1;
      },
    },
    addCommand: {
      type: Object,
      default: () => {},
    },
    editCommand: {
      type: Object,
      default: () => {},
    },
    saveCommand: {
      type: Object,
      default: () => {},
    },
    appendContent: {
      type: String,
      default: '',
    },
    elementProps: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      tableHackVisible: true,
      decoratedDataSource: [],
      editingRow: null,
      formValidateResult: {},
      newId: -10001,
    };
  },
  computed: {
    editing() {
      return this.editingRow != null;
    },
  },
  watch: {
    dataSource: {
      handler() {
        this.decoratedDataSource = this.decorateTreeListData(
          this.dataSource,
          1,
          null
        );
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (this.editTriggerMode === 'auto') {
      window.addEventListener('click', this.handleOuterRowChange, false);
    }
  },
  destroyed() {
    if (this.editTriggerMode === 'auto') {
      window.removeEventListener('click', this.handleOuterRowChange, false);
    }
  },
  methods: {
    decorateTreeListData(dataList, dataLevel, parentRow) {
      return dataList.map((r) => {
        if (r.children && r.children.length) {
          return {
            ...r,
            operateType: r.operateType || 'view',
            dataLevel,
            children: this.decorateTreeListData(r.children, dataLevel + 1, r),
            parentRow,
          };
        } else {
          return {
            ...r,
            operateType: r.operateType || 'view',
            dataLevel,
            children: [],
            parentRow,
          };
        }
      });
    },
    addSubRow: function (row, index) {
      const newRow = {
        id: this.newId,
        operateType: 'add',
        dataLevel: row.dataLevel + 1,
        children: [],
        parentRow: row,
      };
      this.newId = this.newId - 1;
      row.children.push(newRow);
      this.tableHackVisible = false;
      this.$nextTick(() => {
        this.tableHackVisible = true;
        this.$nextTick(() => {
          this.editingRow = newRow;
          this.expandRows();
        });
      });
    },
    expandRows: function () {
      const expandRows = [this.editingRow];
      let tempParentRow = this.editingRow.parentRow;
      while (tempParentRow) {
        expandRows.unshift(tempParentRow);
        tempParentRow = tempParentRow.parentRow;
      }
      expandRows.forEach((row) => {
        this.$refs['elTreeTable'].toggleRowExpansion(row);
      });
    },
    handleEmitEvent: function (commandType, command, index, row) {
      if (commandType === 'addSub') {
        console.log('add new sub row');
        this.addSubRow(row, index);
      } else {
        this.$emit(command, index, row, () => {
          if (this.editTriggerMode === 'manual') {
            if (['add', 'edit'].indexOf(row.operateType) > -1) {
              this.editingRow = row;
            } else {
              this.editingRow = null;
            }
          }
        });
      }
    },
    handleAdd: function () {
      if (this.addInside) {
        const newRow = {
          id: this.newId,
          operateType: 'add',
          dataLevel: 1,
          children: [],
          parentRow: null,
        };
        this.editingRow = newRow;
        this.newId = this.newId - 1;
        if (this.addInsidePosition === 'beforeFirst') {
          this.decoratedDataSource.unshift(newRow);
        } else {
          this.decoratedDataSource.push(newRow);
        }
      } else {
        this.$emit('handleAdd');
      }
    },
    handleRowClick: function (row) {
      console.log('handleRowClick', row);
      event.stopPropagation();
      if (
        this.editTriggerMode === 'auto' &&
        this.editCommand &&
        this.editCommand.command
      ) {
        if (
          this.editCommand.disableValidator &&
          this.editCommand.disableValidator.call(this, row)
        ) {
          return;
        }
        this.editingRow = row;
        this.handleEmitEvent('', this.editCommand.command, 0, row);
      } else {
        this.$emit('row-click', row);
      }
    },
    handleCurrentChange: function (currentRow, oldCurrentRow) {
      console.log('handleCurrentChange: ', this.editingRow);
      this.saveEditingRow();
    },
    handleOuterRowChange(event) {
      console.log('handleOuterRowChange', this.editingRow);
      var saveFlag = this.saveEditingRow();
      if (saveFlag) {
        this.editingRow = null;
      }
    },
    saveEditingRow() {
      if (
        this.editTriggerMode === 'auto' &&
        this.editingRow != null &&
        this.saveCommand &&
        this.saveCommand.command
      ) {
        if (
          this.saveCommand.disableValidator &&
          this.saveCommand.disableValidator.call(this, this.editingRow)
        ) {
          return false;
        }

        this.handleEmitEvent('', this.saveCommand.command, 0, this.editingRow);
        return true;
      }
    },
    handleValidateForm(validateField, validateStatus) {
      console.log('handleValidateForm', validateField, validateStatus);
      this.formValidateResult[validateField] = validateStatus;
      const formValidateStatus = Object.values(this.formValidateResult).every(
        (r) => r
      );
      this.$emit('update:validateStatus', formValidateStatus);
    },
  },
};
</script>

<style lang="scss" >
.tree-table-container {
  .table-add-command {
    float: right;
    margin: 6px;
    button {
      font-size: 14px;
      padding: 8px 10px;
    }
  }
  .el-table__append-wrapper {
    padding-left: 5px;
  }
}
</style>
