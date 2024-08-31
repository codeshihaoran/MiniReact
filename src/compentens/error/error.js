import { createElement } from '../../index'
import './error.css'
/** @jsx createElement */
const NotFound = () => {
    return (

        <div className="wrap">
            <div className="logo">
                <h1>404</h1>
                <p>The Page not Found</p>
                <div className="sub">
                    <p><a href="/home">Back Home</a></p>
                </div>
            </div>
        </div>

    )
}
export default NotFound