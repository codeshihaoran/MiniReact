import { createElement } from "../../index"
import './home.css'
import useState from "../../../React/useState"
import ArticleOne from "../../docs/articleOne"
/** @jsx createElement */
const Home = () => {
    const [state, setState] = useState(0)
    return (
        <div className="container">
            <ArticleOne />
        </div>
    )
}
export default Home