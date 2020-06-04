<template>
  <div class="common-edit-table-container">
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
      v-loading="loading"
      row-key="id"
      :data="dataSource"
      style="min-width:600px;height:auto;padding:1px;"
      v-bind="{border: true, ...elementProps}"
      @row-click="handleRowClick"
      @current-change="handleCurrentChange"
    >
      <edit-column
        v-for="(item,index) of columns"
        :key="index"
        :label="item.label"
        :data-field="item.dataField"
        :rules="item.rules"
        :type="item.type"
        :commands="item.commands"
        :editable-commands="item.editableCommands"
        :data-template="item.dataTemplate"
        :editable="item.editable"
        :editing="editing"
        :editing-row="editingRow"
        :handle-emit-event="handleEmitEvent"
        :auto-focus="item.autoFocus"
        :element-props="item.elementProps"
        v-on="$listeners"
      />
      <template
        v-if="dataSource && dataSource.length && appendContent"
        v-slot:append
      >
        <span
          class="append-content"
          style="padding: 0 10px"
        >{{ appendContent }}</span>
      </template>
    </el-table>
  </div>
</template>

<script>
import EditColumn from './EditColumn';
export default {
  name: 'CaEditTable',
  components: {
    'edit-column': EditColumn
  },
  props: {
    editTriggerMode: {
      type: String,
      default: 'manual',
      validator: value => ['manual', 'auto'].indexOf(value) > -1
    },
    loading: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    addCommand: {
      type: Object,
      default: () => {}
    },
    editCommand: {
      type: Object,
      default: () => {}
    },
    saveCommand: {
      type: Object,
      default: () => {}
    },
    addInside: { type: Boolean, default: false },
    addInsidePosition: {
      type: String,
      default: 'beforeFirst',
      validator: function(value) {
        return ['beforeFirst', 'afterLast'].indexOf(value) > -1;
      }
    },
    appendContent: {
      type: String,
      default: ''
    },
    elementProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      editingRow: null
    };
  },
  computed: {
    editing() {
      return this.editingRow != null;
    }
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
    handleEmitEvent: function(commandType, command, index, row) {
      this.$emit(command, index, row);
      // console.log('this.dataSource - handleEmitEvent',this.dataSource,row);
      if (this.editTriggerMode === 'manual') {
        if (row.operateType === 'edit') {
          this.editingRow = row;
        } else {
          this.editingRow = null;
        }
      }
    },
    handleAdd: function() {
      let newId = -1;
      if (
        this.dataSource &&
        this.dataSource.length > 0 &&
        this.dataSource.some(r => r.id < 0)
      ) {
        newId =
          this.dataSource.map(r => r.id).reduce((a, b) => Math.min(a, b)) - 1;
      }
      if (this.addInside) {
        const newRow = {
          id: newId
        };
        if (this.addInsidePosition === 'beforeFirst') {
          this.dataSource.unshift(newRow);
        } else {
          this.dataSource.push(newRow);
        }
        this.editingRow = newRow;
        event.stopPropagation();
      } else {
        this.$emit(this.addCommand.command);
      }
    },
    handleRowClick: function(row) {
      // console.log('handleRowClick',row);
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
    handleCurrentChange: function(currentRow, oldCurrentRow) {
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
    }
  }
};
</script>

<style lang="scss" >
.common-edit-table-container {
  margin-bottom: 10px;
  // 暂时解决不同缩放比例下表头行内线消失的问题
  .el-table th.is-leaf {
    border-bottom: 1.2px solid #ebeef5;
  }
  .el-table__header-wrapper tr th,
  .el-table__fixed-header-wrapper tr th {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    background: #fafafa;
  }
  .el-table__append-wrapper {
    background: #fafafa;
  }
  .append-content {
    font-weight: 500;
    background: #fafafa;
  }
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
