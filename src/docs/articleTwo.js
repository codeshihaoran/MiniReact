import Articles from '../compentens/articles/articles'
import { createElement } from '../index'

let articleInfo = {
    title: 'Fiber架构核心与实现',
    time: '2023-8-22',
    preface: '本文章围绕原项目 MiniReact 去讲述，有任何问题可在 Issues 中提问。',
    value: '在上篇文章中，提到了 JSX 通过调用 React.createElement 将 JSX 元素转换成一种对象结构，随后执行 React.render 来渲染更新页面，那么，React是如何渲染的？其中的工作机制和原理又是什么？为了揭秘这些问题，我们将会引申出一种数据结构：Fiber。自 React 16 开始，React 引入了 Fiber 架构，它解决了 React 以前存在的更新机制。',
    last: '在本文中，我们将会详细介绍 Fiber 的来源，以及它解决了什么问题，实现的底层原理。',
    category: '前端',
    tagOne: 'React',
    tagTwo: 'Fiber',
    tagThree: '核心',
    tagFour: '实现'
}
/** @jsx createElement */
const ArticleTwo = () => {
    return (
        <div>
            <Articles
                info={articleInfo}
            />
        </div>
    )
}
export default ArticleTwo
export { articleInfo }