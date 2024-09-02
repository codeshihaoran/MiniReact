import './articles.css'
import { createElement } from '../../index'
import marked from 'marked'
import useEffect from '../../../React/useEffect'
import useState from '../../../React/useState'
/** @jsx createElement */
const Articles = () => {
    const [issuesList, setIssueList] = useState(null)
    useEffect(() => {
        const fetchIssue = async () => {
            const response = await fetch('https://api.github.com/repos/codeshihaoran/MiniReact/issues/1', {
                headers: {
                    'Authorization': `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`,
                },
            })
            const data = await response.json()
            setIssueList(data)
        }
        fetchIssue()
    }, [])
    console.log('666', issuesList);

    return (
        <div className='article'>
            <h3 className="article-title">
                <a href="#">
                    <span></span>
                </a>
            </h3>
            <div className="article-top-meta">
                <span className="posted-on">
                    <a href="#" rel="bookmark">
                        <time className="entry-date published" datetime="">

                        </time>
                    </a>
                </span>
            </div>
            <div className="article-content">
                <div className="entry">
                    <h1 id="前言"><a href="#" className="headerlink" title="前言"></a>前言</h1>
                    <p></p>

                    <p></p>
                </div>
            </div>
            <div className="article-footer">
                <div className="article-meta pull-left">
                    <span className="post-categories">
                        <i className="icon-categories"></i>
                        <a href="#"></a>
                    </span>
                    <span className="post-tags">
                        <i className="icon-tags"></i>
                        <a href="#"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                        <a href="#"></a>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Articles