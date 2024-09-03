import { createElement } from "../index"
import Link from "./link"
/** @jsx createElement */
const Navbar = () => {
    return (
        <header className="header">
            <div className="head-top">
                <h1 className="name"><a href="#">SHIHAORAN</a></h1>
                <p>WELCOME TO MY BLOG</p>
            </div>
            <div className="head-bot">
                <ul>
                    <li><Link to={'/'}>首页</Link></li>
                    <li><Link to={'/about'}>关于</Link></li>
                </ul>
            </div>
        </header>
    )
}
export default Navbar