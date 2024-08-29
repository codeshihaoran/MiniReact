import { createElement } from "../../index"
import './articleCategory.css'
/** @jsx createElement */
const ArticleCategory = ({ title, time }) => {
    return (
        <div className="article-name">
            <div className="archive">
                <div className="post archive">
                    <div className="archive-post">
                        <time datetime="2021-08-06T11:06:00.000Z">
                            <a href="#">{time}</a>
                        </time>
                        <h3 className="archive-title">
                            <a href="/2021/08/06/gmtc-beijing-2021-mp/">
                                <span>{title}</span>
                            </a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArticleCategory