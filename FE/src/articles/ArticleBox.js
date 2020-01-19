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
            <a href="#" className="image fit"><img src={this.props.article.image_url} alt="" /></a>
            <div className="inner">
            <div className="article-rating">{this.props.article.current_score ? this.props.article.current_score.toFixed(2) : 1 }/10</div>
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