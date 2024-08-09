import { createElement } from "../index"
import Home from '../page/Home/home'
/** @jsx createElement */
const Main = () => {
    return (
        <main className="main-content">
            <Home />
        </main>
    )
}
export default Main