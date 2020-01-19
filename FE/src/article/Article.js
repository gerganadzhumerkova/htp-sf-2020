import React from 'react';
import './Article.css'
import Api from '../common/Api';

class Article extends React.Component {

    constructor(props) {
		super(props);
        this.state = {
		  "id": window.location.href.split('/')[window.location.href.split('/').length - 1],
          "isPaid": false,
          "article": {}
		}
		this.buyArticle = this.buyArticle.bind(this);
		this.vote = this.vote.bind(this);
	}

	componentDidMount() {
		this.loadArticle(this.state.id);
	};

	loadArticle(id) {
		return Api.get("/article/" + id).then(response => {
			response.current_score = response.current_score.toFixed(2)
			response.current_price = response.current_price.toFixed(2)
			this.setState({
				unpaidContent: response.content.substring(0, 200) + '..........',
				article: response
			});
		});
	};
	
	buyArticle() {
		Api.post("/article/buy?articleId=" + this.state.id, {}).then(response => {
			this.setState({
				isPaid: true
			});
		});
	};
	vote(voteScore) {

		Api.post("/article/vote?vote=" + voteScore + "&articleId=" + this.state.id, {}).then(response => {});
	}

    render() {
      return (
    	<div className="section">

			<div className="container">

				<div className="row">
					<div className="col-md-8">
						<div className="section-row sticky-container">
							<div className="main-post">

								<h3>{this.state.article.title}</h3>

								<div className="rating-conteiner">
									<div className="rating-title">	
										<span className="heading">User Rating</span>
										<p>{this.state.article.current_score} average based on {this.state.article.number_votes} reviews.</p>
									</div>

									{ !this.state.isPaid ?
									<div className="buy-button-conteiner">
										<a onClick={this.buyArticle} href="#" className="buy-button">Buy Now for {this.state.article.current_price}$</a>
									</div> : null }

								</div>

								<div className="article-content">
									<figure className="figure-img">
										<img className="img-responsive" src="https://ichef.bbci.co.uk/news/1024/branded_news/129CB/production/_110553267_gettyimages-1082804516.jpg" alt=""></img>
									</figure>
									<p>
										{ this.state.isPaid ? this.state.article.content : this.state.unpaidContent}
									</p>
									<h4 className="rating-text">
										Your opinion matters. Please rate the article
									</h4>
									<div className="rating">
										<span onClick={() => this.vote(1)}>☆</span>
										<span onClick={() => this.vote(2)}>☆</span>
										<span onClick={() => this.vote(3)}>☆</span>
										<span onClick={() => this.vote(4)}>☆</span>
										<span onClick={() => this.vote(5)}>☆</span>
										<span onClick={() => this.vote(6)}>☆</span>
										<span onClick={() => this.vote(7)}>☆</span>
										<span onClick={() => this.vote(8)}>☆</span>
										<span onClick={() => this.vote(9)}>☆</span>
										<span onClick={() => this.vote(10)}>☆</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
      );
    }
  }

export default Article;