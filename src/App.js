// 测试
import {
    createElement,
    useState,
    useRef,
    useEffect
} from './index'

/** @jsx createElement */
function App() {
    const [state, setState] = useState(1)
    const inputRef = useRef(null)
    useEffect(() => {
        console.log('123456');
        return () => {
            console.log('123');
        }
    }, [state])
    function handleClick() {
        inputRef.current.focus()
    }
    return (
        <div>
            <h1 onClick={() => setState(c => c + 1)}>
                Count: {state}
            </h1>
            <input ref={inputRef}></input>
            <button onClick={handleClick}>
                聚焦输入框
            </button>
        </div>
    )
}

export default App