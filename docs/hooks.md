#  Hooks实现原理篇：useState

## 前言

自 `React V16.8` 引入了全新的API：`React Hooks`，为开发者提供了更简洁和灵活的方式来管理组件的状态和副作用。
在官方文档中，明确表示：`Hook` 不包含任何破坏性改动，并且没有计划从 `react` 中移除 `class`。这意味着开发者可以根据项目需求自由选择使用 `Hooks` 或 `class` 组件，而不必担心兼容性问题。
在本文中，我们会着重介绍 `Hooks` 的实现原理，了解它是如何在 `React` 内部工作，并展示如何在自定义实现的 `React` 中手写一个简单的 `useState`。

## 为什么会推出 Hooks

**1. 简化组件之间的逻辑复用，**


在以往的 `class` 组件中，复用状态逻辑通常需要使用 render props 来实现。这种模式会导致代码层级嵌套过深，代码结构复杂，难以理解。而 `Hooks` 状态逻辑封装在自定义 Hook中，实现逻辑复用。


**2. 单一的 Hook 进行集中处理**


随着组件功能的增加，`class` 组件会变得复杂，涉及生命周期时，在不同生命周期中处理相关的逻辑，这些逻辑分散在不同方法中，`Hooks` 允许将相关逻辑通过单一的 `Hook` 集中处理，让代码更容易理解和维护。


**3. 更好的代码分割**


通过 `Hooks`，将各个组件的状态逻辑拆分成多个独立的组件，让代码更具模块化，易于测试和维护。

## MiniReact Hooks API
- **useState**
- **useEffect**
- **useLayoutEffect**
- **useCallback**
- **useRef**
- **useMemo**
- **useContext**

## useState概述

**官网解释：useState是一个 React Hook，它允许你向组件添加一个 状态变量。**

实际上 `useState` 可以理解为在组件中引入一个状态管理功能，并维护组件中的状态，它提供了一个更新该状态的函数：`setState`。

### 用法

<img src="/images/hooks/image1.png" alt="Example Image" />

上面代码是一个计数器的例子，

### 参数：

可以是类型的值，如果传入的函数，如上面传入一个更新函数：c=>c+1，`React` 会将更新函数放入队列中，然后重新渲染，在重新渲染期间，会将队列中所有更新函数在先前的状态上进行计算下一个状态，最后渲染该值。

### setState：

点击 `H1` 元素，调用 `setState` 会将传入的会执行传入的参数，告知 `React` 进行下一次渲染，然后新的值会重新渲染到屏幕上。调用 set 函数不会返回任何值，他会触发重新渲染(rerender)，并更新组件中的状态。

**setState的误区：**

这里引用一个 `React` 官方文档中的demo。

<img src="/images/hooks/image2.png" alt="Example Image" />

**这里会输出什么呢？**


这里点击 btn 后，会触发三个 set 函数，理所当然的我们认为经过三次调用后，状态值为3？


**答案：**


点击后 number 为 1，而弹出的值为0，这就有点奇怪了。


**解析：**
我们再仔细观察代码，这里的三个 set 函数在事件处理程序中执行，而调用 set 函数时，会请求一次重新渲染，但是它不会立即渲染，而是等待事件处理程序完成，再次重新渲染，而在本轮事件处理程序中，number的值始终还没有发生更新，所以弹出的值为当前组件状态值，等待下一次渲染后，状态值变为1。


**如果感觉理解的还是有些抽象，不妨看看以下过程：**


1. 第一次调用 setNumber(number + 1)：React请求重新渲染，在下一次渲染时将 number 值改为1，但不会立即执行重新渲染。
2. 继续第二次调用 setNumber(number + 1)：React请求重新渲染，在下一次渲染时将 number 值改为1，但不会立即执行重新渲染。
3. 最后一次调用 setNumber(number + 1)：React请求重新渲染，在下一次渲染时将 number 值改为1，但不会立即执行重新渲染。
4. 弹出状态值 alter(number)：React还没有执行重新渲染，当前的状态值依然为0，弹出0。
5. 事件处理程序执行结束：触发组件重新渲染，渲染完成后，number 值改为1。

## 实现一个useState

### Hook对象

在实现之前，需要了解一个概念：`Hook对象`，它会帮助我们保存他的初始值，以及改变后的值，对应着如果调用set函数传入了一个更新函数，则需要在这个对象中初始一个队列用来保存更新函数，最后计算出来的状态值返回给组件。

<img src="/images/hooks/image3.png" alt="Example Image" />


但是这里存在一个问题：
当每次更新状态值的时候，我们需要基于上一次的 `Hook` 对象 状态值去更改当前的状态值，这将对应着初始渲染和二次渲染时的场景，也就是 `render` 和 `rereder` 阶段，所以我们在这里假设上一次渲染时的 Hook对象为：`oldHook` ，接下来，我们补充代码。


<img src="/images/hooks/image4.png" alt="Example Image" />

如果存在上一次渲染时的 `Hook` 对象，则返回 `oldHook.state`，如果不存在，则默认初始值。


### 调用 setState 将更新函数存入队列中并请求重新渲染

**调用 useState 会返回当前状态值和 set 函数。所以需要创建set函数。**


**触发重新渲染需要重新建立工作根节点：wipRoot，基于当前树更新渲染。**


<img src="/images/hooks/image5.png" alt="Example Image" />


### 等待渲染完成执行组件函数，调用useState计算下一个状态值。


<img src="/images/hooks/image6.png" alt="Example Image" />


### 返回新的状态值


<img src="/images/hooks/image7.png" alt="Example Image" />


这里有一个坑：如果我们在组件中使用了多个 `hooks` 钩子函数，那么为了保证能正确使用到每个钩子函数对应的hook对象，应初始化一个 `hooks` 数组，用来保留每个 `hook` 对象，并且为每个对象表上索引，保证能正确运用到每个 `hooks` 对象。


**代码如下：**

<img src="/images/hooks/image8.png" alt="Example Image" />


## 最后

本篇文章讲述了 `React` 中 `Hook` 的引入背景及其实现原理，尤其是 `useState` 的工作机制。我们探讨了为何需要 `hooks` 数组和 `hookIndex` 来管理组件内的多个 `Hook` 调用，并确保状态和副作用的正确处理。通过这些概念，希望我们能深入理解了 `React` 如何在函数组件中高效地管理状态，并解决了传统 `class` 组件中的诸多痛点。