import { createElement } from "../../index"
import ArticleCategory from "../../compentens/articleCategory/articleCategory"
import { articleInfo } from "../../docs/articleOne"
import { articleInfo as articleInfoTwo } from "../../docs/articleTwo"
import { articleInfo as articleInfoThr } from "../../docs/articleThr"
import './article.css'
/** @jsx createElement */
const Article = () => {
    return (
        <div className="article-category">
            <h2 className="article-name-title">
                归档
            </h2>
            <ArticleCategory
                title={articleInfo.title}
                time={articleInfo.time}
            />
            <ArticleCategory
                title={articleInfoTwo.title}
                time={articleInfoTwo.time}
            />
            <ArticleCategory
                title={articleInfoThr.title}
                time={articleInfoThr.time}
            />
            <nav className="pagination">
                <a href="#" className="pagination-next">下一页</a>
            </nav>
        </div>
    )
}
export default Article