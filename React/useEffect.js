import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"

function createHook(setup, dependencyList, cleanup = null) {
    const effect = {
        create: setup,
        cleanup: cleanup
    }
    const hook = {
        dependencyList,
        effect
    }
    globalState.wipFiber.hooks[getHookIndex()] = hook
    globalState.wipFiber.effectUpdateQueue.push(effect)
    addHookIndex()
}

function copyHook(oldHook) {
    const hook = oldHook
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
}

function useEffect(effectCallback, dependencyList) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]

    if (!oldHook) {
        if (Object.prototype.toString.call(effectCallback) !== '[object Function]') {
            throw new Error('useEffect第一个参数为回调函数')
        }

        if (dependencyList !== undefined && !Array.isArray(dependencyList)) {
            throw new Error('useEffect第二个参数为数组')
        }
        createHook(effectCallback, dependencyList)
        return
    }

    const prevDependenList = oldHook.dependencyList
    if (!prevDependenList) {
        createHook(effectCallback, dependencyList, oldHook.effect.cleanup)
        return
    }

    if (prevDependenList.length === 0) {
        copyHook(oldHook)
        return
    }

    let index = 0
    while (index < dependencyList.length) {
        if (Object.is(prevDependenList[index], dependencyList[index])) {
            index++
        } else {
            createHook(effectCallback, dependencyList, oldHook.effect.cleanup)
            return
        }
    }
    copyHook(oldHook)
}

export default useEffect