import { createElement } from "../../index"
import './home.css'
import useState from "../../../React/useState"
import ArticleOne from "../../docs/articleOne"
import ArticleTwo from "../../docs/articleTwo"
import ArticleThr from "../../docs/articleThr"
/** @jsx createElement */
const Home = () => {
    const [state, setState] = useState(0)
    return (
        <div className="container">
            <ArticleOne />
            <ArticleTwo />
            <ArticleThr />
        </div>
    )
}
export default Home