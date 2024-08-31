import './articles.css'
import { createElement } from '../../index'

/** @jsx createElement */
const Articles = ({ info }) => {
    return (
        <div className='article'>
            <h3 className="article-title">
                <a href="#">
                    <span>{info.title}</span>
                </a>
            </h3>
            <div className="article-top-meta">
                <span className="posted-on">
                    <a href="#" rel="bookmark">
                        <time className="entry-date published" datetime="">
                            {info.time}
                        </time>
                    </a>
                </span>
            </div>
            <div className="article-content">
                <div className="entry">
                    <h1 id="前言"><a href="#" className="headerlink" title="前言"></a>前言</h1>
                    <p>{info.preface}</p>
                    {info.value}
                    <p>{info.last}</p>
                </div>
            </div>
            <div className="article-footer">
                <div className="article-meta pull-left">
                    <span className="post-categories">
                        <i className="icon-categories"></i>
                        <a href="#">{info.category}</a>
                    </span>
                    <span className="post-tags">
                        <i className="icon-tags"></i>
                        <a href="#">{info.tagOne}</a>
                        <a href="#">{info.tagTwo}</a>
                        <a href="#">{info.tagThree}</a>
                        <a href="#">{info.tagFour}</a>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Articles