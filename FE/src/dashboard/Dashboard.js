import React from 'react';
var CanvasJS = require('./assets/canvasjs.min');
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;


class Dashboard extends React.Component {

    constructor(pros) {
        super(pros);

        this.state = {}
        this.updateChart = this.updateChart.bind(this);
        this.httpGet = this.httpGet.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.addNewArticles = this.addNewArticles.bind(this);
        this.isArticleIdInCurrentArray = this.isArticleIdInCurrentArray.bind(this);
        this.deleteRemovedArticles = this.deleteRemovedArticles.bind(this);
        this.updateExistingArticles = this.updateExistingArticles.bind(this);
        this.deleteRemovedArticles = this.deleteRemovedArticles.bind(this);
        this.updateInterval = 1000 * 1;
        this.pricesInTimeLength = 15;
        this.allArticles = [];
        this.chartContainerId = 'chartContainerId';
        this.chartStyling = { width: "100%", height: "500px" };
    }

    componentDidMount() {
        this.chart = new CanvasJS.Chart(this.chartContainerId, {
            theme: "light2",
            animationEnabled: true,
            animationDuration: 500,
            title: {
                text: "Live Article Pricing",
                padding: 50
            },
            axisX: {
                labelFormatter: function(e) {
                    return CanvasJS.formatDate(e.value, "DD-MM-YYYY H:m:s");
                },
                labelAngle: -20
            },
            legend: {
                horizontalAlign: "center",
                verticalAlign: "bottom",
                fontSize: 15,
                itemMaxWidth: 250,
                itemWrap: false
            },
            data: []
        });
        this.chart.render();

        this.updateChart();
        setInterval(function() {
            this.updateChart()
        }.bind(this), this.updateInterval); 
    }   

    componentDidUpdate() {
        this.chart.render();
    }

    updateChart() {
        this.allArticles = this.httpGet('http://localhost:5000/all');
        this.updateExistingArticles(this.allArticles);
        this.addNewArticles(this.allArticles);
        this.deleteRemovedArticles(this.allArticles);
        this.removeOldData(this.pricesInTimeLength);
        this.chart.render();
    };

    httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return JSON.parse(xmlHttp.responseText);
    }

    addArticle(article) {
        this.chart.options.data.push({
            type: "spline",
            articleId: article.id,
            showInLegend: true,
            legendText: article.title,
            dataPoints: [
                {
                    x: new Date(),
                    y: article.current_score
                }
            ]
        });
    }

    addNewArticles(latestArticles) {
        var newArticles = [];
        for (var articleIndex = 0; articleIndex < latestArticles.length; articleIndex++) {
            if (!this.isArticleIdInCurrentArray(latestArticles[articleIndex].id)) {
                this.addArticle(latestArticles[articleIndex]);
            }
        }
        return newArticles;
    }

    isArticleIdInCurrentArray(latestArticleId) {
        for (var oldArticleIndex = 0; oldArticleIndex < this.chart.options.data.length; oldArticleIndex++) {
            if (latestArticleId == this.chart.options.data[oldArticleIndex].articleId) {
                return true;
            }
        }
        return false;
    }

    deleteRemovedArticles(latestArticles) {
        this.chart.options.data = this.chart.options.data.filter(function(currentArticle) {
            for (var articleIndex = 0; articleIndex < latestArticles.length; articleIndex++) {
                if (latestArticles[articleIndex].id == currentArticle.articleId) {
                    return true;
                }
            }
            return false;
        });
    }

    updateExistingArticles(latestArticles) {
        return this.chart.options.data.filter(function(currentArticle) {
            for (var articleIndex = 0; articleIndex < latestArticles.length; articleIndex++) {
                if (latestArticles[articleIndex].id == currentArticle.articleId) {
                    currentArticle.dataPoints.push({
                        x: new Date(),
                        y: latestArticles[articleIndex].current_score
                    });

                }
            }
        });
    }

    removeOldData(pricesInTimeLength) {
        for (var articleIndex = 0; articleIndex < this.chart.options.data.length; articleIndex++) {
            if (this.chart.options.data[articleIndex].dataPoints.length > pricesInTimeLength) {
                this.chart.options.data[articleIndex].dataPoints.shift();                
            }
        }
    }


    render() {
      return (
        <div>
            <div id="main">
                <div className="inner">
                    <div id = {this.chartContainerId} style = {this.chartStyling}/>
                </div>
            </div>
        </div>
      );
    }
}

export default Dashboard;