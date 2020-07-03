# [training_system_management_system](https://github.com/training-programt/training_system_management_system)

 🚀 基于工程教育认证的培养体系管理系统。🚀

## 说明

项目 Git 地址：[https://github.com/training-programt/training_system_management_system](https://github.com/training-programt/training_system_management_system)；

在线地址：

### 技术栈

涉及的技术栈均采用当前最新的版本和语法：

- 使用 Webpack4.43.0 构建项目（不使用 create-react-app、umi 等脚手架）；
- 使用 Babel7 配置转换 ES6、React、Mobx 等语法；
- React 版本 V16.13.1，全部采用函数化 Hooks 特性开发项目组件；
- 采用 React-router5 工具 配置项目路由；
- 采用 Redux4 + Hooks 实现项目数据状态管理；
- 封装 Axios 库实现与后台 http 请求交互；
- UI 库采用流行的 Ant-design4.0 组件库；
- 完整项目实现及模块结构拆分；

### 目录结构

```
├── build                   // webpack配置
│   ├── webpack.common.js   // webpack通用配置
│   ├── webpack.dev.js      // webpack开发环境配置
│   └── webpack.prod.js     // webpack生产环境配置
├── dist                    // 打包输出目录
├── public                  // 项目公开目录
├── src                     // src开发目录
│   ├── assets              // 静态资源
│   ├── apis                // api接口
│   ├── actions             // redux动作指令
│   ├── components          // 公共组件
│   ├── layouts             // 页面布局组件
│   ├── modules             // 公共业务模块
│   ├── pages               // 具体业务页面
│   ├── routers             // 项目路由配置
│   ├── reducers            // action指令触发reducer对应函数
│   ├── https               // axios服务等相关
│   ├── styles              // 存放公共样式
│   ├── utils               // 工具库/通用函数
│   ├── index.html          // 入口html页面
│   ├── store.js            // store
│   └── main.js             // 项目入口文件
├── .babelrc                // babel配置
├── .gitignore              // git 忽略配置
├── .postcssrc.js           // postcss配置
├── package.json            // 依赖包配置
└── README.md               // 项目说明
```

## CLI 构建命令

### 克隆项目

```bash
git clone git@github.com:training-programt/training_system_management_system.git
```

### 初始化依赖配置

```bash
yarn install
```

### 开发环境 启动运行

```bash
yarn start
```

### 生产环境 打包构建

```bash
yarn build  //生产环境 打包构建

yarn build:report // 图形化分析打包文件大小；

yarn build:watch // 方便排查生产环境打包后文件的错误信息（文件source map）；
```

## More
