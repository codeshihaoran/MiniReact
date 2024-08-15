// Hook
import { createElement } from './index'
import useState from './Hooks/useState'
import useRef from './Hooks/useRef'
import useEffect from './Hooks/useEffect'
import useMemo from './Hooks/useMemo'
import useLayoutEffect from './Hooks/useLayoutEffect'
import useCallback from './Hooks/useCallback'

// css
import './App.css'

// compentens
import Navbar from './compentens/navbar'
import Main from './compentens/main'
import Footer from './compentens/footer'
/** @jsx createElement */
function App() {
    return (
        <div className="app">
            <div className='blog'>
                <Navbar />
                <Main />
                <Footer />
            </div>
        </div>
    )
}

export default App