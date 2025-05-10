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
                console.log(err);
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
            <div>加载中...</div>
        )
    }
    return (
        <div>
            <div ref={dom}></div>
        </div>
    )
}
export default Resume