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
                    <p>GitHub：<a href="https://github.com/codeshihaoran" target="_blank" rel="noopener" className="color">CodeSHR</a></p>
                    <h2><a href="#" className="headerlink" title="项目"></a>关于项目</h2>
                    <h3>实现方案</h3>
                    <ul className="list">
                        <li>通过了解 JSX 核心理念，实现了 createElement 函数，将 JSX 转换为 JavaScript 对象。</li>
                        <li>通过深入理解 Fiber 架构，实现了一个简化版的 React 渲染过程。</li>
                        <li>基于该项目渲染流程，实现了众多常用的 React Hooks，例如 useState 和 useEffect。</li>
                        <li>由于该项目内部实现方案，无法使用 React-router，所以实现了基本的 HashRouter、Route 和 Link 组件。</li>
                        <li>为了验证 Hooks 的实用性，以及 DOM 是否正确渲染，路由正确使用，基于当前项目所搭建博客网站。</li>
                        <li>在博客中，通过接入 OpenAPI issue 接口，来获取项目底层技术的实现文章，旨为手把手教你手写 React && Router 简易版本。</li>
                        <li>本文章围绕原项目 MiniReact 去讲述，有任何问题可在 Issues 中提问。</li>
                    </ul>
                    <h3>部署说明</h3>
                    <ul className="list">
                        <li>本项目使用 Vercel 进行部署。Vercel 提供了简单易用的静态和动态站点部署服务。</li>
                        <li>将 Github 项目源地址连接到 Vercel，Vercel 自动检测并生成适合项目的部署配置。</li>
                        <li>部署完成后，Vercel 会提供一个二级域名供你访问该项目。</li>
                        <li>如果你需要配置自定义域名，可以在 Vercel 项目设置中添加，并通过添加 DNS 记录将请求重定向到自定义域名。</li>
                        <li>当你更新源码并将代码提交到主分支后，Vercel 会自动触发构建和部署流程，确保网站内容与最新的代码保持一致。</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default About