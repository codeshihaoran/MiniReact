import { createElement } from "../../index"
import useState from "../../Hooks/useState"
import './home.css'
/** @jsx createElement */
const Home = () => {
    // const [value, setValue] = useState(1)
    return (
        <div className="container">
            <div className="header">
                <h1>My Blog</h1>
                <p>Welcome to my blog!</p>
            </div>
            <div className="post">
                <h2>First Post Title</h2>
                <p>...........................................................................................</p>
                <p className="meta">Posted on August 9, 2024</p>
            </div>
            <div className="post">
                <h2>Second Post Title</h2>
                <p>...........................................................................................</p>
                <p className="meta">Posted on August 8, 2024</p>
            </div>
            <div className="post">
                <h2>Third Post Title</h2>
                <p>...........................................................................................</p>
                <p className="meta">Posted on August 7, 2024</p>
            </div>
            <div className="footer">
                <p>&copy; 2024 My Blog. </p>
            </div>
        </div>
    )
}
export default Home