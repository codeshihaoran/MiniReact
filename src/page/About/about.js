import { createElement } from "../../index"
import './about.css'
import '../../compentens/articles/articles.css'
/** @jsx createElement */
const About = () => {
    return (
        <div className="about">
            <h3 className="about-title"><h2>About</h2></h3>
            <div className="article-top-meta">
                <span className="posted-on">
                    <a href="/about/" rel="bookmark">
                        <time className="entry-date published" datetime="2019-01-10T00:00:00.000Z">
                            2024-08-25
                        </time>
                    </a>
                </span>
            </div>
            <div className="article-content">
                <div className="entry">
                    <h2 id="关于我"><a href="#关于我" className="headerlink" title="关于我"></a>关于我</h2>
                    <p>兰州城市学院</p>
                    <p>GitHub：<a href="https://github.com/codeshihaoran" target="_blank" rel="noopener" className="color">CodeSHR</a></p>
                    <p>联系方式：<a className="color">18393481934</a> </p>

                    <h2><a href="#" className="headerlink" title="项目"></a>关于项目</h2>
                    <ul className="list">
                        <li>通过深入理解 Fiber 架构，实现了一个简化版的 React 渲染过程。</li>
                        <li>亲手编写了众多常用的 React Hooks，例如 useState 和 useEffect。</li>
                        <li>通过不依赖 context 的方式，构建了基本的 HashRouter、Route 和 Link 组件</li>
                        <li>搭建当前的博客网站，目的为了验证 Hooks 的实用性，以及 DOM 是否正确渲染，路由正确使用</li>
                        <li>在博客中，涉及大量的底层技术的核心和概念，旨为手把手教你手写 React && Router 简易版本。</li>
                        <li>本文章围绕原项目 MiniReact 去讲述，有任何问题可在 Issues 中提问。</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
export default About