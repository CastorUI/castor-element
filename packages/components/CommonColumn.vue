<template>
  <el-table-column
    v-if="type === 'selection'"
    :type="type"
    :prop="dataField"
    v-bind="{ align: 'center', ...elementProps }"
  />
  <el-table-column
    v-else-if="type === 'index'"
    :type="type"
    :label="label"
    :prop="dataField"
    :index="indexMethod"
    v-bind="{ align: 'center', ...elementProps }"
  />
  <el-table-column
    v-else-if="type === 'custom'"
    :label="label"
    :prop="dataField"
    v-bind="{ minWidth: 1, align: 'center', ...elementProps }"
  >
    <template slot-scope="scope">
      <component
        :is="customComponents[extendProps.componentKey]"
        :component-data.sync="scope.row[dataField]"
        :model="scope.row"
        :data-field="dataField"
        v-bind="elementProps"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'commands'"
    :label="label"
    :prop="dataField"
    v-bind="{ minWidth: 1, align: 'center', ...elementProps }"
  >
    <template slot-scope="scope">
      <el-link
        v-for="(item, index) of extendProps.commands"
        v-show="
          !item.visibleValidator || item.visibleValidator.call(this, scope.row)
        "
        :key="index"
        :disabled="
          item.disableValidator && item.disableValidator.call(this, scope.row)
        "
        v-bind="item.elementProps"
        @click.stop="$emit(item.command, scope.$index, scope.row)"
      >
        <el-tooltip
          v-if="item.extendProps && item.extendProps.imageUrl"
          popper-class="normal"
          effect="dark"
          :content="item.text"
          placement="top-start"
        >
          <el-image
            :style="
              item.extendProps.imageStyle ||
                'width: 24px; height: 24px;line-height:24px;'
            "
            :src="item.extendProps.imageUrl"
            fit="fill"
          />
        </el-tooltip>
        <span v-else>{{ item.text }} </span>
      </el-link>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'link'"
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
      type: '',
    }"
  >
    <template slot-scope="scope">
      <el-link
        v-bind="elementProps"
        @click.stop="$emit(extendProps.linkCommand, scope.$index, scope.row)"
      >
        {{ scope.row[dataField] }}
      </el-link>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'status'"
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      <span
        v-if="extendProps.options.some((r) => r.value === scope.row[dataField])"
        :style="
          'color:' +
            extendProps.options.filter((r) => r.value === scope.row[dataField])[0]
              .color +
            ';'
        "
      >
        <i
          :class="
            extendProps.options.filter(
              (r) => r.value === scope.row[dataField]
            )[0].icon
          "
        />
        {{
          extendProps.options.filter((r) => r.value === scope.row[dataField])[0]
            .label
        }}
        <el-tooltip
          v-if="
            elementProps.showTips === scope.row[dataField] &&
              scope.row[elementProps.tipsContent]
          "
          popper-class="normal"
          effect="dark"
          placement="bottom"
        >
          <div slot="content">{{ scope.row[elementProps.tipsContent] }}</div>
          <i
            :class="
              extendProps.options.filter(
                (r) => r.value === scope.row[dataField]
              )[0].tipsIcon
            "
          />
        </el-tooltip>
      </span>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'dot-status'"
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      <span
        v-if="extendProps.options.some((r) => r.value === scope.row[dataField])"
        class="dot-status"
      >
        <span
          :style="`display:inline-block; width: 10px;height:10px;border-radius:50%; background: ${
            extendProps.options.filter(
              (r) => r.value === scope.row[dataField]
            )[0].color
          }`"
        />
        {{
          extendProps.options.filter((r) => r.value === scope.row[dataField])[0]
            .label
        }}
      </span>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'keyToValue'"
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      <span
        v-if="extendProps.options.some((r) => r.value === scope.row[dataField])"
      >{{
        extendProps.options.filter((r) => r.value === scope.row[dataField])[0]
          .label
      }}</span>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'multiKeyToValue'"
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      <span>{{
        (
          (
            extendProps.options.filter((r) =>
              (scope.row[dataField] || []).some((t) => t == r.value)
            ) || []
          ).map((r) => r.label) || []
        ).join()
      }}</span>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'expand'"
    type="expand"
    :prop="dataField"
    v-bind="elementProps"
  >
    <template slot-scope="scope">
      <component
        :is="customComponents[extendProps.componentKey]"
        :component-data.sync="scope.row[dataField]"
        :model="scope.row"
        v-bind="elementProps"
      />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="type === 'date'"
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      {{ scope.row[dataField] ? formatDate(scope.row[dataField], extendProps.format): '' }}
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :label="label"
    :prop="dataField"
    v-bind="{
      minWidth: 1,
      align: 'center',
      showOverflowTooltip: true,
      ...elementProps,
    }"
  >
    <template slot-scope="scope">
      {{
        scope.row[dataField] === null || scope.row[dataField] === undefined
          ? ''
          : scope.row[dataField]
      }}
    </template>
  </el-table-column>
</template>
<script>
import * as dayjs from 'dayjs'
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
    dataTemplate: {
      type: Function,
      default: undefined
    },
    indexMethod: {
      type: Function,
      default: () => {}
    },
    customComponents: {
      type: Object,
      default: function() {
        return {};
      }
    },
    elementProps: {
      type: Object,
      default: function() {
        return {};
      }
    },
    extendProps: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return dayjs(date).format(format);
    }
  }
};
</script>
<style lang="scss">
.el-link {
  margin: 0 10px;
}
.el-tooltip__popper {
  max-width: 80%;
}
</style>
