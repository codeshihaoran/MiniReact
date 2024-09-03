// Hook
import { createElement } from './index'
import useState from '../React/useState'
import useRef from '../React/useRef'
import useEffect from '../React/useEffect'
import useMemo from '../React/useMemo'
import useLayoutEffect from '../React/useLayoutEffect'
import useCallback from '../React/useCallback'
// css
import './App.css'

// compentens
import Navbar from '../src/compentens/navbar'
import Main from '../src/compentens/main'
import Footer from '../src/compentens/footer'
/** @jsx createElement */
function App() {
    let pathName = window.location.pathname
    useEffect(() => {
        if (pathName === '/') {
            window.location.replace('/home');
        }
    }, [])
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