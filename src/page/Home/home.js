import { createElement } from "../../index"
import './home.css'
import useState from "../../../React/useState"
import useEffect from "../../../React/useEffect"
import Articles from "../../compentens/articles/articles"
import useMemo from "../../../React/useMemo"
/** @jsx createElement */
const Home = () => {
    const [issuesList, setIssueList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/codeshihaoran/MiniReact/issues', {
                    headers: {
                        'Authorization': `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`,
                    },
                })
                const data = await response.json()
                if (data.length === 0) {
                    return
                } else {
                    setIssueList(data)
                }
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        fetchIssue()
    }, [])
    const totalPages = useMemo(() => Math.ceil(issuesList.length / pageSize), [issuesList.length])
    const currentPageData = issuesList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )
    if (loading) {
        return (
            <div className="loading">
                <h3>加载中...</h3>
            </div>
        )
    }
    if (error) {
        return (
            <div className="loading">
                <h3 className="err">加载失败: {error.message}</h3>
            </div>
        )
    }
    if (issuesList && issuesList.length > 0) {
        return (
            <div className="container">
                <div className='home-title'>
                    <h2>归档</h2>
                </div>
                {currentPageData.map(item => (
                    <Articles
                        title={item.title}
                        time={item.created_at}
                        number={item.number}
                    />
                ))}
                <nav className="pagination">
                    {
                        currentPage !== 1 ? <button className="pagination-prev" onClick={() => setCurrentPage(c => c - 1)}>
                            上一页
                        </button> : ''
                    }

                    {
                        currentPage !== totalPages ? <button className="pagination-next" onClick={() => setCurrentPage(c => c + 1)}>
                            下一页
                        </button> : ''
                    }
                </nav>
            </div>
        )

    } else {
        return (
            <div className="loading">
                <h3>数据为空，请重新刷新页面。</h3>
            </div>
        )
    }

}
export default Home