# server接口api

## 目录结构
```

├── app
│   ├── controller          // 解析用户的输入
│   ├── service             // 业务逻辑层
│   ├── model               // 数据模型
│   ├── middleware          // 中间件
│   └── router.js           // 配置 URL 路由规则
├── config                  // 项目配置
│   ├── config.default.js   // 配置文件
│   └── plugin.js           // 配置需要加载的插件
├── test                    // 单元测试
├── .gitignore              // git 忽略配置
├── package.json            // 依赖包配置
└── README.md               // 项目说明 
```

## 项目启动

### 开发环境

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 项目部署

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
