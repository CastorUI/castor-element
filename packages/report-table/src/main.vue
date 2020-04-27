<template>
  <div
    v-if="hackReset"
    class="report-table-container"
  >
    <div class="table-commands">
      <el-button
        v-if="addCommand && addCommand.text && (!addCommand.visibleValidator || addCommand.visibleValidator.call(this))"
        type="text"
        :icon="addCommand.icon"
        class="table-add-command"
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
          :disabled="item.disableValidator &&item.disableValidator.call(this)"
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
        :data="dataSource"
        :span-method="spanMethod"
        :default-sort="defaultSort"
        :border="extendProps.border !== undefined ? extendProps.border : true"
        :stripe="extendProps.stripe"
        :style="extendProps.style || 'width:100%;min-width:700px;height:auto;'"
        @row-click="row => $emit('row-click', row)"
        @selection-change="multipleSelection => handleSelectionChange(multipleSelection)"
        @sort-change="args=> handleSortChange(args)"
      >
        <template v-for="(item,index) of dynamicCloumns">
          <el-table-column
            v-if="item.reportType==='title' && item.children && item.children.length > 0"
            :key="index"
            :label="item.label"
            :align="item.align"
          >
            <template v-for="(childItem,childIndex) of item.children">
              <el-table-column
                v-if="childItem.reportType==='title' && childItem.children && childItem.children.length > 0"
                :key="'childIndex' + childIndex"
                :label="childItem.label"
                :align="childItem.align"
              >
                <template v-for="(grandChildItem,grandChildIndex) of childItem.children">
                  <el-table-column
                    v-if="grandChildItem.reportType==='title'"
                    :key="'grandChild' + grandChildIndex"
                    :label="grandChildItem.label"
                    :align="grandChildItem.align"
                  />
                  <common-column
                    v-if="grandChildItem.reportType==='data'"
                    :key="grandChildItem.dataField"
                    :label="grandChildItem.label"
                    :data-field="grandChildItem.dataField"
                    :options="grandChildItem.options"
                    :type="grandChildItem.type"
                    :commands="grandChildItem.commands"
                    :link-command="grandChildItem.linkCommand"
                    :index-method="indexMethod"
                    :width="grandChildItem.width"
                    :align="grandChildItem.align"
                    :column-span="grandChildItem.columnSpan"
                    :min-width="grandChildItem.minWidth"
                    :fixed="grandChildItem.fixed"
                    :data-template="grandChildItem.dataTemplate"
                    :sortable="grandChildItem.sortable"
                    :extend-props="grandChildItem.extendProps"
                    v-on="$listeners"
                  />
                </template>
              </el-table-column>
              <common-column
                v-if="childItem.reportType==='data'"
                :key="childItem.dataField"
                :label="childItem.label"
                :data-field="childItem.dataField"
                :options="childItem.options"
                :type="childItem.type"
                :commands="childItem.commands"
                :link-command="childItem.linkCommand"
                :index-method="indexMethod"
                :width="childItem.width"
                :align="childItem.align"
                :column-span="childItem.columnSpan"
                :min-width="childItem.minWidth"
                :fixed="childItem.fixed"
                :data-template="childItem.dataTemplate"
                :sortable="childItem.sortable"
                :extend-props="childItem.extendProps"
                v-on="$listeners"
              />
            </template>
          </el-table-column>
          <common-column
            v-if="item.reportType==='data'"
            :key="item.dataField"
            :label="item.label"
            :data-field="item.dataField"
            :options="item.options"
            :type="item.type"
            :commands="item.commands"
            :link-command="item.linkCommand"
            :index-method="indexMethod"
            :width="item.width"
            :align="item.align"
            :column-span="item.columnSpan"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :data-template="item.dataTemplate"
            :sortable="item.sortable"
            :extend-props="item.extendProps"
            v-on="$listeners"
          />
        </template>
      </el-table>
    </div>
    <div
      v-if="pagination.total > 10"
      class="common-pagination-container"
    >
      <el-pagination
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        :background="pagination.background"
        layout="total,sizes, prev, pager, next"
        @size-change="pageSize => handlePageSizeChange(pageSize)"
        @current-change="pageIndex => handlePageIndexChange(pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import CommonColumn from '../../common-table/src/common-column';
export default {
  name: 'CaReportTable',
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
      default: () => []
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
      default: () => { }
    },
    customCommands: {
      type: Array,
      default: () => []
    },
    defaultSort: {
      type: Object,
      default: () => { }
    },
    getList: {
      type: Function,
      default: () => { }
    },
    spanMethod: {
      type: Function,
      default: () => { }
    },
    dynamicFields: {
      type: Array,
      default: () => []
    },
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
  },
  data() {
    return {
      hackReset: true,
      multipleSelection: [],
      dynamicCloumns: []
    };
  },
  computed: {
    pageSizes: function() {
      const pageSizeArray=[10,15,20,30,50];
      return pageSizeArray.indexOf(this.pagination.pageSize)>-1
        ? pageSizeArray
        :pageSizeArray.concat(this.pagination.pageSize);
    }
  },
  watch: {
    dynamicFields: {
      handler: function() {
        this.hackReset=false;
        this.dynamicCloumns=this.deepCopy(this.columns);
        this.dynamicCloumns=this.filterColumnsByDynamicFields(
          this.dynamicCloumns
        );
        this.$nextTick(() => {
          this.hackReset=true;
        });
      },
      immediate: true
    }
  },
  methods: {
    filterColumnsByDynamicFields(dynamicCloumns) {
      dynamicCloumns=dynamicCloumns.filter(
        r =>
          r.showType!=='dynamic'||
          (r.showType==='dynamic'&&
            this.dynamicFields.some(f => f===r.label))
      );
      dynamicCloumns.forEach(r => {
        if(r.children) {
          r.children=this.filterColumnsByDynamicFields(r.children);
        }
      });
      return dynamicCloumns;
    },
    handleSelectionChange(multipleSelection) {
      this.multipleSelection=multipleSelection;
    },
    handlePageIndexChange(pageIndex) {
      this.pagination.pageIndex=pageIndex;
      this.getList();
    },
    handlePageSizeChange(pageSize) {
      this.pagination.pageIndex=1;
      this.pagination.pageSize=pageSize;
      this.getList();
    },
    handleSortChange({ prop,order }) {
      this.pagination.sortField=prop;
      this.pagination.order=order;
      this.getList();
    },
    indexMethod(index) {
      return (
        this.pagination.pageSize*(this.pagination.pageIndex-1)+index+1
      );
    },
    deepCopy(obj) {
      const result=Array.isArray(obj)? []:{};
      for(const key in obj) {
        if(obj.hasOwnProperty(key)) {
          if(typeof obj[key]==='object') {
            result[key]=this.deepCopy(obj[key]); // 递归复制
          } else {
            result[key]=obj[key];
          }
        }
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.report-table-container {
  background: #fff;
  padding: 0 24px;
  margin-top: 16px;
  margin-bottom: 10px;
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
        content: "";
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
