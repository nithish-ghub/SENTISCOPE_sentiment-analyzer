from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    """
    Analyzes the sentiment of the given text using VADER.
    Returns the sentiment label (Positive, Negative, Neutral) and scores.
    """
    if not text:
        return "Neutral", {"compound": 0.0, "pos": 0.0, "neu": 0.0, "neg": 0.0}

    scores = analyzer.polarity_scores(text)
    compound_score = scores['compound']

    if compound_score >= 0.05:
        label = "Positive"
    elif compound_score <= -0.05:
        label = "Negative"
    else:
        label = "Neutral"

    return label, scores

def process_reviews(reviews):
    """
    Takes a list of review dictionaries and appends sentiment analysis results.
    Assumes each review has a 'text' field.
    """
    processed_reviews = []
    for review in reviews:
        text = review.get('text', '')
        label, scores = analyze_sentiment(text)
        
        review['sentiment_label'] = label
        review['sentiment_scores'] = scores
        processed_reviews.append(review)
        
    return processed_reviews
