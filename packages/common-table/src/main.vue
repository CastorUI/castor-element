<template>
  <div class="common-table-container">
    <div class="table-append-header">
      <div class="table-title">
        {{ title }}
      </div>
      <div class="table-setting-commands">
        <el-button
          v-for="(item,index) of settingCommands"
          :key="index"
          v-bind="{type: 'text', ...item.elementProps}"
          @click="$emit(item.command)"
        >
          {{ item.text }}
        </el-button>
        <el-button
          v-if="extendProps.showRefresh !== false"
          icon="el-icon-refresh-right"
          v-bind="{type: 'text'}"
          @click="getList"
        >
          刷新
        </el-button>
        <column-config
          v-if="extendProps.showColumnConfig !== false"
          :origin-columns="originColumns"
          :default-config-columns="configColumns"
          :set-config-columns.sync="configColumns"
        />
      </div>
      <el-button-group
        v-if="customCommands && customCommands.length"
        class="table-custom-commands divider"
      >
        <el-button
          v-for="(item,index) of customCommands"
          :key="index"
          :disabled="item.disableValidator && item.disableValidator.call(this,multipleSelection)"
          v-bind="item.elementProps"
          @click="$emit(item.command,multipleSelection)"
        >
          {{ item.text }}
        </el-button>
      </el-button-group>
      <div
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        class="table-add-command divider"
      >
        <el-button
          :disabled="addCommand.disableValidator && addCommand.disableValidator.call(this)"
          v-bind="{icon: 'el-icon-plus', ...addCommand.elementProps}"
          @click="$emit(addCommand.command)"
        >
          {{ addCommand.text }}
        </el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-if="hackReset"
        ref="table"
        v-loading="loading"
        row-key="id"
        :data="dataSource"
        :default-sort="defaultSort"
        :row-class-name="tableRowClassName"
        v-bind="{border: true, ...elementProps}"
        @row-click="handleRowClick"
        @selection-change="multipleSelection => handleSelectionChange(multipleSelection)"
        @sort-change="args=> handleSortChange(args)"
      >
        <common-column
          v-for="(item,index) of dynamicColums"
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
    <div
      v-if="pagination.pageSize"
      class="common-pagination-container"
    >
      <el-pagination
        v-if="pagination.type==='bigData'"
        :current-page="999999"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        style="margin-top: 10px;"
        prev-text="上一页"
        next-text="下一页"
        class="big-data-pagination"
        v-bind="{layout: 'sizes, prev, next',background:true, ...pagination.elementProps}"
        @size-change="pageSize => handleBigDataPageSizeChange(pageSize)"
        @prev-click="()=>handleBigDataPageIndexChange('previous')"
        @next-click="()=>handleBigDataPageIndexChange('next')"
      />
      <el-pagination
        v-else
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        style="margin-top: 10px;"
        v-bind="{layout: 'total,sizes, prev, pager, next',background:true, ...pagination.elementProps}"
        @size-change="pageSize => handlePageSizeChange(pageSize)"
        @current-change="pageIndex => handlePageIndexChange(pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import CommonColumn from './../../components/CommonColumn';
import ColumnConfig from './components/ColumnConfig';
export default {
  name: 'CaCommonTable',
  components: {
    CommonColumn,
    ColumnConfig,
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
        return {};
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
    tableTag: {
      type: String,
      default: '',
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
        return {
          cacheConfigColumns: true,
          showRefresh: true,
          showColumnConfig: true,
        };
      },
    },
  },
  data() {
    return {
      hackReset: true,
      originColumns: [],
      multipleSelection: [],
      dynamicColums: JSON.parse(JSON.stringify(this.columns)),
      configColumns: [],
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
  watch: {
    configColumns: {
      handler(val) {
        this.hackReset = false;
        this.dynamicColums = val
          .filter((r) => r.show)
          .map((r) => {
            const originColumn = this.columns.filter(
              (c) => c.dataField === r.dataField
            )[0];
            return {
              ...originColumn,
              elementProps: {
                ...originColumn.elementProps,
                fixed: r.fixed,
              },
            };
          });
        if (
          val &&
          this.tableTag &&
          (this.extendProps || {}).cacheConfigColumns !== false
        ) {
          const cachedColumns = val.map((r) => {
            return {
              dataField: r.dataField,
              show: r.show,
              fixed: r.fixed,
            };
          });
          localStorage.setItem(
            `${this.tableTag}-CONFIG-COLUMNS`,
            JSON.stringify(cachedColumns)
          );
        }
        this.$nextTick(() => {
          this.hackReset = true;
        });
      },
      deep: true,
      immediate: false,
    },
    columns: {
      handler() {
        this.hackReset = false;
        this.originColumns = this.columns.map((r) => {
          return {
            show: true,
            dataField: r.dataField,
            label: r.type === 'selection' ? '选择列' : r.label,
            fixed: (r.elementProps || {}).fixed,
          };
        });
        this.dynamicColums.forEach((r) => {
          const originColumn = this.columns.filter(
            (c) => c.dataField === r.dataField
          )[0];
          r.extendProps = originColumn.extendProps;
        });
        this.$nextTick(() => {
          this.hackReset = true;
        });
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    console.log('this.tableTag', this.tableTag);
    if (
      this.tableTag &&
      (this.extendProps || {}).cacheConfigColumns !== false
    ) {
      const cacheConfigColumnsJson = localStorage.getItem(
        `${this.tableTag}-CONFIG-COLUMNS`
      );
      if (cacheConfigColumnsJson) {
        const cachedColumns = JSON.parse(cacheConfigColumnsJson);
        // 过滤删除列&&获取列标题
        const validCachedColumns = cachedColumns
          // 过滤删除列
          .filter((r) => this.columns.some((c) => c.dataField === r.dataField))
          // 获取列标题
          .map((r) => {
            const originColumn = this.columns.find(
              (c) => c.dataField === r.dataField
            );
            return {
              ...r,
              label:
                originColumn.type === 'selection'
                  ? '选择列'
                  : originColumn.label,
            };
          });
        // 获取新增列
        const addedColumns = this.columns
          .filter(
            (r) => !validCachedColumns.some((c) => c.dataField === r.dataField)
          )
          .map((r) => {
            return {
              ...r,
              show: true,
              fixed: (r.elementProps || {}).fixed,
            };
          });
        // 组装所有可设置列
        this.configColumns = validCachedColumns.concat(addedColumns);
      }
    }

    if (!(this.configColumns && this.configColumns.length)) {
      this.configColumns = this.columns.map((r) => {
        return {
          show: true,
          dataField: r.dataField,
          label: r.type === 'selection' ? '选择列' : r.label,
          fixed: (r.elementProps || {}).fixed,
        };
      });
    }
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'odd-row';
      } else {
        return 'even-row';
      }
    },
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
    handleBigDataPageSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.$emit('page-size-change', pageSize);
      this.getList();
    },
    handleBigDataPageIndexChange(direction) {
      this.pagination.direction = direction;
      this.getList();
    },
    handleRowClick(row, column, event) {
      console.log('handleRowClick', row, column, event);
      // 列类型为commands时,包装层为SPAN或IMG
      if (['SPAN', 'IMG'].indexOf(event.target.nodeName) > -1) {
        return;
      }

      this.$emit('row-click', row, column, event);
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
      font-size: 16px;
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
  }

  .table-content {
    overflow: auto;
    width: 100%;
  }
  .common-pagination-container {
    text-align: right;
    .big-data-pagination {
      .btn-prev,
      .btn-next {
        padding: 0 12px;
      }
    }
  }
}
</style>
