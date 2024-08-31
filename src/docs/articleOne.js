import Articles from '../compentens/articles/articles'
import { createElement } from '../index'
let articleInfo = {
    title: '深入 React.createElement 与 JSX',
    time: '2024-8-20',
    preface: 'JSX（JavaScript XML）是一种语法扩展，允许开发者在 JavaScript 中编写类似于 HTML 的语法，最终被编译为纯 JavaScript。',
    value: '在开发项目时，我们总是使用 JSX 语法，比起其他的 React Raw API来说，JSX语法更加简洁，UI结构也更加清晰。所以 JSX 现在也是越来越多开发者的不二选择。然而 JSX 并不是有效的 JS，那么浏览器如果直接识别一段JSX会报错，那么内部究竟是如何解析 JSX 的呢？在这里，就不得不提到 React.createElement 了。',
    last: '接下来，本文将会一一揭晓 JSX 内部数据结构以及底层调用的原理。',
    category: '前端',
    tagOne: 'React',
    tagTwo: 'Jsx',
    tagThree: 'createElement',
    tagFour: '实现'
}
/** @jsx createElement */
const ArticleOne = () => {
    return (
        <div>
            <Articles
                info={articleInfo}
            />
        </div>
    )
}
export default ArticleOne
export { articleInfo }