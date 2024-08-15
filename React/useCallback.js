import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"


function createHook(fn, dependencies) {
    const hook = {
        fn,
        dependencies
    }
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
    return fn
}
function useCallback(fn, dependencies) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]
    if (!dependencies) {
        return fn
    }
    if (!oldHook) {
        return createHook(fn, dependencies)
    }
    let index = 0
    while (index < dependencies.length) {
        if (Object.is(oldHook.dependencies[index], dependencies[index])) {
            index++
        } else {
            return createHook(fn, dependencies)
        }
    }
    const hook = oldHook
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
    return oldHook.fn
}
export default useCallback