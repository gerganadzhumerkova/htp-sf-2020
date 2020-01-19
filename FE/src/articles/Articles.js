import React from 'react';
import './Articles.css';
import ArticleBox from './ArticleBox'
import {
  Link
} from "react-router-dom";
import Api from '../common/Api';


class Articles extends React.Component {

    constructor(pros) {
        super(pros);
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        this.loadArticles().then((response) => {
            console.log(response);
            this.setState({
                articles: response
            });
        })
    }

    loadArticles() {
        return Api.get("/all");
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
                    <a href="" className="more">Learn More</a>
                    <Link className="button fit" to="/dashboard">Dashboard</Link>
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