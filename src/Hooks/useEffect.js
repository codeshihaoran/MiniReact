import { globalState } from "../index"
import { getHookIndex, addHookIndex } from "../compentens/hookIndex"
function useEffect(effectCallback, dependencyList) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]
    if (Object.prototype.toString.call(effectCallback) !== '[object Function]') {
        throw new Error('useEffect第一个参数为回调函数')
    } else {
        if (!dependencyList) {
            // 每次渲染都执行
            queueMicrotask(effectCallback);
            return
        }
        if (!Array.isArray(dependencyList)) {
            throw new Error('useEffect第二个参数为数组')
        }
        if (dependencyList.length === 0) {
            // 初始渲染时执行一次
            const old = globalState.wipFiber.alternate
            if (!old) {
                queueMicrotask(effectCallback);
            }
            return
        }
        let cleanup = 'cleanup'
        const hook = {
            dependencyList,
            cleanup
        }
        let hasChange = oldHook ? !dependencyList.every((value, index) => value === oldHook.dependencyList[index]) : true
        if (hasChange) {
            if (oldHook && oldHook.cleanup) {
                queueMicrotask(() => {
                    oldHook.cleanup()
                })

            }
            queueMicrotask(() => {
                const cleanupFunction = effectCallback();
                hook[cleanup] = cleanupFunction;
            });
        }
        globalState.wipFiber.hooks[getHookIndex()] = hook
        addHookIndex()
    }

}

export default useEffect