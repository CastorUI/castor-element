<template>
  <el-table-column
    v-if="type==='selection'"
    :type="type"
    v-bind="{align: 'center', ...extendProps}"
  />
  <el-table-column
    v-else-if="type==='index'"
    :type="type"
    :label="label"
    :index="indexMethod"
    v-bind="{align: 'center', ...extendProps}"
  />
  <el-table-column
    v-else-if="type==='custom'"
    :label="label"
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...extendProps}"
  >
    <!-- <template slot-scope="scope">
      // eslint-disable-next-line vue/no-v-html
      <div v-html="dataTemplate(scope.row)" />
    </template> -->
  </el-table-column>
  <el-table-column
    v-else-if="type==='commands'"
    :label="label"
    v-bind="{minWidth: 1, align: 'center', ...extendProps}"
  >
    <template slot-scope="scope">
      <el-link
        v-for="(item,index) of commands"
        v-show="!item.visibleValidator || item.visibleValidator.call(this, scope.row)"
        :key="index"
        :disabled="item.disableValidator && item.disableValidator.call(this,scope.row)"
        v-bind="extendProps"
        @click.stop="$emit(item.command,scope.$index,scope.row)"
      >
        {{ item.text }}
      </el-link>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type==='link'"
    :label="label"
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...extendProps}"
  >
    <template slot-scope="scope">
      <el-link
        v-bind="extendProps"
        @click.stop="$emit(linkCommand,scope.$index,scope.row)"
      >
        {{ scope.row[dataField] }}
      </el-link>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type==='status'"
    :label="label"
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...extendProps}"
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
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...extendProps}"
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
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...extendProps}"
  >
    <template slot-scope="scope">
      <span v-if="options.some(r=>r.value === scope.row[dataField])">{{ options.filter(r=>r.value === scope.row[dataField])[0].label }}</span>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="label"
    :prop="dataField"
    v-bind="{minWidth: 1, align: 'center', showOverflowTooltip: true, ...extendProps}"
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
    dataTemplate: {
      type: Function,
      default: undefined
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
