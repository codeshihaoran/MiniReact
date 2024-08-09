// Hook
import { createElement } from './index'
import useState from './Hooks/useState'
import useRef from './Hooks/useRef'
import useEffect from './Hooks/useEffect'
import useMemo from './Hooks/useMemo'
import useLayoutEffect from './Hooks/useLayoutEffect'
import useCallback from './Hooks/useCallback'

// page
import Home from './page/Home/home'

/** @jsx createElement */
function App() {
    return (
        <div>
            <Home />
        </div>
    )
}

export default App