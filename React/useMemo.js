import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"


function createHook(calculateValue, dependencies) {
    const hook = {
        res: calculateValue(),
        dep: dependencies
    }
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
    return hook.res
}

function copyHook(oldHook) {
    const hook = oldHook
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
    return hook.res
}

function areDepsEqual(oldDeps, newDeps) {
    if (!oldDeps || !newDeps) {
        return false
    }

    if (oldDeps.length !== newDeps.length) {
        return false
    }

    let index = 0
    while (index < newDeps.length) {
        if (Object.is(oldDeps[index], newDeps[index])) {
            index++
        } else {
            return false
        }
    }
    return true
}

function useMemo(calculateValue, dependencies) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]

    if (!oldHook) {
        return createHook(calculateValue, dependencies)
    }

    if (!dependencies) {
        return createHook(calculateValue, dependencies)
    }

    if (dependencies.length === 0) {
        return copyHook(oldHook)
    }

    const result = areDepsEqual(oldHook.dep, dependencies)
    if (result) {
        return copyHook(oldHook)
    }

    return createHook(calculateValue, dependencies)
}

export default useMemo