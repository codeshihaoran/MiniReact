import './articles.css'
import { createElement } from '../../index'

/** @jsx createElement */
const Articles = () => {
    return (
        <div className='article'>
            <h3 className="article-title">
                <a href="#">
                    <span>深入 React.createElement 与 JSX</span>
                </a>
            </h3>
            <div className="article-top-meta">
                <span className="posted-on">
                    <a href="/2021/08/06/gmtc-beijing-2021-mp/" rel="bookmark">
                        <time className="entry-date published" datetime="2021-08-06T11:06:00.000Z">
                            2023.8.20
                        </time>
                    </a>
                </span>
            </div>
            <div className="article-content">
                <div className="entry">

                    <h1 id="前言"><a href="#前言" className="headerlink" title="前言"></a>前言</h1><p>本文章围绕原项目 MiniReact 去讲述，有任何问题可在 Issues 中提问。</p>
                    在开发项目时，我们总是使用 JSX 语法，比起其他的 React Raw API来说，JSX语法更加简洁，UI结构也更加清晰。所以 JSX 现在也是越来越多开发者的不二选择。
                    然而 JSX 并不是有效的 JS，那么浏览器如果直接识别一段JSX会报错，那么内部究竟是如何解析 JSX 的呢？
                    在这里，就不得不提到 React.createElement 了。
                    <p>接下来，本文将会一一揭晓 JSX 内部数据结构以及底层调用的原理。</p>


                </div>
            </div>


            <div className="article-footer">
                <div className="article-meta pull-left">
                    <span className="post-categories">
                        <i className="icon-categories"></i>
                        <a href="/categories/前端/">前端</a>
                    </span>
                    <span className="post-tags">
                        <i className="icon-tags"></i>
                        <a href="/tags/React/">React</a><a href="/tags/Taro/">Jsx</a><a href="/tags/GMTC/">createElement</a><a href="/tags/小程序/">实现</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Articles