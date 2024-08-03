import { globalState } from "../index"
import { getHookIndex, addHookIndex } from "../compentens/hookIndex"
function memoHook(calculateValue, dependencies) {
    const result = calculateValue()
    const hook = {
        res: result,
        dep: dependencies
    }
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
    return hook.res
}
function useMemo(calculateValue, dependencies) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]
    if (!oldHook) {
        console.log('初始化渲染，计算值并保存');
        return memoHook(calculateValue, dependencies)
    } else {
        let index = 0
        while (index < dependencies.length) {
            // React 使用 Object.is 将每个依赖项与其之前的值进行比较
            if (Object.is(oldHook.dep[index], dependencies[index])) {
                index++
            } else {
                console.log('依赖项发生变化，重新计算值');
                return memoHook(calculateValue, dependencies)
            }
        }
        console.log('依赖项未发生变化，返回原来值');
        globalState.wipFiber.hooks[getHookIndex()] = oldHook
        addHookIndex()
        return oldHook.res
    }

}

export default useMemo