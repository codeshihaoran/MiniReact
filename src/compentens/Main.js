import { createElement } from "../index"

import Home from '../page/Home/home'
import Article from "../page/Article/article"
import About from "../page/About/about"
import NotFound from "./error/error"


import Switch from "../../Router/switch"
import Route from '../../Router/route'

/** @jsx createElement */
const Main = () => {
    return (
        <main className="main-content">
            <Switch>
                <Route path={'/home'} component={Home}></Route>
                <Route path={'/article'} component={Article} ></Route>
                <Route path={'/about'} component={About}></Route>
                <Route path={''} component={NotFound}></Route>
            </Switch>
        </main>
    )
}
export default Main