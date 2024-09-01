#  深入 React.createElement 与 JSX

## 前言

在开发项目时，我们总是使用 `JSX` 语法，比起其他的 `React Raw API` 来说，`JSX` 语法更加简洁，`UI` 结构也更加清晰。所以 `JSX` 现在也是越来越多开发者的不二选择。

然而 `JSX` 并不是有效的 `JS`，那么浏览器如果直接识别一段 `JSX` 会报错，那么内部究竟是如何解析 `JSX` 的呢？在这里，就不得不提到 `React.createElement` 了。

接下来，本文将会一一揭晓 `JSX` 内部数据结构以及底层调用的原理。

## 使用 React.createElement 创建 React element

在 React 文档中这样定义：`createElement` 允许你创建一个 `React` 元素。它可以作为 `JSX` 的替代方案。

通俗来说，我们将 `React.createElement` 理解为 `JSX` 语法糖就可以了，废话不说，直接上 Demo。

### 这是一段 `JSX` 示例：

<img src="/images/JSX/image1.png" alt="Example Image" />

### 使用 `React.createElement` 为：

<img src="/images/JSX/image2.png" alt="Example Image" />

### 不难发现，使用 `React.createElement` 会传入三个参数：

- **type**：传入元素的类型，例如：`div`、`p` 标签等等，也有可能传入的是一个组件，这时候一般为组件名称，例如 `Home`、`About` 等等。
- **props**：传入元素的属性，例如：`{ className: 'title' }`，可选参数，也可以传入 `children` 子元素。
- **...children**：传入元素的子元素，可传入多个子元素，一般用数组表示，也有可能为文本节点。

### 打印出调用后的结果，这样看会更加直观：

<img src="/images/JSX/image3.png" alt="Example Image" />

实际上，`JSX` 在 `Babel` 打包过程中转义为调用 `React.createElement`，而通过调用 `React.createElement` 后会返回上述例子的数据结构，再去通过 `React.render` 生成 `DOM` 元素并挂载到页面上。如果仅是修改了元素属性，那么 `React` 就会对比当前树与工作树，然后更新更改的部分。
`
### 基于上面的理解，现在来实现一个简易的 `React.createElement` 。

## 实现一个简易的 React.createElement
###  定义参数，返回对应的数据结构


<img src="/images/JSX/image4.png" alt="Example Image" />

###  对每个子元素不同类型处理

<img src="/images/JSX/image5.png" alt="Example Image" />

###  对于文本节点子元素的处理

<img src="/images/JSX/image6.png" alt="Example Image" />

## 思考

`React 17` 以前，`jsx` 编译是通过 `React.createElement` 处理，在 `React 17` 以后，引入了 `react/jsx-runtime` 去处理，所以上述代码在调试过程中会出现兼容性，配置问题，比如，在实现 MiniReact 过程中，需要安装旧版本的 `react-scripts` 去运行程序，你可以安装 `5.0` 版本的 `srcipts` 去运行该程序，但是控制台会报错，所以当我们想要成功实现需要添加第一行注释：

<img src="/images/JSX/image7.png" alt="Example Image" />

## 总结
- 创建 `React element` 可以通过 `React.createElement` 或 `JSX`。
- `React 17` 以前，`jsx` 编译是通过 `React.createElement` 处理。
- `React 17` 以后，引入了 `react/jsx-runtime`。
- `jsx` 在 `babel` 打包过程中转义为调用 `React.createElement`。
- 实现 `React.createElement` 需要对不同类型的子元素作不同处理。
- `React.createElement`返回的结果会通过 `React.render` 生成渲染。
- 上述实现代码仅供参考，实现或者调试需要自己配置环境。