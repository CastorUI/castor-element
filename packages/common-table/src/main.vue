<template>
  <div class="common-table-container">
    <div
      v-if="title || (addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))) ||(customCommands && customCommands.length)"
      class="table-append-header"
    >
      <div class="table-title">
        {{ title }}
      </div>
      <el-button-group
        v-show="customCommands && customCommands.length"
        class="table-custom-commands"
      >
        <el-button
          v-for="(item,index) of customCommands"
          :key="index"
          :disabled="item.disableValidator && item.disableValidator.call(this,multipleSelection)"
          v-bind="{type: 'text', ...item.elementProps}"
          @click="$emit(item.command,multipleSelection)"
        >
          {{ item.text }}
        </el-button>
      </el-button-group>
      <div
        class="table-add-command"
        :class="{
          'add-divider':addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this)) && customCommands && customCommands.length
        }"
      >
        <el-button
          v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
          :disabled="addCommand.disableValidator && addCommand.disableValidator.call(this)"
          v-bind="{type: 'primary', icon: 'el-icon-plus', ...addCommand.elementProps}"
          @click="$emit(addCommand.command)"
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
        :default-sort="defaultSort"
        style="width:100%;min-width:700px;height:auto;"
        v-bind="{border: true, ...elementProps}"
        @row-click="row => $emit('row-click', row)"
        @selection-change="multipleSelection => handleSelectionChange(multipleSelection)"
        @sort-change="args=> handleSortChange(args)"
      >
        <common-column
          v-for="(item,index) of columns"
          :key="index"
          :type="item.type"
          :label="item.label"
          :data-field="item.dataField"
          :index-method="indexMethod"
          :data-template="item.dataTemplate"
          :custom-components="customComponents"
          :element-props="item.elementProps"
          :extend-props="item.extendProps"
          v-on="$listeners"
        />
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
import CommonColumn from './common-column';
export default {
  name: 'CaCommonTable',
  components: {
    'common-column': CommonColumn,
  },
  props: {
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
      default: function () {
        return [];
      },
    },
    columns: {
      type: Array,
      default: function () {
        return [];
      },
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
    customCommands: {
      type: Array,
      default: () => [],
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
      multipleSelection: [],
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
        order: this.pagination.order,
      };
    },
  },
  methods: {
    indexMethod(index) {
      return (
        this.pagination.pageSize * (this.pagination.pageIndex - 1) + index + 1
      );
    },
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
  },
};
</script>

<style lang="scss">
.common-table-container {
  overflow: hidden;
  .table-append-header {
    height: 44px;
    line-height: 44px;
    padding: 10px 0;
    overflow: hidden;
    .table-title {
      float: left;
      font-size: 18px;
      font-weight: bold;
    }
    .table-add-command {
      float: right;
      &.add-divider {
        padding-right: 20px;
        border-right: 1px solid rgba(0, 0, 0, 0.06);
      }
    }
    .table-custom-commands {
      float: right;
      height: 100%;
      button {
        height: 100%;
        line-height: 100%;
        font-size: 14px;
        padding: 0 10px;
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
      .el-button span {
        margin-left: 0;
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
    text-align: right;
  }
}
</style>
