## Scoring and Price calculations

### Score and Price calculation inputs

In the database we keep the following information in order to be be able to calculate the score and price for each articles:

* score_from_author - this is the a score from 1 to 100 which should reflect the authour evaluation of the article values. This should reflect considerations like effort, research, impact, relevance and other considerations.
    * In the current implementation this score is taken directly but in a more sophisticated implementation we could weight the raw score from the authour to the average score assigned by him, as well as length, topic impact and other factors, as to avoid bias coming from the journalist toward his articles.
* front_page_flag - this flag should reflect whether the article has been chosen by editorial as important content. We use this as proxy for peer review and in the future can expand with other ways to approximate peer review.
* initial_score - this is a calculated value, implemented as equal to the authour score, where 20 more points are added if the article has been on the front page.
* last_updated_date - this is the date and time at which the record was last updated, the record is updated in 2 cases: 1) when the article is inserted for the first time and 2) when a new vote is cast.
* current_score  - this value will be equal to the initial_score at the point of adding new article. The current score is updated when a new vote is cast, we calculate it as the sum of the new vote value and the decayed current_score.
        * the votes cast by the user have visualisation from 1 to 10 stars, which are translated into values from -5 to 5 (without 0). Correspondingly when a new vote is cast the decayed current score is decreased or increased by the new vote with the corresponding amount.
        * Decaying of older information is implemented as for news it is quite relevant. However there should be a smaller decaying factor for evergreen content. More information on the decaying approach can be found in the corresponding section below.

## Calibrated score and price calculation

At each point of the time we calculate a calibrated score and price by decaying the current score by them amount of time it has past from the last update date (e.g. the last time the score has been decayed).
* Calibrated score calculation - we take the natural logarithm of the newly decayed current score, cap it to insure it has values between 1 and 10 and output the calibrated score, which is bound between 1 and 10.
* current_price - to calculate the current price we apply logarithmic calibration function to the newly decayed current score.

## Score decay approach

The approach taking for decreasing the score based on time is the one described in the following [article](http://datagenetics.com/blog/october32018/index.html).
