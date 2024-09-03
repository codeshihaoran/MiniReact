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
    useEffect(() => {
        const fetchIssue = async () => {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `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`,
                },
            })
            const data = await response.json()
            setTitle(data.title)
            const body = data.body // 拿到md原文
            const html = marked(body) // 通过marked 解析成html
            setIssue(html)
        }
        fetchIssue()
    }, [])
    useEffect(() => {
        if (dom.current) {
            console.log(dom.current);
            dom.current.innerHTML = issue
        }
    }, [issue])
    if (issue) {
        return (
            <div>
                <div className="detail-title"><h2>{title}</h2></div>
                <div className="detail" ref={dom}></div>
            </div>
        )
    }

}
export default Detail