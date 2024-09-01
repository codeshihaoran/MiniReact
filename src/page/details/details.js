import './details.css'
import marked from 'marked'
import useEffect from '../../../React/useEffect'
import useState from '../../../React/useState'
import { createElement } from '../../index'
import mdPath from '../../../docs/JSX.md';
import useRef from '../../../React/useRef'


/** @jsx createElement */
const Details = () => {
    const dom = useRef(null)
    const [htmlContent, setHtmlContent] = useState('');
    useEffect(() => {
        fetch(mdPath)
            .then(response => response.text())
            .then(markdownText => {
                console.log(markdownText); // 原文：this is article
                const html = marked(markdownText);// 转换成html：<h2>this is article</h2>
                setHtmlContent(html);
            })
    }, [mdPath]);
    useEffect(() => {
        if (dom.current) {
            dom.current.innerHTML = htmlContent
        }
    }, [htmlContent])
    return (
        <div className='all' ref={dom}></div>
    );
}
export default Details