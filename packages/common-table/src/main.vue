<template>
  <div class="common-table-container">
    <div class="table-commands">
      <el-button
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        type="text"
        class="table-add-command"
        :icon="addCommand.icon"
        :disabled="addCommand.disableValidator && addCommand.disableValidator.call(this)"
        @click="$emit(addCommand.command)"
      >
        {{ addCommand.text }}
      </el-button>
      <el-button-group
        v-show="customCommands"
        class="table-custom-commands"
      >
        <el-button
          v-for="(item,index) of customCommands"
          :key="index"
          :disabled="item.disableValidator && item.disableValidator.call(this)"
          type="text"
          @click="$emit(item.command,multipleSelection)"
        >
          {{ item.text }}
        </el-button>
      </el-button-group>
    </div>
    <div class="table-content">
      <el-table
        v-loading="loading"
        row-key="id"
        :data="dataSource"
        :default-sort="defaultSort"
        :border="true"
        style="width:100%;min-width:700px;height:auto;"
        v-bind="extendProps"
        @row-click="row => $emit('row-click', row)"
        @selection-change="multipleSelection => handleSelectionChange(multipleSelection)"
        @sort-change="args=> handleSortChange(args)"
      >
        <common-column
          v-for="(item,index) of columns"
          :key="index"
          :label="item.label"
          :data-field="item.dataField"
          :options="item.options"
          :type="item.type"
          :commands="item.commands"
          :link-command="item.linkCommand"
          :index-method="indexMethod"
          :data-template="item.dataTemplate"
          :extend-props="item.extendProps"
          v-on="$listeners"
        />
      </el-table>
    </div>
    <div
      v-if="pagination.total > pagination.pageSize"
      class="common-pagination-container"
    >
      <el-pagination
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        layout="total,sizes, prev, pager, next"
        v-bind="pagination.extendProps"
        @size-change="pageSize => handlePageSizeChange(pageSize)"
        @current-change="pageIndex => handlePageIndexChange(pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import CommonColumn from './common-column';
export default {
  name: 'CaCommonTable',
  components: {
    'common-column': CommonColumn
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      default: function() {
        return [];
      }
    },
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    pagination: {
      type: Object,
      default: function() {
        return {
          pageIndex: 1,
          pageSize: 10,
          total: 0
        };
      }
    },
    addCommand: {
      type: Object,
      default: () => {}
    },
    customCommands: {
      type: Array,
      default: () => []
    },
    getList: {
      type: Function,
      default: () => {}
    },
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  computed: {
    pageSizes() {
      const pageSizeArray = [10, 15, 20, 30, 50];
      return pageSizeArray.indexOf(this.pagination.pageSize) > -1
        ? pageSizeArray
        : pageSizeArray.concat(this.pagination.pageSize);
    },
    defaultSort() {
      return {
        prop: this.pagination.sortField,
        order: this.pagination.order
      };
    }
  },
  methods: {
    handleSelectionChange(multipleSelection) {
      this.multipleSelection = multipleSelection;
      this.$emit('selection-change', multipleSelection);
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
    handleSortChange({ prop, order }) {
      this.pagination.sortField = prop;
      this.pagination.order = order;
      this.getList();
    },
    indexMethod(index) {
      return (
        this.pagination.pageSize * (this.pagination.pageIndex - 1) + index + 1
      );
    }
  }
};
</script>

<style lang="scss">
.common-table-container {
  background: #fff;
  padding: 0 24px;
  overflow: hidden;
  margin-bottom: 10px;
  .table-commands {
    margin-top: 10px;
    .table-add-command {
      font-size: 14px;
    }
    .table-custom-commands {
      float: right;
      button {
        font-size: 14px;
        padding: 14px 10px;
      }
      .default-color {
        color: #909399;
      }
      .default-color:hover {
        background-color: #909399;
        color: #ffffff;
      }
      .default-color:focus,
      .default-bg:focus {
        border-color: #dcdfe6;
      }
      .default-bg {
        background: #ffffff;
        color: #009944;
        border-left: none;
      }
      .default-bg:hover {
        background: #67c23a;
        color: #ffffff;
      }
      .left-border:after {
        content: '';
        position: absolute;
        left: 0;
        top: 28%;
        bottom: auto;
        right: auto;
        height: 44%;
        width: 1px;
        background-color: #dcdfe6;
      }
      .no-border {
        border: none;
      }
    }
  }
  .table-content {
    overflow: auto;
    width: 100%;
    .el-table__header-wrapper tr th,
    .el-table__fixed-header-wrapper tr th {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      background: #fafafa;
    }
  }
  .common-pagination-container {
    margin: 10px 0;
    text-align: right;
  }
}
</style>
