<template>
  <el-table-column
    v-if="type==='selection'"
    :type="type"
    :width="width"
    :align="align"
    :reserve-selection="extendProps.reserveSelection || false"
    :selectable="extendProps.selectable"
  />
  <el-table-column
    v-else-if="type==='index'"
    :type="type"
    :label="label"
    :width="width"
    :align="align"
    :index="indexMethod"
  />
  <el-table-column
    v-else-if="type==='custom'"
    :label="label"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :sortable="sortable?'custom':false"
    :align="align"
    show-overflow-tooltip
  >
    <!-- <template slot-scope="scope">
      // eslint-disable-next-line vue/no-v-html
      <div v-html="dataTemplate(scope.row)" />
    </template> -->
  </el-table-column>
  <el-table-column
    v-else-if="type==='commands'"
    :label="label"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :align="align"
  >
    <template slot-scope="scope">
      <el-link
        v-for="(item,index) of commands"
        v-show="!item.visibleValidator || item.visibleValidator.call(this, scope.row)"
        :key="index"
        :type="item.extendProps.type"
        :disabled="item.disableValidator && item.disableValidator.call(this,scope.row)"
        @click.stop="$emit(item.command,scope.$index,scope.row)"
      >
        {{ item.text }}
      </el-link>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type==='link'"
    :label="label"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :align="align"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <el-link
        :type="extendProps.type"
        @click.stop="$emit(linkCommand,scope.$index,scope.row)"
      >
        {{ scope.row[dataField] }}
      </el-link>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type==='status'"
    :label="label"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :align="align"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <span
        v-if="options.some(r=>r.value === scope.row[dataField])"
        :style="'color:'+options.filter(r=>r.value === scope.row[dataField])[0].color+';'"
      >
        <i :class="options.filter(r=>r.value === scope.row[dataField])[0].icon" />
        {{ options.filter(r=>r.value === scope.row[dataField])[0].label }}
        <el-tooltip
          v-if="extendProps.showTips === scope.row[dataField] && scope.row[extendProps.tipsContent]"
          class="item"
          effect="dark"
          placement="bottom"
        >
          <div slot="content">{{ scope.row[extendProps.tipsContent] }}</div>
          <i :class="options.filter(r=>r.value === scope.row[dataField])[0].tipsIcon" />
        </el-tooltip>
      </span>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type==='dot-status'"
    :label="label"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :align="align"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <span
        v-if="options.some(r=>r.value === scope.row[dataField])"
        class="dot-status"
      >
        <span :style="`display:inline-block; width: 10px;height:10px;border-radius:50%; background: ${options.filter(r=>r.value === scope.row[dataField])[0].color}`" />
        {{ options.filter(r=>r.value === scope.row[dataField])[0].label }}
      </span>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type==='keyToValue'"
    :label="label"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :align="align"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <span v-if="options.some(r=>r.value === scope.row[dataField])">{{ options.filter(r=>r.value === scope.row[dataField])[0].label }}</span>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="label"
    :prop="dataField"
    :width="width"
    :min-width="minWidth || columnSpan"
    :fixed="fixed"
    :sortable="sortable?'custom':false"
    :align="align"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      {{ scope.row[dataField] || '/' }}
    </template>
  </el-table-column>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    label: {
      type: String,
      default: undefined
    },
    dataField: {
      type: String,
      default: undefined
    },
    options: {
      type: Array,
      default: undefined
    },
    commands: {
      type: Array,
      default: function() {
        return [];
      }
    },
    width: {
      type: String,
      default: undefined
    },
    align: {
      type: String,
      default: 'center'
    },
    columnSpan: {
      type: Number,
      default: 1
    },
    minWidth: {
      type: String,
      default: undefined
    },
    fixed: {
      type: String,
      default: undefined
    },
    dataTemplate: {
      type: Function,
      default: undefined
    },
    sortable: {
      type: Boolean,
      default: false
    },
    linkCommand: {
      type: String,
      default: ''
    },
    indexMethod: {
      type: Function,
      default: () => {}
    },
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  }
};
</script>
<style>
.el-link {
  margin: 0 10px;
}
</style>
