<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-main">
        <h4>{{ config.gitLinks }}</h4>
        <a
          href="http://gitlab.polarwin.cn/components/fe-components-static"
          class="footer-main-link"
          target="_blank"
        >{{ config.componentsGitLab }}</a>
        <a
          href="http://gitlab.polarwin.cn/ganj/polarwin-commander"
          class="footer-main-link"
          target="_blank"
        >{{ config.starterGitLab }}</a>
        <a
          href="http://gitlab.polarwin.cn/components/vue-template"
          class="footer-main-link"
          target="_blank"
        >{{ config.templateGitLab }}</a>
      </div>
      <div class="footer-main">
        <h4>{{ config.npmLinks }}</h4>
        <a
          href="http://verdaccio.polarwin.cn/-/web/detail/@polarwin/castor-ui"
          class="footer-main-link"
          target="_blank"
        >{{ config.componentsNpm }}</a>
        <a
          href="http://verdaccio.polarwin.cn/-/web/detail/@polarwin/cli"
          class="footer-main-link"
          target="_blank"
        >{{ config.starterNpm }}</a>
      </div>
    </div>
  </footer>
</template>

<script type="text/babel">
export default {
  computed: {
    config() {
      return {
        gitLinks: 'GitLab',
        componentsGitLab: '组件库',
        starterGitLab: '脚手架',
        templateGitLab: 'Vue模板',
        npmLinks: 'npm私库',
        componentsNpm: '组件库',
        starterNpm: '脚手架'
      };
    },

    gitterLink() {
      return 'https://gitter.im/ElemeFE/element';
    }
  }
};
</script>

<style lang="scss">
.footer {
  background-color: #f7fbfd;
  width: 100%;
  padding: 40px 150px;
  margin-top: -200px;
  box-sizing: border-box;
  height: 200px;

  .container {
    box-sizing: border-box;
    width: auto;
  }

  .footer-main {
    font-size: 0;
    display: inline-block;
    vertical-align: top;
    margin-right: 110px;

    h4 {
      font-size: 18px;
      color: #333;
      line-height: 1;
      margin: 0 0 15px 0;
    }

    .footer-main-link {
      display: block;
      margin: 0;
      line-height: 2;
      font-size: 14px;
      color: #666;

      &:hover {
        color: #333;
      }
    }
  }
}

.el-popover.footer-popover {
  padding: 0;
  min-width: 120px;
  line-height: normal;
  box-shadow: 0 0 11px 0 rgba(174, 187, 211, 0.24);

  .footer-popover-title {
    border-bottom: solid 1px #eaeefb;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #99a9bf;
    background-color: #f8f9fe;
  }

  img {
    size: 100px;
    margin: 10px;
  }
}
@media (max-width: 1140px) {
  .footer {
    height: auto;
  }
}

@media (max-width: 768px) {
  .footer {
    .footer-main {
      margin-bottom: 30px;
    }
  }
}
</style>
