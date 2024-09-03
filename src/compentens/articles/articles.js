import './articles.css'
import { createElement } from '../../index'
import marked from 'marked'
/** @jsx createElement */
const Articles = ({ title, time, body }) => {
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
                                <span>{title}</span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Articles