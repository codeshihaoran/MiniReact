import { createElement } from "../index"
/** @jsx createElement */
const Navbar = () => {
    return (
        <header className="navbar">
            <nav>
                <ul>
                    <li><a href="#">主页</a></li>
                    <li><a href="#">博客</a></li>
                    <li><a href="#">关于</a></li>
                </ul>
            </nav>
        </header>
    )
}
export default Navbar