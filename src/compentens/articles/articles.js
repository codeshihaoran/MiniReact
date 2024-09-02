import './articles.css'
import { createElement } from '../../index'
import marked from 'marked'
import useEffect from '../../../React/useEffect'
import useState from '../../../React/useState'
/** @jsx createElement */
const Articles = ({ title, time, body }) => {
    return (
        <div className='article'>
            <h3 className="article-title">
                <a href="#">
                    <span>{title}</span>
                </a>
            </h3>
            <div className="article-top-meta">
                <span className="posted-on">
                    <a href="#" rel="bookmark">
                        <time className="entry-date published" datetime="">
                            {time}
                        </time>
                    </a>
                </span>
            </div>
            <div className="article-content">
                <div className="entry">
                    <h1 id="前言"><a href="#" className="headerlink" title="前言"></a>前言</h1>

                </div>
            </div>
            <div className="article-footer">
                <div className="article-meta pull-left">
                    <span className="post-categories">
                        <i className="icon-categories"></i>
                        <a href="#">React</a>
                    </span>
                </div>
            </div>
        </div>
    )

}
export default Articles