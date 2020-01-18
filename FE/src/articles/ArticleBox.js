import React from 'react';
import {
  Link
} from "react-router-dom";



class ArticleBox extends React.Component {

    constructor(props) {
        console.log(props);
        super(props);
    }


    onRead(articleId) {
    }

    render() {
      return (
        <div className="box">
            <a href="https://youtu.be/s6zR2T9vn2c" className="image fit"><img src="images/pic06.jpg" alt="" /></a>
            <div className="inner">
                <h3>{this.props.article.title}</h3>
                <p>{this.props.article.description}</p>
                <Link className="button fit" to={`/article/${this.props.article.id}`}>Read</Link>
            </div>
        </div>
      );
    }
  }

export default ArticleBox;