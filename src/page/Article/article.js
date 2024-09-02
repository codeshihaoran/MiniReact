import { createElement } from "../../index"

import './article.css'
/** @jsx createElement */
const Article = () => {
    return (
        <div className="article-category">
            <h2 className="article-name-title">
                归档
            </h2>

            <nav className="pagination">
                <a href="#" className="pagination-next">下一页</a>
            </nav>
        </div>
    )
}
export default Article