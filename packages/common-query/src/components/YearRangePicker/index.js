import Picker from './year-picker';
import YearRangePanel from './year-range-panel.vue';

const getPanel = function(type) {
  // Since it is a hack component, the panel returns the year regardless of the situation
  return YearRangePanel;
};

export default {
  mixins: [Picker],

  name: 'YearRangePicker',

  props: {
    type: {
      type: String,
      default: 'date'
    },
    timeArrowControl: Boolean
  },

  watch: {
    type(type) {
      if (this.picker) {
        this.unmountPicker();
        this.panel = getPanel(type);
        this.mountPicker();
      } else {
        this.panel = getPanel(type);
      }
    }
  },

  created() {
    this.panel = getPanel(this.type);
  }
};
