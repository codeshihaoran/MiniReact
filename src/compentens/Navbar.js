import { createElement } from "../index"
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
                    <li><a href="#">首页</a></li>
                    <li><a href="#">文章</a></li>
                    <li><a href="#">新闻</a></li>
                    <li><a href="#">关于</a></li>
                </ul>
            </div>

        </header>
    )
}
export default Navbar