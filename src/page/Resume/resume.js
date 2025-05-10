import { createElement } from "../../index"
import './resume.css'
import useEffect from "../../../React/useEffect"
import useState from "../../../React/useState"
import useRef from "../../../React/useRef"
import marked from "marked"

/** @jsx createElement */
const Resume = () => {
    const [resume, setResume] = useState('')
    const dom = useRef(null)
    useEffect(() => {
        const fetchCV = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/codeshihaoran/MiniReact/main/resume.md')
                const data = await response.text()
                const md = marked(data)
                setResume(md)
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
    return (
        <div>
            <div ref={dom}></div>
        </div>
    )
}
export default Resume