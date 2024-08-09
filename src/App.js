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

// page
import Home from './page/Home/home'

// compentens
import Navbar from './compentens/Navbar'
import Main from './compentens/Main'
import Footer from './compentens/Footer'
/** @jsx createElement */
function App() {
    return (
        <div className="app">
            <Navbar />
            <Main />
            <Footer />
        </div>
    )
}

export default App