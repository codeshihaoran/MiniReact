import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"

function createHook(setup, dependencies, cleanup = null) {
    const effect = {
        create: setup,
        cleanup: cleanup
    }
    const hook = {
        dependencies,
        effect
    }
    globalState.wipFiber.hooks[getHookIndex()] = hook
    globalState.wipFiber.layoutEffectUpdateQueue.push(effect)
    addHookIndex()
}

function copyHook(oldHook) {
    const hook = oldHook
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
}

function useLayoutEffect(setup, dependencies) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]

    if (!oldHook) {
        if (Object.prototype.toString.call(setup) !== '[object Function]') {
            throw new Error('useLayoutEffect第一个参数为回调函数')
        }

        if (dependencies !== undefined && !Array.isArray(dependencies)) {
            throw new Error('useLayoutEffect第二个参数为数组')
        }
        createHook(setup, dependencies)
        return
    }

    const prevDependencies = oldHook.dependencies
    if (!prevDependencies) {
        createHook(setup, dependencies, oldHook.effect.cleanup)
        return
    }

    if (prevDependencies.length === 0) {
        copyHook(oldHook)
        return
    }

    let index = 0
    while (index < dependencies.length) {
        if (Object.is(prevDependencies[index], dependencies[index])) {
            index++
        } else {
            createHook(setup, dependencies, oldHook.effect.cleanup)
            return
        }
    }
    copyHook(oldHook)
}

export default useLayoutEffect