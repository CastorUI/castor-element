<template>
  <div class="CommonDescCtrl">
    <div v-if="type === 'tag'">
      <el-tag
        :color="(elementProps || {}).color"
        :style="{
          ...(elementProps || {}).style
        }"
        v-bind="{ ...elementProps }"
      >
        {{ model[dataField] }}
      </el-tag>
    </div>
    <!-- -->
    <div v-else-if="type === 'keyTag'">
      <el-tag
        :color="
          ((extendProps.options || []).filter(
            (r) => r.value === model[dataField]
          )[0] || {}).color
        "
        effect="dark"
        :style="{
          borderColor:
            ((extendProps.options || []).filter(
              (r) => r.value === model[dataField]
            )[0] || {}).color,
          fontWeight: 'bold',
          ...(elementProps || {}).style,
        }"
        v-bind="{ ...elementProps }"
      >
        {{
          ((extendProps.options || []).filter(
            (r) => r.value === model[dataField]
          )[0] || {}).label
        }}
      </el-tag>
    </div>
    <div v-else-if="type === 'keyToValue'">
      <span
        :style="{
          ...(elementProps || {}).style,
        }"
      >
        {{
          ((extendProps.options || []).filter(
            (r) => r.value === model[dataField]
          )[0] || {}).label
        }}
      </span>
    </div>
    <div v-else-if="type === 'link'">
      <el-link
        icon="el-icon-link"
        type="text"
        v-bind="{ ...extendProps.formItemProps }"
        @click.stop="$emit(extendProps.linkCommand, { model })"
      >
        {{ model[dataField] }}
      </el-link>
    </div>
    <div
      v-else-if="type === 'date'"
    >
      {{ model[dataField] ? formatDate(model[dataField], extendProps.format): '' }}
    </div>
    <div
      v-else-if="type === 'custom'"
      :label="label"
      :prop="dataField"
      v-bind="{ minWidth: 1, ...elementProps }"
    >
      <component
        :is="customComponents[extendProps.componentKey]"
        :component-data.sync="model[dataField]"
        :model="model"
        :data-field="dataField"
        v-bind="{ ...elementProps }"
      />
    </div>
    <div v-else-if="type === 'button'">
      <el-button
        v-bind="{ ...extendProps.formItemProps, ...elementProps }"
        @click.stop="$emit(extendProps.command, { model })"
      >
        {{ model[dataField] }}
      </el-button>
    </div>
    <span v-else>
      {{
        `${model[dataField] ||
          (elementProps.suffix ? ' - ' : '暂无')}${elementProps.suffix || ''}`
      }}
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
import * as dayjs from 'dayjs'
export default {
  components: {},
  props: {
    type: {
      type: String,
      default: 'default',
    },
    command: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: undefined,
    },
    width: {
      type: String,
      default: undefined,
    },
    defaultModel: {
      type: Object,
      default: () => {},
    },
    dataField: {
      type: String,
      default: '',
    },
    customComponents: {
      type: Object,
      default: function () {
        return {};
      },
    },
    elementProps: {
      type: Object,
      default: () => {},
    },
    extendProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    model() {
      return this.defaultModel;
    },
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return dayjs(date).format(format);
    }
  }
};
</script>

<style scoped lang="scss">
.CommonDescCtrl {
}
</style>
