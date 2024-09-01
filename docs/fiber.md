#  Fiber架构核心与实现

## 前言

在上篇文章中，提到了 `JSX` 通过调用 `React.createElement` 将 `JSX` 元素转换成一种对象结构，随后执行 `React.render` 来渲染更新页面。那么，`React` 是如何渲染的？其中的工作机制和原理又是什么？为了揭秘这些问题，我们将会引申出一种数据结构：`Fiber`。

自 `React 16` 开始，React 引入了 `Fiber` 架构，它解决了 `React` 以前存在的更新机制。

在本文中，我们将会详细介绍 `Fiber` 的来源，以及它解决了什么问题，实现的底层原理。

## 为什么需要 Fiber

在我们介绍 `Fiber` 之前，先来了解一下 `React 16` 以前存在的问题：

在 `React 16` 之前的版本中，组件树的更新采用递归的方式实现，这意味着一旦开始加载就无法中止。如果有一个庞大的组件树需要渲染，且嵌套层级较深，一旦开始执行 `JS` 线程，就会导致长时间占用浏览器主线程，阻塞其他线程执行，比如 `GUI` 线程。网页会造成卡顿、停滞的现象。

因此，Fiber 应运而生，它的存在就是为了解决不合理的更新机制。

## Concurrent 模式：Fiber 架构的核心

为了解决递归更新组件树而造成的诸多不便，实现可中断循环，React 推出了一个新功能：`Concurrent` 模式。详细的内容先省略，它的主要解决方案就是：时间切片。

在每一帧的时间内，预留一定的时间去执行 `JS` 线程，没有处理完成的工作留到下一帧继续执行，其他时间交给 `GUI` 线程去渲染页面，保证页面的流畅性，这就是时间切片的思想。

而它的实现过程是基于浏览器底层的一个 API：`requestIdleCallback`，通过该 API 可以拿到浏览器的剩余时间来实现可中断循环。

### 具体实现

<img src="/images/Fiber/image1.png" alt="Example Image" />

## Fiber的结构

在前言中提到，`Fiber` 是一种数据结构，本质上，`Fiber` 是一个 `JavaScript` 对象

<img src="/images/Fiber/image2.png" alt="Example Image" />

- **type**：定义 Fiber tree 的类型，一般为 string，例如：div，span等元素，也可能为 Function，不同类型作不同处理。
- **props**：Fiber 节点的属性，一般为对象，里面有 children 子元素和 props 属性。
- **dom**：当前 Fiber 节点对应的实际 DOM元素，React使用该属性访问或操作实际的 Dom 元素。
- **alternate**：通过该属性链接 当前树 和 正在工作树，通过双树之间的对比来实现更新最小化，当 正在工作树 完成，alternate 属性就会指向 正在工作树，在下次更新时作为 当前树 与 正在工作树 进行对比。
- **parent**：当前 Fiber 节点的父节点。
- **child**：当前 Fiber 节点的子节点。
- **sibling**：当前 Fiber 节点的兄弟节点。
- **effectTag**：当前 Fiber 节点的操作标识符。在 Renender  阶段中，会比较新旧树的区别，然后决定该节点作添加、删除、更新等操作。
- **hooks**：存放 hook 对象的数组，在函数组件中，使用 hook 钩子函数时，会生成一个 hook 对象来维护当前组件状态。

## Fiber工作流程及实现


### 1. 阶段一：render

**该阶段主要任务为找出每个 `Fiber` 节点的变更，给每个节点标记上对应的 `effectTag`，如 'UPDATE'、'PLACEMENT'、'DELETION'。然后构建出一颗 `Fiber` 树。**

<img src="/images/Fiber/image3.png" alt="Example Image" />


### 2. 阶段二：commit

**该阶段主要任务为递归和遍历整个 `Fiber` 树，根据 `Fiber` 树上的每个节点 `effectTag`，对节点进行不同的操作，最后渲染到浏览器上。**

<img src="/images/Fiber/image4.png" alt="Example Image" />

## 最后

本篇文章主要讲述了 `Fiber` 的来源、作用、核心、结构、以及实现方案。这并不是完整知识体系，许多实现方案也是简易的实现，但足以让它在浏览器中正常运行，自己实现后会加深我们对 `Fiber` 的认识，对 `Fiber` 体系有一个整体的认识。