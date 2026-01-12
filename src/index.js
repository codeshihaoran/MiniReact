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

// 这里要兼容一下浏览器不支持 requestIdleCallback
const rIC = typeof requestIdleCallback !== 'undefined'
  ? requestIdleCallback
  : function (callback) {
    return setTimeout(() => {
      const start = Date.now()
      const deadline = {
        timeRemaining: () => {
          const elapsed = Date.now() - start
          return Math.max(0, 16 - elapsed) // 指定每帧为 16ms
        }
      }
      callback(deadline)
    }, 1)
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
  rIC((deadline) => {
    workLoop(deadline)
  })
}

rIC((deadline) => {
  workLoop(deadline)
})

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
  const isFargment = fiber.type === Fragment
  const isFunction = fiber.type instanceof Function
  if (isFargment) {
    reconcileChildren(fiber, fiber.props.children)
  } else if (isFunction) {
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
  // 1.收集 oldFiber：按 key / index 建表
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  const existingChildren = new Map()
  let oldIndex = 0

  while (oldFiber) {
    const key = oldFiber.key != null ? oldFiber.key : oldIndex
    existingChildren.set(key, oldFiber)
    oldFiber = oldFiber.sibling
    oldIndex++
  }

  // 2.遍历 elements，构建新的 fiber 链
  let prevSibling = null
  let fiberSiblingIndex = 0

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index]
    if (!element) continue

    const key = element.key != null ? element.key : index
    const matchedOldFiber = existingChildren.get(key)

    let newFiber = null

    // 3.如果 key + type 都相同，则复用
    if (matchedOldFiber && matchedOldFiber.type === element.type) {
      newFiber = {
        type: element.type,
        key,
        props: element.props,
        parent: wipFiber,
        dom: matchedOldFiber.dom,
        alternate: matchedOldFiber,
        effectTag: "UPDATE",
      }

      existingChildren.delete(key)
    }
    // 4.如果 key 不存在或者 type 不同，则新建
    else {
      // 如果 key 存在，但 type 不同，需要先卸载旧 fiber
      if (matchedOldFiber) {
        matchedOldFiber.effectTag = "DELETION"
        globalState.deletions.push(matchedOldFiber)
        existingChildren.delete(key)
      }

      // 新建 fiber
      newFiber = {
        type: element.type,
        key,
        props: element.props,
        parent: wipFiber,
        dom: null,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }

    // 5.构建 sibling 链
    if (fiberSiblingIndex === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    fiberSiblingIndex++
  }

  // 6.对于没有匹配到 key 的剩余 oldFiber 节点同一删除
  existingChildren.forEach(oldFiber => {
    oldFiber.effectTag = "DELETION"
    globalState.deletions.push(oldFiber)
  })
}

// commit 阶段
function commitRoot() {
  // mutation：操作 DOM
  globalState.deletions.forEach(commitMutationEffects)
  commitMutationEffects(globalState.wipRoot.child)
  // layout：收集&同步执行 layouteffect
  const layoutEffectList = collectLayoutEffects(globalState.wipRoot.child)
  flushLayoutEffects(layoutEffectList)
  // passive：收集&异步执行 effect
  const effectList = collectPassiveEffects(globalState.wipRoot.child)
  schedulePassiveEffects(effectList)
  // 存储旧 fiber 树
  globalState.currentRoot = globalState.wipRoot
  globalState.wipRoot = null
}

// mutation
function commitMutationEffects(fiber) {
  if (!fiber) return

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
    commitDeletion(fiber, domParent)
    return
  }

  commitMutationEffects(fiber.child)
  commitMutationEffects(fiber.sibling)
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

// layout
function collectLayoutEffects(fiber, layoutEffectList = []) {
  if (!fiber) return layoutEffectList

  const isFunction = fiber.type instanceof Function
  if (
    isFunction &&
    fiber.layoutEffectUpdateQueue &&
    fiber.layoutEffectUpdateQueue.length > 0
  ) {
    layoutEffectList.push(...fiber.layoutEffectUpdateQueue)
  }

  collectLayoutEffects(fiber.child, layoutEffectList)
  collectLayoutEffects(fiber.sibling, layoutEffectList)

  return layoutEffectList
}

function flushLayoutEffects(layoutEffectList) {
  if (!layoutEffectList || layoutEffectList.length === 0) return
  layoutEffectList.forEach(effect => {
    if (effect.cleanup) {
      effect.cleanup()
    }
    const cleanup = effect.create()
    effect.cleanup = cleanup
  })
}

// passive
function collectPassiveEffects(fiber, effectList = []) {
  if (!fiber) return effectList

  const isFunction = fiber.type instanceof Function
  if (
    isFunction &&
    fiber.effectUpdateQueue &&
    fiber.effectUpdateQueue.length > 0
  ) {
    effectList.push(...fiber.effectUpdateQueue)
  }

  collectPassiveEffects(fiber.child, effectList)
  collectPassiveEffects(fiber.sibling, effectList)

  return effectList
}

function schedulePassiveEffects(effectList) {
  if (!effectList || effectList.length === 0) return
  queueMicrotask(() => {
    effectList.forEach(effect => {
      if (effect.cleanup) {
        effect.cleanup()
      }
      const cleanup = effect.create()
      effect.cleanup = cleanup
    })
  })
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
  globalState.wipFiber.layoutEffectUpdateQueue = []
  globalState.wipFiber.effectUpdateQueue = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

/** @jsx createElement */
const container = document.getElementById('root')
render(
  <App />,
  container
)

const Fragment = 'MINI_REACT_FRAGMENT'

const MiniReact = {
  createElement,
  Fragment
}

export { MiniReact, globalState }