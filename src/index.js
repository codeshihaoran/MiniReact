import App from './App'
import { initialIndex } from './compentens/hookIndex'
let globalState = {
  nextUnitOfWork: null,
  deletions: null,
  wipRoot: null,
  currentRoot: null,
  wipFiber: null
}

function createElement(type, props, ...children) {
  // 通过调用该函数返回的dom树数据结构
  return {
    type,
    props: {
      ...props,
      children: children.flat().map(
        child =>
          typeof child === "object" ? child : createTextElement(child)
      )
    }
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  }
}
function render(element, container) {
  globalState.wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: globalState.currentRoot,
  }
  globalState.nextUnitOfWork = globalState.wipRoot;
  globalState.deletions = [];
}

// concurrent Mode
function workLoop(deadline) {
  let shouldYield = false
  while (globalState.nextUnitOfWork && !shouldYield) {
    globalState.nextUnitOfWork = performUnitOfWork(globalState.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1
  }
  if (globalState.wipRoot && !globalState.nextUnitOfWork) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)

  updateDom(dom, {}, fiber.props)
  if (fiber.props.ref) {
    fiber.props.ref.current = dom
  }
  return dom
}

function performUnitOfWork(fiber) {
  const isFunction = fiber.type instanceof Function
  if (isFunction) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null
  while (index < elements.length || oldFiber != null) {
    const element = elements[index]
    let newFiber = null
    const sameType = element && oldFiber && element.type === oldFiber.type
    if (sameType) {
      // 更新props effectTag：“UPDATE”
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        parent: wipFiber,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }
    if (!sameType && element) {
      // 插入
      newFiber = {
        type: element.type,
        props: element.props,
        parent: wipFiber,
        dom: null,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }
    if (!sameType && oldFiber) {
      // 删除
      oldFiber.effectTag = "DELETION"
      globalState.deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (index === 0) {
      wipFiber.child = newFiber
    } else if (element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}
function commitRoot() {
  // 将节点插入dom中去
  globalState.deletions.forEach(commitWork)
  commitWork(globalState.wipRoot.child)
  globalState.currentRoot = globalState.wipRoot
  globalState.wipRoot = null
}
function commitWork(fiber) {
  if (!fiber) {
    return
  }
  let domParentFiber = fiber.parent
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  let domParent = domParentFiber.dom
  if (fiber.effectTag === "PLACEMENT" && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  }
  if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }
  if (fiber.effectTag === "DELETION") {
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber, domParent)
    return
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}
// 移除旧属性 添加新属性
const isNew = (prev, next) => key => prev[key] !== next[key]
const isProps = key => key !== "children" && !isEvent(key)
const isEvent = key => key.startsWith("on")
function updateDom(dom, prevProps, nextProps) {
  // removeEventListener && removeProps
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  Object.keys(prevProps)
    .filter(isProps)
    .filter(key => !(key in nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  // addEventListener && addProps
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })

  // 在更新部分补充ref.current所需要节点
  Object.keys(nextProps)
    .filter(isProps)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}
function updateFunctionComponent(fiber) {
  globalState.wipFiber = fiber
  initialIndex()
  globalState.wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}
export { createElement, globalState }

/** @jsx createElement */
const container = document.getElementById('root')
render(

  <App />,

  container
)