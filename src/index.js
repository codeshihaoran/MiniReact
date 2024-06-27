
function createElement(type, props, ...children) {
    // 通过调用该函数返回的dom树数据结构
    return {
      type,
      props: {
        ...props,
        children: children.map(
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
    wipRoot = {
      dom: container,
      props: {
        children: [element]
      },
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }
  let nextUnitOfWork = null
  let wipRoot = null
  let currentRoot = null
  let deletions = null
  // concurrent Mode
  function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
      shouldYield = deadline.timeRemaining() < 1
    }
    if (wipRoot && !nextUnitOfWork) {
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
        deletions.push(oldFiber)
      }
      if (oldFiber) {
        oldFiber = oldFiber.sibling
      }
      if (index === 0) {
        wipFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
      index++
    }
  }
  function commitRoot() {
    // 将节点插入dom中去
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
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
        console.log(domParent);
        console.log(fiber.dom);
      domParent.appendChild(fiber.dom)
    }
    if (fiber.effectTag === "UPDATE" && fiber.dom !== null) {
      updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    if (fiber.effectTag === "DELETION") {
      // domParent.removeChild(fiber.dom)
      commitDeletion(fiber, domParent)
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
  
    Object.keys(nextProps)
      .filter(isProps)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        dom[name] = nextProps[name]
      })
  }
  let wipFiber = null
  let hookIndex = null
  function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
  }
  function useState(value) {
    let oldHook = wipFiber.alternate
      && wipFiber.alternate.hooks
      && wipFiber.alternate.hooks[hookIndex]
    const hook = {
      state: oldHook ? oldHook.state : value,
      quene: []
    }
    let actions = oldHook ? oldHook.quene : []
    actions.forEach(action => {
      hook.state = action(hook.state)
    })
    const setState = action => {
      hook.quene.push(action)
      wipRoot = {
        dom: currentRoot.dom,
        props: currentRoot.props,
        alternate: currentRoot
      }
      nextUnitOfWork = wipRoot
      deletions = []
    }
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
  }
  const Didact = {
    createElement,
    render,
    useState
  }
  
  /** @jsx Didact.createElement */
  function Counter() {
    const [state, setState] = Didact.useState(1)
    return (
      <h1 onClick={() => setState(c => c + 1)}>
        Count: {state}
      </h1>
    )
  }
  const element = <Counter />
  
  const container = document.getElementById('root')
  Didact.render(element, container)