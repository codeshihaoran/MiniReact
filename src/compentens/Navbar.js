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
            </div>

        </header>
    )
}
export default Navbar