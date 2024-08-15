import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"


function useRef(initialValue) {
    const oldHook = globalState.wipFiber.alternate && globalState.wipFiber.alternate.hooks && globalState.wipFiber.alternate.hooks[getHookIndex()]
    const currentValue = oldHook ? oldHook.current : initialValue
    const hook = {
        current: currentValue
    }
    if (!globalState.wipFiber.hooks) {
        globalState.wipFiber.hooks = []
    }
    globalState.wipFiber.hooks[getHookIndex()] = hook
    addHookIndex()
    return hook
}
export default useRef