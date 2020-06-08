## 流程优化

开发新项目时：

- 优先编制 Swagger 文档，并提供稳定的部署环境.
- 前后端、测试一起评审下Swagger文档
- 然后基于些 Swagger 文档
  - 后端实现接口
  - 前端借助 EasyMock 模拟数据来开发页面
  - 测试编写接口测试脚本
- 后端变更 Swagger 文档时要通知前端和测试

## 接口统一

### 用户登录

返回结果中只需包含 token 信息

```javascript
{
  "code": 200,
  "msg": "success",
  "data": { "token": "d47d778A-678D-92e1-E9c1-5dbFf6dDF98e" }
}
```

### 获取用户信息

```javascript
{
  // 用户基本信息
  // 用户权限信息
}
```

### 用户登出

```javascript
{
  // 请求参数只需提供token
}
```

### 修改密码

```javascript
{
  // 请求参数统一
}
```

### 分页查询{

请求参数统一

```javascript
{
  "pageIndex": 1,
  "pageSize": 15
}
```

应答报文统一

```javascript
{
  "code": 200,
  "msg": "success",
  "data": {
    "current_page": 1,
    "count": 542,
    "results": [],
    "pages": 28
  }
}
```

## 模块统一

提供统一的用户权限模块，最好能够独立出来，单独维护。

```javascript
{
  // 用户分组信息
  // 用户角色信息
  // 菜单权限
  // 页面权限
}
```

- 新增系统时只段注册到此模块即可。
- 同时提供统一的接口服务
