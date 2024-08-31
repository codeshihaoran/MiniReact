import Articles from '../compentens/articles/articles'
import { createElement } from '../index'

let articleInfo = {
    title: 'Hooks实现原理篇：useState',
    time: '2024-8-24',
    preface: '自 React V16.8 引入了全新的API：React Hooks，为开发者提供了更简洁和灵活的方式来管理组件的状态和副作用。',
    value: '在官方文档中，明确表示：Hook不包含任何破坏性改动，并且没有计划从react中移除class。这意味着开发者可以根据项目需求自由选择使用 Hooks 或 class 组件，而不必担心兼容性问题。',
    last: '在本文中，我们会着重介绍 Hooks 的实现原理，了解它是如何在 React 内部工作，并展示如何在自定义实现的 React 中手写一个简单的 useState。',
    category: '前端',
    tagOne: 'React',
    tagTwo: 'Hooks',
    tagThree: 'useState',
    tagFour: '实现'
}
/** @jsx createElement */
const ArticleThr = () => {
    return (
        <div>
            <Articles
                info={articleInfo}
            />
        </div>
    )
}
export default ArticleThr
export { articleInfo }