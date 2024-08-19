import { createElement } from "../index"

import Home from '../page/Home/home'
import Article from "../page/Article/article"
import News from "../page/News/news"
import About from "../page/About/about"
import Route from '../router/route'
/** @jsx createElement */
const Main = () => {
    return (
        <main className="main-content">
            <Route path={'/home'} component={Home}>

            </Route>
            <Route path={'/article'} component={Article} >

            </Route>
            <Route path={'/news'} component={News}>

            </Route>
            <Route path={'/about'} component={About}>
            </Route>
        </main>
    )
}
export default Main