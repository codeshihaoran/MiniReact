import { createElement } from "../index"
import useState from "../Hooks/useState"

/** @jsx createElement */
const Home = () => {
    const [value, setValue] = useState(1)
    return (
        <div>
            <h2 onClick={() => setValue(a => a + 3)}>
                {value}
            </h2>
        </div>
    )
}
export default Home