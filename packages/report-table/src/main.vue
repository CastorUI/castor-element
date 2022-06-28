<template>
  <div
    v-if="hackReset"
    class="report-table-container"
  >
    <div class="table-commands">
      <el-button
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        class="table-add-command"
        :disabled="addCommand.disableValidator && addCommand.disableValidator.call(this)"
        v-bind="{type: 'text', icon: 'el-icon-circle-plus-outline', ...addCommand.elementProps}"
        @click="$emit(addCommand.command)"
      >
        {{ addCommand.text }}
      </el-button>
      <el-button-group
        v-if="customCommands"
        class="table-custom-commands"
      >
        <el-button
          v-for="(item,index) of customCommands"
          :key="index"
          :disabled="item.disableValidator &&item.disableValidator.call(this,multipleSelection)"
          v-bind="{type: 'text', ...item.elementProps}"
          @click="$emit(item.command,multipleSelection)"
        >
          {{ item.text }}
        </el-button>
      </el-button-group>
    </div>
    <div class="table-content">
      <el-table
        v-loading="loading"
        :data="dataSource"
        :default-sort="defaultSort"
        style="width:100%;height:auto;"
        v-bind="{border: true, ...elementProps}"
        @row-click="handleRowClick"
        @selection-change="multipleSelection => handleSelectionChange(multipleSelection)"
        @sort-change="args=> handleSortChange(args)"
      >
        <template v-for="(item,index) of dynamicCloumns">
          <el-table-column
            v-if="item.reportType==='title' && item.children && item.children.length > 0"
            :key="index"
            :label="item.label"
            v-bind="{align: 'center', ...item.elementProps}"
          >
            <template v-for="(childItem,childIndex) of item.children">
              <el-table-column
                v-if="childItem.reportType==='title' && childItem.children && childItem.children.length > 0"
                :key="'childIndex' + childIndex"
                :label="childItem.label"
                v-bind="{align: 'center', ...childItem.elementProps}"
              >
                <template v-for="(grandChildItem,grandChildIndex) of childItem.children">
                  <el-table-column
                    v-if="grandChildItem.reportType==='title'"
                    :key="'grandChild' + grandChildIndex"
                    :label="grandChildItem.label"
                    v-bind="{align: 'center', ...grandChildItem.elementProps}"
                  />
                  <common-column
                    v-if="grandChildItem.reportType==='data'"
                    :key="grandChildItem.dataField"
                    :type="grandChildItem.type"
                    :label="grandChildItem.label"
                    :data-field="grandChildItem.dataField"
                    :index-method="indexMethod"
                    :data-template="grandChildItem.dataTemplate"
                    :element-props="grandChildItem.elementProps"
                    :extend-props="grandChildItem.extendProps"
                    v-on="$listeners"
                  />
                </template>
              </el-table-column>
              <common-column
                v-if="childItem.reportType==='data'"
                :key="childItem.dataField"
                :type="childItem.type"
                :label="childItem.label"
                :data-field="childItem.dataField"
                :index-method="indexMethod"
                :data-template="childItem.dataTemplate"
                :element-props="childItem.elementProps"
                :extend-props="childItem.extendProps"
                v-on="$listeners"
              />
            </template>
          </el-table-column>
          <common-column
            v-if="item.reportType==='data'"
            :key="item.dataField"
            :type="item.type"
            :label="item.label"
            :data-field="item.dataField"
            :index-method="indexMethod"
            :data-template="item.dataTemplate"
            :element-props="item.elementProps"
            :extend-props="item.extendProps"
            v-on="$listeners"
          />
        </template>
      </el-table>
    </div>
    <div class="common-pagination-container">
      <el-pagination
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        v-bind="{layout: 'total,sizes, prev, pager, next', hideOnSinglePage: true, ...pagination.elementProps}"
        @size-change="pageSize => handlePageSizeChange(pageSize)"
        @current-change="pageIndex => handlePageIndexChange(pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import CommonColumn from '../../components/CommonColumn';
export default {
  name: 'CaReportTable',
  components: {
    'common-column': CommonColumn,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Array,
      default: function () {
        return [];
      },
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
    customCommands: {
      type: Array,
      default: () => [],
    },
    getList: {
      type: Function,
      default: () => {},
    },
    dynamicFields: {
      type: Array,
      default: () => [],
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
      hackReset: true,
      multipleSelection: [],
      dynamicCloumns: [],
    };
  },
  computed: {
    pageSizes: function () {
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
    dynamicFields: {
      handler: function () {
        this.hackReset = false;
        this.dynamicCloumns = this.deepCopy(this.columns);
        this.dynamicCloumns = this.filterColumnsByDynamicFields(
          this.dynamicCloumns
        );
        this.$nextTick(() => {
          this.hackReset = true;
        });
      },
      immediate: true,
    },
  },
  methods: {
    filterColumnsByDynamicFields(dynamicCloumns) {
      dynamicCloumns = dynamicCloumns.filter(
        (r) =>
          r.showType !== 'dynamic' ||
          (r.showType === 'dynamic' &&
            this.dynamicFields.some((f) => f === r.label))
      );
      dynamicCloumns.forEach((r) => {
        if (r.children) {
          r.children = this.filterColumnsByDynamicFields(r.children);
        }
      });
      return dynamicCloumns;
    },
    handleSelectionChange(multipleSelection) {
      this.multipleSelection = multipleSelection;
    },
    handlePageIndexChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.getList();
    },
    handlePageSizeChange(pageSize) {
      this.pagination.pageIndex = 1;
      this.pagination.pageSize = pageSize;
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
    },
    handleRowClick(row, column, event) {
      console.log('handleRowClick', row, column, event);
      this.$emit('row-click', row, column, event);
    },
    deepCopy(obj) {
      const result = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (typeof obj[key] === 'object') {
            result[key] = this.deepCopy(obj[key]); // 递归复制
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.report-table-container {
  overflow: hidden;
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
      button:last-child {
        padding-right: 0;
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
  }
  .common-pagination-container {
    margin: 10px 0;
    text-align: right;
  }
}
</style>
