<template>
  <div
    v-resize:debounce="handleResize"
    style="overflow: hidden; padding: 14px 10px 0 10px"
    class="clearfix common-query"
  >
    <div v-if="fields.some((r) => r.showType === 'dynamic')" style=" float: left">
      <el-button style="padding-left: 10px; padding-right: 10px" @click="$refs.filterSelect.$el.click()">
        筛选
        <i class="el-icon-arrow-down" />
      </el-button>
      <el-select
        ref="filterSelect"
        v-model="checkedKeys"
        class="dynamic-filter-select"
        multiple
        collapse-tags
        placeholder="请选择"
        @change="handleCheckedKeyChange"
      >
        <el-option
          v-for="item in fields.filter((r) => r.showType === 'dynamic')"
          :key="item.dataField"
          class="dynamic-select-options"
          :label="item.label"
          :value="item.dataField"
        />
      </el-select>
    </div>
    <el-form
      :id="formId"
      ref="form"
      :model="model"
      style="overflow: hidden"
      :style="fields.some((r) => r.showType === 'dynamic') ? 'marginLeft:68px;' : ''
      "
      v-bind="{
        labelWidth: '110px',
        ...elementProps,
      }"
      @submit.native.prevent
    >
      <template v-if="dynamicFieldsPosition === 'start'">
        <common-query-ctrl
          v-for="item in checkedFields"
          :key="item.dataField"
          :type="item.type"
          :label="item.label"
          :model="model"
          :data-field="item.dataField"
          :width="(100 / rowFieldsCount) * (item.columnSpan || 1) + '%'"
          :disable-validator="item.disableValidator"
          :visible-validator="item.visibleValidator"
          :element-props="item.elementProps || {}"
          :extend-props="item.extendProps || {}"
        />
      </template>
      <common-query-ctrl
        v-for="item in fields.filter((r) => r.showType !== 'dynamic')"
        :key="item.dataField"
        :type="item.type"
        :label="item.label"
        :model="model"
        :data-field="item.dataField"
        :width="(100 / rowFieldsCount) * (item.columnSpan || 1) + '%'"
        :disable-validator="item.disableValidator"
        :visible-validator="item.visibleValidator"
        :element-props="item.elementProps || {}"
        :extend-props="item.extendProps || {}"
      />
      <template v-if="dynamicFieldsPosition === 'end'">
        <common-query-ctrl
          v-for="item in checkedFields"
          :key="item.dataField"
          :type="item.type"
          :label="item.label"
          :model="model"
          :data-field="item.dataField"
          :width="(100 / rowFieldsCount) * (item.columnSpan || 1) + '%'"
          :disable-validator="item.disableValidator"
          :visible-validator="item.visibleValidator"
          :element-props="item.elementProps || {}"
          :extend-props="item.extendProps || {}"
        />
      </template>
      <el-form-item label-width="10px" :style="`float:${commandsFloat};`">
        <el-button
          v-for="(item, index) of commands"
          :key="index"
          :loading="item.loading && loading"
          :disabled="item.disableValidator && item.disableValidator.call(this)"
          class="filter-item"
          v-bind="{
            ...item.elementProps,
            icon: (item.extendProps || {}).iconPosition === 'right' ? '' : (item.elementProps || {}).icon
          }"
          @click="$emit(item.command)"
        >
          {{ item.text }}
          <i
            v-if="(item.extendProps || {}).iconPosition === 'right' && (item.elementProps || {}).icon"
            class="el-icon--right"
            :class="item.elementProps.icon"
          />
        </el-button>

        <el-dropdown
          v-if="
            downloadOpt && downloadOpt.options && downloadOpt.options.length > 0
          "
        >
          <el-button
            type="primary"
            icon="el-icon-document"
            :loading="downloadOpt.loading && loading"
            :plain="downloadOpt.elementProps && downloadOpt.elementProps.plain"
          >
            导出<i class="el-icon-arrow-down el-icon--right" />
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) of downloadOpt.options"
              :key="index"
              :icon="item.icon"
              :disabled="item.disableValidator && item.disableValidator.call(this)
              "
              :type="item.styleType || 'primary'"
              class="filter-item"
              @click.native="$emit(item.command)"
            >
              {{ item.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import resize from 'vue-resize-directive';
import CommonQueryCtrl from './components/CommonQueryCtrl';
export default {
  name: 'CaCommonQuery',
  components: {
    CommonQueryCtrl
  },
  directives: { resize },
  props: {
    formId: {
      type: String,
      default: 'queryForm'
    },
    loading: {
      type: Boolean,
      default: false
    },
    maxFieldWidth: {
      type: Number,
      default: 230
    },
    commandsFloat: {
      type: String,
      default: 'right'
    },
    model: {
      type: Object,
      default: function () {
        return {};
      }
    },
    fields: {
      type: Array,
      default: function () {
        return [];
      }
    },
    commands: {
      type: Array,
      default: function () {
        return [];
      }
    },
    dynamicFieldsPosition: {
      type: String,
      default: 'end'
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    downloadOpt: {
      type: Object,
      default: function () {
        return {};
      }
    },
    elementProps: {
      type: Object,
      default: function () {
        return {};
      }
    },
    fixedRowCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      checkedKeys: [],
      rowFieldsCount: this.fixedRowCount || 3
    };
  },
  computed: {
    checkedFields() {
      return this.fields.filter(
        r =>
          r.showType === 'dynamic' && this.checkedKeys.indexOf(r.dataField) > -1
      );
    }
  },
  watch: {
    defaultCheckedKeys: {
      handler() {
        this.checkedKeys = [...this.defaultCheckedKeys];
      },
      immediate: true,
      deep: false
    },
    model: {
      handler() {
        console.log('watch model change start2', this.model, this.checkedKeys);
        this.fields.filter((r) => r.showType === 'dynamic').forEach((item) => {
          if (this.model[item.dataField] !== null && this.model[item.dataField] !== undefined && (Array.isArray(this.model[item.dataField]) ? this.model[item.dataField].length > 0 : true)) {
            if (this.checkedKeys.indexOf(item.dataField) === -1) {
              this.checkedKeys.push(item.dataField);
            }
          }
        })
        console.log('watch model change end2', this.checkedKeys);
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.handleResize();
    this.keyUpSubmit();
  },
  methods: {
    handleResize: function () {
      if (this.fixedRowCount !== 0) return
      const form = document.getElementById(this.formId);
      this.rowFieldsCount = Math.floor(
        form.getBoundingClientRect().width / this.maxFieldWidth
      );
    },
    keyUpSubmit: function () {
      document.onkeydown = (e) => {
        const _key = window.event.keyCode;
        if (_key === 13) {
          for (let i = 0; i < this.commands.length; i++) {
            if (this.commands[i].keyCode === 13) {
              this.$emit(this.commands[i].command);
            }
          }
        }
      }
    },
    handleCheckedKeyChange: function () {
      console.log('handleCheckedKeyChange', this.checkedKeys)
      this.fields
        .filter(
          r =>
            r.showType === 'dynamic' &&
            this.checkedKeys.indexOf(r.dataField) === -1
        )
        .forEach(r => {
          this.model[r.dataField] = undefined;
        });
    }
  }
};
</script>
<style lang="scss">
.common-query {
  .dynamic-filter-select {
    position: absolute;
    top: 10px;
    left: 10px;
    visibility: hidden;
    width: 148px;
    overflow: hidden;
  }

  .dynamic-select-options {
    min-width: 150px;
  }

  .el-form-item--mini {
    margin-bottom: 10px !important;

    &.fixed-height-field {
      .el-form-item__content {
        height: 28px;
      }
    }
  }

  .el-form-item--small {
    margin-bottom: 14px !important;

    &.fixed-height-field {
      .el-form-item__content {
        height: 32px;
      }
    }
  }

  .el-form-item--medium {
    margin-bottom: 18px !important;

    &.fixed-height-field {
      .el-form-item__content {
        height: 36px;
      }
    }
  }

  .el-button--small {
    padding: 8px 15px;
  }
}
</style>
