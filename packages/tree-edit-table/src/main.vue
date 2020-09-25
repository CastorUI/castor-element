<template>
  <div class="tree-table-container">
    <div class="table-commands">
      <el-button
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        class="table-add-command"
        :disabled="editing || (addCommand.disableValidator && addCommand.disableValidator.call(this))"
        v-bind="{type: 'text', icon: 'el-icon-circle-plus-outline', ...addCommand.elementProps}"
        @click="handleAdd"
      >
        {{ addCommand.text }}
      </el-button>
    </div>
    <el-table
      ref="elTreeTable"
      v-loading="loading"
      :data="decoratedDataSource"
      row-key="id"
      style="min-width:600px;height:auto;padding:1px;"
      v-bind="{border: true, ...elementProps}"
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
import TreeColumn from './TreeColumn';
export default {
  name: 'CaTreeEditTable',
  components: {
    'tree-column': TreeColumn,
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
    hiddenCommands: {
      type: Object,
      default: () => {
        return {
          editCommand: undefined,
          saveCommand: undefined,
        };
      },
    },
    rowKey: {
      type: String,
      default: '',
    },
    showVerticalBorder: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false,
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
    showSummary: {
      type: Boolean,
      default: false,
    },
    summaryMethod: {
      type: Function,
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
      decoratedDataSource: [],
      addedSubRow: {
        addingFlag: false,
        parentRowKeyValue: undefined,
        parentRowIndex: undefined,
        index: undefined,
        defaultRowKeyValue: -1,
      },
      editingRow: null,
      needRefreshDataSource: true,
    };
  },
  computed: {
    editing() {
      return this.decoratedDataSource.some(
        (r) => r.operateType && ['edit', 'add'].indexOf(r.operateType) > -1
      );
    },
  },
  watch: {
    dataSource: {
      handler: function () {
        console.log('this.dataSource - decoratedDataSource', this.dataSource);
        if (this.needRefreshDataSource) {
          this.decoratedDataSource = this.decorateTreeListData(
            this.dataSource,
            1
          );
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (this.editTriggerMode === 'click-row') {
      window.addEventListener('click', this.handleOuterRowChange, false);
    }
  },
  updated() {
    if (this.addedSubRow.addingFlag) {
      console.log('elTreeTable', this.$refs['elTreeTable']);
      console.log(
        'treeData',
        this.$refs['elTreeTable'].store &&
          this.$refs['elTreeTable'].store.states.treeData
      );
      this.$refs['elTreeTable'].store.toggleTreeExpansion(
        this.addedSubRow.parentRowKeyValue
      );
      console.log('this.addedSubRow', this.addedSubRow);
      this.$refs['elTreeTable'].store.commit(
        'setHoverRow',
        this.addedSubRow.index
      );
    }
  },
  destroyed() {
    if (this.editTriggerMode === 'click-row') {
      window.removeEventListener('click', this.handleOuterRowChange, false);
    }
  },
  methods: {
    decorateTreeListData(dataList, dataLevel) {
      return dataList.map((r) => {
        if (r.children) {
          return {
            ...r,
            operateType: r.operateType || 'view',
            dataLevel,
            children: this.decorateTreeListData(r.children, dataLevel + 1),
          };
        } else {
          return {
            ...r,
            operateType: r.operateType || 'view',
            dataLevel,
          };
        }
      });
    },
    addSubRow: function (row, index) {
      this.addedSubRow.addingFlag = true;
      this.addedSubRow.parentRowKeyValue = row[this.rowKey];
      this.addedSubRow.index =
        index + (row.children ? row.children.length : 0) + 1;
      this.dataSource.push({ id: -2 });
      this.dataSource.pop();
      const currentRowData = this.dataSource.filter((r) => r.id === row.id)[0];
      const newRow = {
        id: this.addedSubRow.defaultRowKeyValue,
        operateType: 'add',
      };
      currentRowData.children
        ? currentRowData.children.push(newRow)
        : (currentRowData.children = [newRow]);
    },
    handleEmitEvent: function (commandType, command, index, row) {
      if (commandType === 'addSub') {
        console.log('add new sub row');
        this.addSubRow(row, index);
      } else {
        if (['add', 'edit'].indexOf(row.operateType) > -1) {
          row.operateType = 'view';
        }
        this.$emit(command, index, row);
        const originRow = this.dataSource.filter((r) => r.id === row.id)[0];
        for (const prop in row) {
          if (row.hasOwnProperty(prop)) {
            originRow[prop] = row[prop];
          }
        }
        console.log(
          'this.dataSource - handleEmitEvent',
          this.dataSource,
          this.decoratedDataSource,
          row
        );
      }
    },
    handleAdd: function () {
      let newId = this.addedSubRow.defaultRowKeyValue;
      if (
        this.dataSource &&
        this.dataSource.length > 0 &&
        this.dataSource.some((r) => r.id < 0)
      ) {
        newId =
          this.dataSource.map((r) => r.id).reduce((a, b) => Math.min(a, b)) - 1;
      }
      if (this.addInside) {
        const newRow = {
          id: newId,
          operateType: 'add',
        };
        if (this.addInsidePosition === 'beforeFirst') {
          this.dataSource.unshift(newRow);
        } else {
          this.dataSource.push(newRow);
        }
      } else {
        this.$emit('handleAdd');
      }
    },
    handleRowClick: function (row) {
      console.log('handleRowClick', row);
      event.stopPropagation();
      var rowEditCommand = this.hiddenCommands.editCommand;
      if (
        this.editTriggerMode === 'click-row' &&
        rowEditCommand &&
        rowEditCommand.command
      ) {
        if (row.operateType === 'view') {
          if (
            rowEditCommand.statusValidator &&
            !rowEditCommand.statusValidator.call(this, row)
          ) {
            return;
          }
          this.editingRow = row;
          this.needRefreshDataSource = false;
          this.handleEmitEvent('', rowEditCommand.command, 0, row);
        }
      } else {
        this.$emit('handleRowClick', row);
      }
    },
    handleCurrentChange: function (currentRow, oldCurrentRow) {
      console.log('handleCurrentChange: ', this.editingRow);
      this.saveEditingRow();
    },
    handleOuterRowChange(event) {
      console.log('handleOuterRowChange', this.editingRow);
      this.saveEditingRow();
    },
    saveEditingRow() {
      var rowSaveCommand = this.hiddenCommands.saveCommand;
      if (
        this.editTriggerMode === 'click-row' &&
        this.editingRow != null &&
        rowSaveCommand &&
        rowSaveCommand.command
      ) {
        if (
          rowSaveCommand.statusValidator &&
          !rowSaveCommand.statusValidator.call(this, this.editingRow)
        ) {
          return;
        }

        this.needRefreshDataSource = true;
        this.handleEmitEvent('', rowSaveCommand.command, 0, this.editingRow);
        this.editingRow = null;
      }
    },
    handleValidateForm(validateField, validateStatus) {
      console.log('handleValidateForm', validateField, validateStatus);
      this.formValidateResult[validateField] = validateStatus;
      let formValidateStatus = Object.values(this.formValidateResult).every(
        (r) => r
      );
      this.$emit('update:validateStatus', formValidateStatus);
    },
  },
};
</script>

<style lang="scss" >
.tree-table-container {
  margin-bottom: 10px;
  .table-commands {
    .table-add-command {
      font-size: 14px;
    }
  }
  .el-table__append-wrapper {
    padding-left: 5px;
  }
}
</style>
