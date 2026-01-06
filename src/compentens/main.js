import { MiniReact } from "../index"

import Home from '../page/Home/home'
import About from "../page/About/about"
import Detail from "../page/detail/detail"
import NotFound from "./error/error"
import Resume from "../page/Resume/resume"

import Switch from "../../Router/switch"
import Route from '../../Router/route'

/** @jsx MiniReact.createElement */
const Main = () => {
    return (
        <main className="main-content">
            <Switch>
                <Route path={'/'} component={Home}></Route>
                <Route path={'/about'} component={About}></Route>
                <Route path={'/detail'} component={Detail}></Route>
                <Route path={'/resume'} component={Resume}></Route>
                <Route path={''} component={NotFound}></Route>
            </Switch>
        </main>
    )
}
export default Main