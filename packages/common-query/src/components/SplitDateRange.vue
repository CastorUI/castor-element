<template>
  <div class="split-date-range">
    <el-date-picker
      v-model="startDate"
      :disabled="disabled"
      type="date"
      :picker-options="extendProps.startPickerOptions || startPickerOptions"
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
      :picker-options="extendProps.endPickerOptions || endPickerOptions"
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
    extendProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      startDate: (this.model[this.dataField] || [])[0],
      endDate: (this.model[this.dataField] || [])[1],
    };
  },
  computed: {
    startPickerOptions() {
      const that = this;
      return {
        disabledDate(time) {
          const timeStr = that.formatDate(time, 'yyyy-MM-dd');
          if (that.endDate) {
            return (
            timeStr > that.endDate
            );
          } else {
            return false;
          }
        },
      };
    },
    endPickerOptions() {
      const that = this;
      return {
        disabledDate(time) {
          const timeStr = that.formatDate(time, 'yyyy-MM-dd');
          if (that.startDate) {
            return (
              timeStr < that.startDate
            );
          } else {
            return false;
          }
        },
      };
    },
  },
  methods: {
    handleStartChange(val) {
      console.log('handleStartChange', val, this.model[this.dataField]);
      if ((this.model[this.dataField] || []).length === 0) {
        this.model[this.dataField] = ['', ''];
      }
      this.model[this.dataField][0] = val || '';
      this.$emit('change');
    },
    handleEndChange(val) {
      console.log('handleStartChange', val, this.model[this.dataField]);
      if ((this.model[this.dataField] || []).length === 0) {
        this.model[this.dataField] = ['', ''];
      }
      this.model[this.dataField][1] = val || '';
      this.$emit('change');
    },
    formatDate(time, fmt) {
     var o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
     for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
         }
     }
    return fmt;
}
  },
};
</script>
<style lang="scss">
.split-date-range {
  width: 100%;
  display: flex;
}
</style>
