<template>
  <div class="common-edit-table-container">
    <div
      v-if="title || (addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this)))"
      class="table-append-header"
    >
      <div class="table-title">
        {{ title }}
      </div>
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
    </div>
    <div class="table-content">
      <el-table
        v-loading="loading"
        row-key="id"
        :data="dataSource"
        style="height:auto;padding:1px;"
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
          :data-template="item.dataTemplate"
          :editable="item.editable"
          :addable="item.addable"
          :editing="editing"
          :editing-row="editingRow"
          :handle-emit-event="handleEmitEvent"
          :handle-validate-form="handleValidateForm"
          :custom-components="customComponents"
          :element-props="item.elementProps"
          :extend-props="item.extendProps"
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
    <div class="common-pagination-container">
      <el-pagination
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        style="margin: 10px 0;"
        v-bind="{layout: 'total,sizes, prev, pager, next',hideOnSinglePage: true, ...pagination.elementProps}"
        @size-change="pageSize => handlePageSizeChange(pageSize)"
        @current-change="pageIndex => handlePageIndexChange(pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import EditColumn from './EditColumn';
export default {
  name: 'CaEditTable',
  components: {
    'edit-column': EditColumn,
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
    title: {
      type: String,
      default: '',
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      default: function () {
        return {
          pageIndex: 1,
          pageSize: 10,
          total: 0,
        };
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
    addInside: { type: Boolean, default: false },
    addInsidePosition: {
      type: String,
      default: 'beforeFirst',
      validator: function (value) {
        return ['beforeFirst', 'afterLast'].indexOf(value) > -1;
      },
    },
    appendContent: {
      type: String,
      default: '',
    },
    getList: {
      type: Function,
      default: () => {},
    },
    customComponents: {
      type: Object,
      default: function () {
        return {};
      },
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
      editingRow: null,
      formValidateResult: {},
    };
  },
  computed: {
    pageSizes() {
      const pageSizeArray = [10, 15, 20, 30, 50];
      return pageSizeArray.indexOf(this.pagination.pageSize) > -1
        ? pageSizeArray
        : pageSizeArray.concat(this.pagination.pageSize);
    },
    editing() {
      return this.editingRow != null;
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
    handleEmitEvent: function (commandType, command, index, row) {
      console.log('handleEmitEvent', commandType, command, index, row);
      this.$emit(command, index, row, () => {
        if (['add', 'edit'].indexOf(row.operateType) > -1) {
          this.editingRow = row;
        } else {
          this.editingRow = null;
        }
      });
    },
    handleAdd: function () {
      let newId = -10001;
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
        this.editingRow = newRow;
        event.stopPropagation();
      } else {
        this.$emit(this.addCommand.command);
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
      console.log(
        'handleCurrentChange: ',
        oldCurrentRow,
        currentRow,
        this.editingRow
      );
      // 新增行-双击事件-不做处理
      if (this.editingRow && !this.oldCurrentRow) {
        return;
      }

      this.saveEditingRow();
    },
    handleOuterRowChange(event) {
      console.log('handleOuterRowChange', this.editingRow);
      this.saveEditingRow();
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
          return;
        }

        this.handleEmitEvent('', this.saveCommand.command, 0, this.editingRow);
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
    handlePageIndexChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getList();
    },
    handlePageSizeChange(pageSize) {
      this.pagination.pageIndex = 1;
      this.pagination.pageSize = pageSize;
      this.$store.dispatch('SetPagesize', pageSize);
      this.getList();
    },
  },
};
</script>

<style lang="scss" >
.common-edit-table-container {
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

  .el-table__append-wrapper {
    padding-left: 5px;
  }

  .table-append-header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 12px;
    overflow: hidden;
    .table-title {
      float: left;
      font-size: 18px;
      font-weight: bold;
    }
    .table-add-command {
      float: right;
    }
  }

  .table-content {
    .append-content {
      font-weight: 500;
      background: #fafafa;
    }
  }
  .common-pagination-container {
    text-align: right;
  }
}
</style>
