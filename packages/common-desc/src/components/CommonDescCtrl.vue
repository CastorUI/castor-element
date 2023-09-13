<template>
  <div class="CommonDescCtrl">
    <div v-if="type === 'tag'">
      <el-tag v-bind="{ ...elementProps }">
        {{ model[dataField] }}
      </el-tag>
    </div>
    <!-- -->
    <div v-else-if="type === 'keyTag'">
      <span v-if="extendProps.options.some((r) => r.value === model[dataField])">
        <el-tag
          :color="
            (extendProps.options || []).filter(
              (r) => r.value === model[dataField]
            )[0].color || 'blue'
          "
          v-bind="{ ...elementProps }"
        >
          {{
            (extendProps.options || []).filter(
              (r) => r.value === model[dataField]
            )[0].label
          }}
        </el-tag>
      </span>
      <span v-else />
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
};
</script>

<style scoped lang="scss">
.CommonDescCtrl {
}
</style>
