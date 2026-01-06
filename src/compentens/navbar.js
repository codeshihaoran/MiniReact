import { MiniReact } from "../index"
import Link from "./link"

/** @jsx MiniReact.createElement */
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
                    <li><Link to={'/resume'}>简历</Link></li>
                </ul>
            </div>
        </header>
    )
}
export default Navbar