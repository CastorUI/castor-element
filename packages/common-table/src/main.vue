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
        <el-popover
          placement="top-start"
          title="列设置"
          width="200"
          trigger="click"
        >
          <div class="config-columns">
            <draggable
              tag="ul"
              :list="configColumns"
              class="list-group"
            >
              <div
                v-for="(configColumnItem,configColumnIndex) in configColumns"
                :key="configColumnIndex"
                class="config-column"
              >
                <svg
                  t="1610688913051"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3576"
                  width="16"
                  height="16"
                >
                  <path
                    d="M64.2 271H928v96H64.2zM64.2 463.1H928v96H64.2zM64.2 655.3H928v96H64.2z"
                    p-id="3577"
                  />
                </svg>
                <el-checkbox v-model="configColumnItem.show" />
                <span>{{ configColumnItem.label }}</span>
                <svg
                  t="1610689212107"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="11011"
                  width="16"
                  height="16"
                >
                  <path
                    d="M796.423 524.478l-259.11-259.292c-6.368-6.4-14.69-9.472-22.977-9.408-1.12-0.096-2.08-0.64-3.2-0.64-4.672 0-9.024 1.087-13.023 2.88-4.032 1.536-7.872 3.872-11.137 7.135L227.648 524.277c-12.513 12.48-12.544 32.735-0.033 45.248 6.24 6.272 14.432 9.408 22.657 9.408 8.191 0 16.352-3.136 22.624-9.344l206.24-206.163V927.14c0 17.696 14.336 32 32 32s32.001-14.304 32.001-32V361.858l207.91 207.74c6.241 6.271 14.497 9.44 22.688 9.44s16.32-3.103 22.56-9.312c12.575-12.449 12.608-32.737 0.128-45.248zM864.003 192h-704c-17.665 0-32.001-14.336-32.001-32s14.336-32 32-32h704c17.696 0 32 14.336 32 32s-14.304 32-32 32z"
                    p-id="11012"
                  />
                </svg>
                <svg
                  t="1610689304174"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="17484"
                  width="16"
                  height="16"
                >
                  <path
                    d="M859.9 474H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8z m-353.6-74.7c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7 0.4-11.7-5.7-11.7H550V104c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v156h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.6z m11.4 225.4a7.14 7.14 0 0 0-11.3 0L405.6 752.3a7.23 7.23 0 0 0 5.7 11.7H474v156c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V764h62.8c6 0 9.4-7 5.7-11.7L517.7 624.7z"
                    p-id="17485"
                  />
                </svg>
                <svg
                  t="1610689352063"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="18220"
                  width="16"
                  height="16"
                >
                  <path
                    d="M524.202667 729.173333l189.525333-189.525333h-142.165333V85.333333h-94.72v454.314667H334.549333l189.610667 189.482667z m453.290666 170.666667v-74.666667H85.333333v74.666667h892.16z"
                    p-id="18221"
                  />
                </svg>
              </div>
            </draggable>
          </div>
          <el-button
            slot="reference"
            v-bind="{type: 'text',size:'small',icon: 'el-icon-setting'}"
          >
            列设置
          </el-button>
        </el-popover>
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
        v-if="hackReset"
        ref="table"
        v-loading="loading"
        row-key="id"
        :data="dataSource"
        :default-sort="defaultSort"
        v-bind="{border: true, ...elementProps}"
        @row-click="row => $emit('row-click', row)"
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
    <div class="common-pagination-container">
      <el-pagination
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :total="pagination.total"
        style="margin-top: 10px;"
        v-bind="{layout: 'total,sizes, prev, pager, next',hideOnSinglePage: true, ...pagination.elementProps}"
        @size-change="pageSize => handlePageSizeChange(pageSize)"
        @current-change="pageIndex => handlePageIndexChange(pageIndex)"
      />
    </div>
  </div>
</template>

<script>
import CommonColumn from './common-column';
import draggable from 'vuedraggable';
export default {
  name: 'CaCommonTable',
  components: {
    'common-column': CommonColumn,
    draggable,
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
      hackReset: true,
      multipleSelection: [],
      dynamicColums: this.columns,
      configColumns: this.columns.map((r) => {
        return {
          show: true,
          dataField: r.dataField,
          label: r.type === 'selection' ? '选择列' : r.label,
        };
      }),
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
      handler() {
        this.hackReset = false;
        this.dynamicColums = this.configColumns
          .filter((r) => r.show)
          .map((r) => {
            return this.columns.filter((c) => c.dataField === r.dataField)[0];
          });
        this.$nextTick(() => {
          this.hackReset = true;
        });
      },
      deep: true,
      immediate: false,
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
