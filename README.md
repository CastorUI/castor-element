# @polarwin/castor-ui

## 一. 组件库发布

### 注册 npm 私库用户

```
npm adduser --registry http://verdaccio.polarwin.cn
npm profile set password --registry http://verdaccio.polarwin.cn
```

### 发布到 npm 私库

每次更新后在 `package.json` 文件中手动更新版本号

```
{
  "name": "@polarwin/castor-ui",
  "version": "1.0.5",
}
```

然后打包到根目录 lib 文件夹

```
npm run build-packages
```

最后发布到 npm 私库

```
npm publish
```

## 二. 组件库文档

### 文档地址

参考 [Castor 官方网站](http://castor.polarwin.cn/).

### 本地运行

```
npm run dev
```

### 打包发布版本

打包示例站点到根目录 dist 文件夹

```
npm run build-examples
```

## 三. 版本说明

- node 版本 >= 10.19.0
- npm 版本 >= 6.13.4
- element-ui 版本 >=2.10.1
