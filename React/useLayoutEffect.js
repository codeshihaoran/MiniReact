import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"


function createHook(setup, dependencies) {
    let cleanup = setup()
    const hook = {
        dependencies,
        cleanup
    }
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
        createHook(setup, dependencies)
        return
    }
    if (prevDependencies.length === 0) {
        const hook = oldHook
        globalState.wipFiber.hooks[getHookIndex()] = hook
        addHookIndex()
        return
    }
    let index = 0
    while (index < dependencies.length) {
        if (Object.is(prevDependencies[index], dependencies[index])) {
            index++
        } else {
            oldHook.cleanup()
            const cleanup = setup()
            const hook = {
                dependencies,
                cleanup
            }
            globalState.wipFiber.hooks[getHookIndex()] = hook
            addHookIndex()
            return
        }
    }
    const hook = oldHook
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
}
export default useLayoutEffect