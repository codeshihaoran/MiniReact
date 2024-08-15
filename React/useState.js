import { globalState } from "../src/index"
import { getHookIndex, addHookIndex } from "../src/compentens/hookIndex"


function useState(value) {
    let oldHook = globalState.wipFiber.alternate
        && globalState.wipFiber.alternate.hooks
        && globalState.wipFiber.alternate.hooks[getHookIndex()]
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
        globalState.wipRoot = {
            dom: globalState.currentRoot.dom,
            props: globalState.currentRoot.props,
            alternate: globalState.currentRoot
        }
        globalState.nextUnitOfWork = globalState.wipRoot
        globalState.deletions = []
    }
    globalState.wipFiber.hooks.push(hook)
    addHookIndex()
    return [hook.state, setState]
}
export default useState