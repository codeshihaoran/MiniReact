// 测试
import { createElement } from './index'
import useState from './Hooks/useState'
import useRef from './Hooks/useRef'
import useEffect from './Hooks/useEffect'
import useMemo from './Hooks/useMemo'
/** @jsx createElement */
function App() {
    const [state, setState] = useState(1)
    const inputRef = useRef(null)
    const value = useMemo(() => {
        return state * 2
    }, [state])
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
            <h1>useMemo测试值：{value}</h1>
        </div>
    )
}

export default App