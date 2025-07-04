<style lang="scss">
.side-nav {
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  transition: opacity 0.3s;
  &.is-fade {
    transition: opacity 3s;
  }

  li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  > ul > .nav-item > a {
    margin-top: 15px;
  }

  > ul > .nav-item:nth-child(-n + 4) > a {
    margin-top: 0;
  }

  .nav-item {
    a {
      font-size: 16px;
      color: #333;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
      font-weight: bold;

      &.active {
        color: #409eff;
      }
    }

    .nav-item {
      a {
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;

        &:hover,
        &.active {
          color: #409eff;
        }
      }
    }

    &.sponsors {
      & > .sub-nav {
        margin-top: -10px;
      }

      & > a {
        color: #777;
        font-weight: 300;
        font-size: 14px;
      }

      .nav-item {
        display: inline-block;

        a {
          height: auto;
          display: inline-block;
          vertical-align: middle;
          margin: 8px 12px 12px 0;

          img {
            width: 42px;
          }
        }

        &:first-child a img {
          width: 36px;
        }
      }
    }
  }

  .nav-group__title {
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
  }

  #code-sponsor-widget {
    margin: 0 0 0 -20px;
  }
}
.nav-dropdown-list {
  width: 120px;
  margin-top: -8px;
  li {
    font-size: 14px;
  }
}
</style>
<template>
  <div
    class="side-nav"
    :class="{ 'is-fade': isFade }"
    :style="navStyle"
    @mouseenter="isFade = false"
  >
    <ul>
      <li
        v-for="(item, key) in data"
        :key="key"
        class="nav-item"
      >
        <a
          v-if="!item.path && !item.href"
          @click="expandMenu"
        >{{ item.name }}</a>
        <a
          v-if="item.href"
          :href="item.href"
          target="_blank"
        >{{ item.name }}</a>
        <router-link
          v-if="item.path"
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name"
        />
        <ul
          v-if="item.children"
          class="pure-menu-list sub-nav"
        >
          <li
            v-for="(navItem, navItemIndex) in item.children"
            :key="navItemIndex"
            class="nav-item"
          >
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name"
            />
          </li>
        </ul>
        <template v-if="item.groups">
          <div
            v-for="(group, groupIndex) in item.groups"
            :key="groupIndex"
            class="nav-group"
          >
            <div
              class="nav-group__title"
              @click="expandMenu"
            >
              {{ group.groupName }}
            </div>
            <ul class="pure-menu-list">
              <li
                v-for="(navItem, navItemKeyIndex) in group.list"
                v-show="!navItem.disabled"
                :key="navItemKeyIndex"
                class="nav-item"
              >
                <router-link
                  active-class="active"
                  :to="base + navItem.path"
                  exact
                  v-text="navItem.title"
                />
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import bus from '../utils/bus';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    base: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      highlights: [],
      navState: [],
      isSmallScreen: false,
      isFade: false,
    };
  },
  computed: {
    navStyle() {
      const style = {};
      if (this.isSmallScreen) {
        style.paddingBottom = '60px';
      }
      style.opacity = this.isFade ? '0.5' : '1';
      return style;
    },
  },
  watch: {
    '$route.path'() {
      this.handlePathChange();
    },
    isFade(val) {
      bus.$emit('navFade', val);
    },
  },
  created() {
    bus.$on('fadeNav', () => {
      this.isFade = true;
    });
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.isSmallScreen = document.documentElement.clientWidth < 768;
      this.handlePathChange();
    },
    handlePathChange() {
      if (!this.isSmallScreen) {
        this.expandAllMenu();
        return;
      }
      this.$nextTick(() => {
        this.hideAllMenu();
        const activeAnchor = this.$el.querySelector('a.active');
        let ul = activeAnchor.parentNode;
        while (ul.tagName !== 'UL') {
          ul = ul.parentNode;
        }
        ul.style.height = 'auto';
      });
    },
    hideAllMenu() {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), (ul) => {
        ul.style.height = '0';
      });
    },
    expandAllMenu() {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), (ul) => {
        ul.style.height = 'auto';
      });
    },
    expandMenu(event) {
      if (!this.isSmallScreen) return;
      const target = event.currentTarget;
      if (
        !target.nextElementSibling ||
        target.nextElementSibling.tagName !== 'UL'
      ) { return; }
      this.hideAllMenu();
      event.currentTarget.nextElementSibling.style.height = 'auto';
    },
  },
};
</script>
