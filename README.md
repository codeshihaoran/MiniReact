# MiniReact
**MiniReact** ：简化版 React 框架，该项目从零实现了类似于 React 的组件渲染和更新机制，包括 `createElement` 函数、Fiber 架构、DOM 渲染流程、基础 Hooks 系统以及路由功能，基于以上实现搭建了一个博客系统，已通过 `Vercel` 部署上线。


## Create Virtual Node

`createElement` 函数是 React 的核心，它将 JSX 转换为 JavaScript 对象。在 MiniReact 中，createElement 通过生成虚拟 DOM 节点 (VNode)，描述了组件的结构和属性，供后续渲染使用。

`createTextElement` 函数是对于文本节点的处理，在 MiniReact 中，它会返回一个对象包含节点值，并渲染在页面上。

## Rendering

| Funtion | Value |
|--------|--------|
| render | 初始化渲染，初次渲染会执行 |
| workLoop | 工作主入口函数，异步任务调度循环 |
| performUnitOfWork | 判断参数类型，处理每个工作单元 |
| createDom | 创建 Dom 节点 |
| updateDom | 更新 Dom 属性 |
| reconcileChildren | 协调子元素，构建 fiber 数据结构 |
| updateHostComponent | 对于普通元素的处理，创建节点 |
| updateFuntionComponent | 对于函数组件的处理，执行函数返回子元素 |
| commitRoot | 提交根节点的更新，完成所有的 DOM 操作 |
| commitWork | 对每个 Dom 执行对应操作 |
| commitDeletion | 删除不再需要的 Dom 节点 |


## Hooks API

- useState
- useEffect
- useLayoutEffect
- useCallback
- useRef
- useMemo
- useContext


## Router Components

- Switch
- Route
- Link

## MiniReact-Blog

基于 `MiniReact` 框架搭建的博客平台，已通过 `Vercel` 部署上线。

通过以下链接来访问 MiniReact-Blog：

[MiniReact-Blog](https://codeshr.site)

### Home 

博客平台文章首页，特性如下：

- 包含所有博客文章标题供参考
- 通过 OpenAPI issues 接口获取文章列表数据

### About

博客平台文章关于页，特性如下：

- 个人信息以及项目信息
- MiniReact的实现方案
- MiniReact-blog的部署方案


### Detail

博客平台文章详情页，特性如下：

- 包含文章所有内容供参考
- 通过 URLSearchParams API 获取 Link 组件传入的动态参数
- 通过 OpenAPI issues 接口获取文章详情数据

## 安装依赖
```sh
npm install
```

## 项目运行
```sh
npm run start
```

## 项目打包
```sh
npm run build
```