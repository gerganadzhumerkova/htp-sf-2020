import React from 'react';
import './Articles.css';
import ArticleBox from './ArticleBox'


class Articles extends React.Component {

    constructor(pros) {
        super(pros);
        this.state = {}
        this.state.articles = [
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            },
            {
                "id": "1",
                "title": "Article 1",
                "description": "Interdum amet accumsan placerat commodo ut amet aliquam blandit nunc tempor lobortis nunc non. Mi accumsan.",
            }
        ]
    }

    render() {
      return (
        <div>
            <section id="banner" data-video="images/banner">
                <div className="inner">
                    <header>
                        <h1>Bulgaria News</h1>
                        <p>Just a demo</p>
                    </header>
                    <a href="#main" className="more">Learn More</a>
                </div>
            </section>
            <div id="main">
                <div className="inner">
                    <div className="thumbnails">

                    {this.state.articles.map((item,i) => 
                        <ArticleBox key={i} article={item} />
                    )}

                    </div>

                </div>
            </div>
        </div>
      );
    }
  }

export default Articles;