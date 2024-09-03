import './articles.css'
import { createElement } from '../../index'
import marked from 'marked'
import Link from '../link'
/** @jsx createElement */
const Articles = ({ title, time, number }) => {
    return (
        <div className="article-name">
            <div className="archive">
                <div className="post archive">
                    <div className="archive-post">
                        <time datetime="#">
                            <a href="#">{time}</a>
                        </time>
                        <h3 className="archive-title">
                            <a href="#">
                                <span><Link to={`detail?articleId=${number}`}>{title}</Link></span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Articles