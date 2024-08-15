import { createElement } from "../index"
import Home from '../page/Home/home'
import Article from "../page/Article/article"
import News from "../page/News/news"
import About from "../page/About/about"
/** @jsx createElement */
const Main = () => {
    return (
        <main className="main-content">
            <Home />
        </main>
    )
}
export default Main