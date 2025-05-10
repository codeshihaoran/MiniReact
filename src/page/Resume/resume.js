import { createElement } from "../../index"
import './resume.css'
import useEffect from "../../../React/useEffect"
import useState from "../../../React/useState"
import useRef from "../../../React/useRef"
import marked from "marked"

/** @jsx createElement */
const Resume = () => {
    const [resume, setResume] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const dom = useRef(null)
    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/gh/codeshihaoran/MiniReact@main/resume.md')
                const data = await response.text()
                const md = marked(data)
                setResume(md)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                setError(err)
            }
        }
        fetchCV()
    }, [])
    console.log(resume);
    useEffect(() => {
        if (dom.current) {
            dom.current.innerHTML = resume
        }
    }, [resume])
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
    return (
        <div>
            <div ref={dom}></div>
        </div>
    )
}
export default Resume