import { createElement } from "../../index"
import useState from "../../../React/useState"
import useEffect from "../../../React/useEffect"
import useRef from "../../../React/useRef"

import marked from "marked"
import './detail.css'

/** @jsx createElement */
const Detail = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('articleId')
    const url = `https://api.github.com/repos/codeshihaoran/MiniReact/issues/${id}`
    const dom = useRef(null)
    const [issue, setIssue] = useState(null)
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `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`,
                    },
                })
                const data = await response.json()
                if (!data) {
                    return
                } else {
                    setTitle(data.title)
                    const body = data.body // 拿到md原文
                    const html = marked(body) // 通过marked 解析成html
                    setIssue(html)
                }
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        fetchIssue()
    }, [])
    useEffect(() => {
        if (dom.current) {
            dom.current.innerHTML = issue
        }
    }, [issue])
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

    if (issue) {
        return (
            <div>
                <div className="detail-title"><h2>{title}</h2></div>
                <div className="detail" ref={dom}></div>
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
export default Detail