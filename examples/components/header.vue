<style lang="scss" scoped>
.headerWrapper {
  height: 80px;
}

.header {
  height: 80px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;

  .container {
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }

  .nav-lang-spe {
    color: #888;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: normal;

    a {
      color: #333;
      text-decoration: none;
      display: block;
    }

    span {
      font-size: 12px;
      display: inline-block;
      width: 34px;
      height: 18px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      text-align: center;
      line-height: 18px;
      vertical-align: middle;
      margin-left: 10px;
      border-radius: 3px;
    }
  }

  .nav {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
    &::before,
    &::after {
      display: table;
      content: '';
    }
    &::after {
      clear: both;
    }
  }

  .nav-gap {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  .nav-logo,
  .nav-logo-small {
    vertical-align: sub;
  }

  .nav-logo-small {
    display: none;
  }

  .nav-item {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    &.nav-algolia-search {
      cursor: default;
    }

    &.lang-item,
    &:last-child {
      cursor: default;
      margin-left: 34px;

      span {
        opacity: 0.8;
      }

      .nav-lang {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        color: #888;

        &:hover {
          color: #409eff;
        }
        &.active {
          font-weight: bold;
          color: #409eff;
        }
      }
    }

    a {
      text-decoration: none;
      color: #1989fa;
      opacity: 0.5;
      display: block;
      padding: 0 22px;

      &.active,
      &:hover {
        opacity: 1;
      }

      &.active::after {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        width: 30px;
        height: 2px;
        background: #409eff;
      }
    }
  }
}

.nav-dropdown {
  margin-bottom: 6px;
  padding-left: 18px;
  width: 100%;

  span {
    display: block;
    width: 100%;
    font-size: 16px;
    color: #888;
    line-height: 40px;
    transition: 0.2s;
    padding-bottom: 6px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }

  i {
    transition: 0.2s;
    font-size: 12px;
    color: #979797;
    transform: translateY(-2px);
  }

  .is-active {
    span,
    i {
      color: #409eff;
    }
    i {
      transform: rotateZ(180deg) translateY(3px);
    }
  }

  &:hover {
    span,
    i {
      color: #409eff;
    }
  }
}

.nav-dropdown-list {
  width: auto;
}

@media (max-width: 850px) {
  .header {
    .nav-logo {
      display: none;
    }
    .nav-logo-small {
      display: inline-block;
    }
    .nav-item {
      margin-left: 6px;

      &.lang-item,
      &:last-child {
        margin-left: 10px;
      }

      a {
        padding: 0 5px;
      }
    }
    .nav-theme-switch,
    .nav-algolia-search {
      display: none;
    }
  }
}

@media (max-width: 700px) {
  .header {
    .container {
      padding: 0 12px;
    }
    .nav-item {
      a {
        font-size: 12px;
        vertical-align: top;
      }

      &.lang-item {
        height: 100%;

        .nav-lang {
          display: flex;
          align-items: center;

          span {
            padding-bottom: 0;
          }
        }
      }
    }
    .nav-dropdown {
      padding: 0;
      span {
        font-size: 12px;
      }
    }
    .nav-gap {
      padding: 0 8px;
    }
    .nav-versions {
      display: none;
    }
  }
}
</style>
<template>
  <div class="headerWrapper">
    <header
      ref="header"
      class="header"
    >
      <div class="container">
        <h1>
          <router-link to="/">
            <!-- logo -->
            <slot>
              <img
                src="../assets/images/logo.png"
                alt="castor-logo"
                class="nav-logo"
                style="width:224px;height:78px;"
              >
            </slot>
          </router-link>
        </h1>

        <!-- nav -->
        <ul class="nav">
          <li class="nav-item">
            <router-link
              active-class="active"
              to="/guide"
            >
              {{ navConfig.guide }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              active-class="active"
              to="/component"
            >
              {{ navConfig.components }}
            </router-link>
          </li>

          <!-- gap -->
          <li
            v-show="isComponentPage"
            class="nav-item"
          >
            <div class="nav-gap" />
          </li>

          <!-- 版本选择器 -->
          <li
            v-show="isComponentPage"
            class="nav-item nav-versions"
          >
            <el-dropdown
              trigger="click"
              class="nav-dropdown"
              :class="{ 'is-active': verDropdownVisible }"
            >
              <span>
                {{ version }}
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu
                slot="dropdown"
                class="nav-dropdown-list"
                @input="handleVerDropdownToggle"
              >
                <el-dropdown-item
                  v-for="item in Object.keys(versions)"
                  :key="item"
                  @click.native="switchVersion(item)"
                >
                  {{ item }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 'true',
      versions: [],
      version: '1.0.0',
      verDropdownVisible: true
    };
  },

  computed: {
    navConfig() {
      return {
        guide: '指南',
        components: '组件'
      };
    },
    isComponentPage() {
      return /^component/.test(this.$route.name);
    }
  },
  created() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = _ => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const versions = JSON.parse(xhr.responseText);
        this.versions = Object.keys(versions).reduce((prev, next) => {
          prev[next] = versions[next];
          return prev;
        }, {});
      }
    };
    xhr.open('GET', '/versions.json');
    xhr.send();
  },
  methods: {
    switchVersion(version) {
      if (version === this.version) return;
      location.href = `${location.origin}/${this.versions[version]}/${location.hash} `;
    },
    handleVerDropdownToggle(visible) {
      this.verDropdownVisible = visible;
    }
  }
};
</script>
