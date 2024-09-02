import { createElement } from "../../index"
import './home.css'
import useState from "../../../React/useState"
import Articles from "../../compentens/articles/articles"
/** @jsx createElement */
const Home = () => {
    const [state, setState] = useState(0)
    return (
        <div className="container">
            <Articles />
        </div>
    )
}
export default Home