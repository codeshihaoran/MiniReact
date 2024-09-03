import { createElement } from "../../index"
import './home.css'
import useState from "../../../React/useState"
import useEffect from "../../../React/useEffect"
import Articles from "../../compentens/articles/articles"
/** @jsx createElement */
const Home = () => {
    const [issuesList, setIssueList] = useState([])
    useEffect(() => {
        const fetchIssue = async () => {
            const response = await fetch('https://api.github.com/repos/codeshihaoran/MiniReact/issues', {
                headers: {
                    'Authorization': `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`,
                },
            })
            const data = await response.json()
            setIssueList(data)
        }
        fetchIssue()
    }, [])

    if (issuesList && issuesList.length > 0) {
        return (
            <div className="container">
                <div className='home-title'>
                    <h2>归档</h2>
                </div>
                {issuesList.map(item => (
                    <Articles
                        title={item.title}
                        time={item.created_at}
                        number={item.number}
                    />
                ))}
            </div>
        )

    }

}
export default Home