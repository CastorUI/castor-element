<template>
  <div class="common-table-container">
    <div
      v-if="title || (addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))) ||(customCommands && customCommands.length)||(settingCommands && settingCommands.length)"
      class="table-append-header"
    >
      <div class="table-title">
        {{ title }}
      </div>
      <div
        v-if="settingCommands && settingCommands.length"
        class="table-setting-commands"
      >
        <el-button
          v-for="(item,index) of settingCommands"
          :key="index"
          v-bind="{type: 'text',size:'small', ...item.elementProps}"
          @click="$emit(item.command)"
        >
          {{ item.text }}
        </el-button>
      </div>
      <el-button-group
        v-if="customCommands && customCommands.length"
        class="table-custom-commands"
        :class="{
          'divider': settingCommands && settingCommands.length
        }"
      >
        <el-button
          v-for="(item,index) of customCommands"
          :key="index"
          :disabled="item.disableValidator && item.disableValidator.call(this,multipleSelection)"
          v-bind="{size:'small', ...item.elementProps}"
          @click="$emit(item.command,multipleSelection)"
        >
          {{ item.text }}
        </el-button>
      </el-button-group>
      <div
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        class="table-add-command"
        :class="{
          'divider': (customCommands && customCommands.length)||(settingCommands && settingCommands.length)
        }"
      >
        <el-button
          :disabled="addCommand.disableValidator && addCommand.disableValidator.call(this)"
          v-bind="{icon: 'el-icon-plus',size:'small', ...addCommand.elementProps}"
          @click="$emit(addCommand.command)"
        >
          {{ addCommand.text }}
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        ref="table"
        v-loading="loading"
        row-key="id"
        :data="dataSource"
        :default-sort="defaultSort"
        style="width:100%;height:auto;"
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
    settingCommands: {
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
      this.$emit('page-size-change', pageSize);
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
    margin-bottom: 12px;
    overflow: hidden;
    .table-title {
      float: left;
      font-size: 18px;
      font-weight: bold;
    }
    .table-add-command {
      float: right;
      button {
        font-size: 13px;
      }
    }
    .table-custom-commands,
    .table-setting-commands {
      float: right;
      margin-left: 16px;
      button {
        font-size: 13px;
      }
    }

    .divider {
      padding-right: 16px;
      border-right: 1px solid rgba(0, 0, 0, 0.06);
    }
    .el-button [class*='el-icon-'] + span {
      margin-left: 0;
    }
    .el-button.is-disabled,
    .el-button.is-disabled:hover,
    .el-button.is-disabled:focus {
      color: rgb(197, 197, 197);
      background-color: rgb(241, 241, 241);
      border-color: #e4e3e6;
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
