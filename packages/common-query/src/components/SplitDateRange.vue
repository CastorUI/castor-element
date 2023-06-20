<template>
  <div class="split-date-range">
    <el-date-picker
      v-model="startDate"
      :disabled="disabled"
      type="date"
      v-bind="{
        placeholder: '开始日期',
        valueFormat: 'yyyy-MM-dd',
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="handleStartChange"
    />
    <div style="width:20px;margin: 0 10px;text-align:center;">
      ~
    </div>
    <el-date-picker
      v-model="endDate"
      :disabled="disabled"
      type="date"
      v-bind="{
        placeholder: '结束日期',
        valueFormat: 'yyyy-MM-dd',
        style: 'width:100%;',
        ...elementProps,
      }"
      @change="handleEndChange"
    />
  </div>
</template>
<script>
export default {
  name: 'SplitDateRange',
  props: {
    model: {
      type: Object,
      default: undefined,
    },
    dataField: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    elementProps: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data() {
    return {
      startDate: (this.model[this.dataField] || [])[0],
      endDate: (this.model[this.dataField] || [])[1],
    };
  },
  methods: {
    handleStartChange(val) {
      console.log('handleStartChange', val);
      if (!this.model[this.dataField]) {
        this.model[this.dataField] = ['', ''];
      }
      this.model[this.dataField][0] = val;
      this.$emit('change');
    },
    handleEndChange(val) {
      console.log('handleStartChange', val);
      if (!this.model[this.dataField]) {
        this.model[this.dataField] = ['', ''];
      }
      this.model[this.dataField][1] = val;
      this.$emit('change');
    },
  },
};
</script>
<style lang="scss">
.split-date-range{
  width:100%;
  display: flex;
}
</style>
