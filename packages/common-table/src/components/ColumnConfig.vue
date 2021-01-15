
<template>
  <el-popover
    placement="top-start"
    title="列设置"
    trigger="click"
  >
    <div class="column-config">
      <div
        v-if="leftFixedColumns&&leftFixedColumns.length"
        class="column-config-title"
      >
        固定在左侧
      </div>
      <draggable
        v-if="leftFixedColumns&&leftFixedColumns.length"
        :list="leftFixedColumns"
        class="draggable-items"
        @change="refreshTypedColumns"
      >
        <div
          v-for="leftFixedItem in leftFixedColumns"
          :key="leftFixedItem.dataField"
          class="item"
        >
          <svg
            t="1610688913051"
            class="icon drag-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3576"
            width="14"
            height="14"
          >
            <path
              d="M64.2 271H928v96H64.2zM64.2 463.1H928v96H64.2zM64.2 655.3H928v96H64.2z"
              p-id="3577"
            />
          </svg>
          <el-checkbox v-model="leftFixedItem.show" />
          <span class="column-label">{{ leftFixedItem.label }}</span>
          <el-tooltip
            content="不固定"
            placement="top"
          >
            <svg
              t="1610689304174"
              class="icon fix-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="17484"
              width="16"
              height="16"
              @click="handleUnFixed(leftFixedItem)"
            >
              <path
                d="M859.9 474H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8z m-353.6-74.7c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7 0.4-11.7-5.7-11.7H550V104c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v156h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.6z m11.4 225.4a7.14 7.14 0 0 0-11.3 0L405.6 752.3a7.23 7.23 0 0 0 5.7 11.7H474v156c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V764h62.8c6 0 9.4-7 5.7-11.7L517.7 624.7z"
                p-id="17485"
              />
            </svg>
          </el-tooltip>
          <el-tooltip
            content="固定在右侧"
            placement="top"
          >
            <svg
              t="1610689352063"
              class="icon fix-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="18220"
              width="16"
              height="16"
              @click="handleRightFixed(leftFixedItem)"
            >
              <path
                d="M524.202667 729.173333l189.525333-189.525333h-142.165333V85.333333h-94.72v454.314667H334.549333l189.610667 189.482667z m453.290666 170.666667v-74.666667H85.333333v74.666667h892.16z"
                p-id="18221"
              />
            </svg>
          </el-tooltip>
        </div>
      </draggable>
      <div
        v-if="(unFixedColumns && unFixedColumns.length)&&((leftFixedColumns && leftFixedColumns.length)||(rightFixedColumns && rightFixedColumns.length))"
        class="column-config-title"
      >
        不固定
      </div>
      <draggable
        :list="unFixedColumns"
        class="draggable-items"
        @change="refreshTypedColumns"
      >
        <div
          v-for="configColumnItem in unFixedColumns"
          :key="configColumnItem.dataField"
          class="item"
        >
          <svg
            t="1610688913051"
            class="icon drag-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3576"
            width="14"
            height="14"
          >
            <path
              d="M64.2 271H928v96H64.2zM64.2 463.1H928v96H64.2zM64.2 655.3H928v96H64.2z"
              p-id="3577"
            />
          </svg>
          <el-checkbox v-model="configColumnItem.show" />
          <span class="column-label">{{ configColumnItem.label }}</span>
          <el-tooltip
            content="固定在左侧"
            placement="top"
          >
            <svg
              t="1610689212107"
              class="icon fix-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11011"
              width="16"
              height="16"
              @click="handleLeftFixed(configColumnItem)"
            >
              <path
                d="M796.423 524.478l-259.11-259.292c-6.368-6.4-14.69-9.472-22.977-9.408-1.12-0.096-2.08-0.64-3.2-0.64-4.672 0-9.024 1.087-13.023 2.88-4.032 1.536-7.872 3.872-11.137 7.135L227.648 524.277c-12.513 12.48-12.544 32.735-0.033 45.248 6.24 6.272 14.432 9.408 22.657 9.408 8.191 0 16.352-3.136 22.624-9.344l206.24-206.163V927.14c0 17.696 14.336 32 32 32s32.001-14.304 32.001-32V361.858l207.91 207.74c6.241 6.271 14.497 9.44 22.688 9.44s16.32-3.103 22.56-9.312c12.575-12.449 12.608-32.737 0.128-45.248zM864.003 192h-704c-17.665 0-32.001-14.336-32.001-32s14.336-32 32-32h704c17.696 0 32 14.336 32 32s-14.304 32-32 32z"
                p-id="11012"
              />
            </svg>
          </el-tooltip>
          <el-tooltip
            content="固定在右侧"
            placement="top"
          >
            <svg
              t="1610689352063"
              class="icon fix-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="18220"
              width="16"
              height="16"
              @click="handleRightFixed(configColumnItem)"
            >
              <path
                d="M524.202667 729.173333l189.525333-189.525333h-142.165333V85.333333h-94.72v454.314667H334.549333l189.610667 189.482667z m453.290666 170.666667v-74.666667H85.333333v74.666667h892.16z"
                p-id="18221"
              />
            </svg>
          </el-tooltip>
        </div>
      </draggable>
      <div
        v-if="rightFixedColumns && rightFixedColumns.length"
        class="column-config-title"
      >
        固定在右侧
      </div>
      <draggable
        v-if="rightFixedColumns && rightFixedColumns.length"
        :list="rightFixedColumns"
        class="draggable-items"
      >
        <div
          v-for="rightFixedItem in rightFixedColumns"
          :key="rightFixedItem.dataField"
          class="item"
        >
          <svg
            t="1610688913051"
            class="icon drag-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3576"
            width="14"
            height="14"
          >
            <path
              d="M64.2 271H928v96H64.2zM64.2 463.1H928v96H64.2zM64.2 655.3H928v96H64.2z"
              p-id="3577"
            />
          </svg>
          <el-checkbox v-model="rightFixedItem.show" />
          <span class="column-label">{{ rightFixedItem.label }}</span>
          <el-tooltip
            content="固定在左侧"
            placement="top"
          >
            <svg
              t="1610689212107"
              class="icon fix-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11011"
              width="16"
              height="16"
              @click="handleLeftFixed(rightFixedItem)"
            >
              <path
                d="M796.423 524.478l-259.11-259.292c-6.368-6.4-14.69-9.472-22.977-9.408-1.12-0.096-2.08-0.64-3.2-0.64-4.672 0-9.024 1.087-13.023 2.88-4.032 1.536-7.872 3.872-11.137 7.135L227.648 524.277c-12.513 12.48-12.544 32.735-0.033 45.248 6.24 6.272 14.432 9.408 22.657 9.408 8.191 0 16.352-3.136 22.624-9.344l206.24-206.163V927.14c0 17.696 14.336 32 32 32s32.001-14.304 32.001-32V361.858l207.91 207.74c6.241 6.271 14.497 9.44 22.688 9.44s16.32-3.103 22.56-9.312c12.575-12.449 12.608-32.737 0.128-45.248zM864.003 192h-704c-17.665 0-32.001-14.336-32.001-32s14.336-32 32-32h704c17.696 0 32 14.336 32 32s-14.304 32-32 32z"
                p-id="11012"
              />
            </svg>
          </el-tooltip>
          <el-tooltip
            content="不固定"
            placement="top"
          >
            <svg
              t="1610689304174"
              class="icon fix-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="17484"
              width="16"
              height="16"
              @click="handleUnFixed(rightFixedItem)"
            >
              <path
                d="M859.9 474H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8z m-353.6-74.7c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7 0.4-11.7-5.7-11.7H550V104c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v156h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.6z m11.4 225.4a7.14 7.14 0 0 0-11.3 0L405.6 752.3a7.23 7.23 0 0 0 5.7 11.7H474v156c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V764h62.8c6 0 9.4-7 5.7-11.7L517.7 624.7z"
                p-id="17485"
              />
            </svg>
          </el-tooltip>
        </div>
      </draggable>
    </div>
    <el-button
      slot="reference"
      v-bind="{type: 'text',size:'small',icon: 'el-icon-setting'}"
      style="margin-left:10px;"
    >
      列设置
    </el-button>
  </el-popover>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  components: {
    draggable,
  },
  props: {
    defaultConfigColumns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      leftFixedColumns: [],
      unFixedColumns: [],
      rightFixedColumns: [],
    };
  },
  created() {
    this.getTypedColumns(this.defaultConfigColumns);
  },
  methods: {
    getTypedColumns(columns) {
      this.leftFixedColumns = columns.filter((r) => r.fixed === 'left');
      this.unFixedColumns = columns.filter((r) => !r.fixed);
      this.rightFixedColumns = columns.filter((r) => r.fixed === 'right');
    },
    refreshTypedColumns() {
      const tempAllColumns = this.leftFixedColumns
        .concat(...this.unFixedColumns)
        .concat(this.rightFixedColumns);
      this.getTypedColumns(tempAllColumns);
      const finalAllColumns = this.leftFixedColumns
        .concat(...this.unFixedColumns)
        .concat(this.rightFixedColumns);
      this.$emit('update:setConfigColumns', finalAllColumns);
    },
    handleLeftFixed(item) {
      console.log('handleLeftFixed', item);
      item.fixed = 'left';
      this.refreshTypedColumns();
    },
    handleUnFixed(item) {
      console.log('handleUnFixed', item);
      item.fixed = undefined;
      this.refreshTypedColumns();
    },
    handleRightFixed(item) {
      console.log('handleRightFixed', item);
      item.fixed = 'right';
      this.refreshTypedColumns();
    },
  },
};
</script>

<style lang="scss">
.column-config {
  .column-config-title {
    margin-top: 6px;
    margin-bottom: 6px;
    padding-left: 24px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
  .draggable-items {
    .item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 4px 16px 4px 0;
      .drag-icon {
        padding-right: 6px;
      }
      .column-label {
        flex: 1;
        padding: 0 4px;
      }
      .fix-icon {
        padding: 0 4px;
      }
    }
  }
}
</style>