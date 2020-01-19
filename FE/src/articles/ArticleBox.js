import React from 'react';
import {
  Link
} from "react-router-dom";



class ArticleBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="box">
            <a href="#" className="image fit"><img src="https://ichef.bbci.co.uk/news/1024/branded_news/129CB/production/_110553267_gettyimages-1082804516.jpg" alt="" /></a>
            <div className="inner">
                <div className="article-rating">4.9/10</div>
                <h3>{this.props.article.title}</h3>
                <p>{this.props.article.description}</p>
            </div>
            <div className="read-btn-container">
              <Link className="read-btn button fit" to={{
                pathname: `/article/${this.props.article.id}`
              }}>Read</Link>
            </div>
        </div>
      );
    }
  }

export default ArticleBox;