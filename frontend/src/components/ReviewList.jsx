import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  const getSentimentIcon = (label) => {
    switch (label) {
      case 'Positive': return <ThumbsUp className="w-5 h-5 text-emerald-500" />;
      case 'Negative': return <ThumbsDown className="w-5 h-5 text-red-500" />;
      default: return <Minus className="w-5 h-5 text-amber-500" />;
    }
  };

  const getSentimentColor = (label) => {
    switch (label) {
      case 'Positive': return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'Negative': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-amber-50 border-amber-200 text-amber-800';
    }
  };

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-indigo-500" />
        Analyzed Reviews
      </h3>
      
      <div className="grid gap-4">
        {reviews.map((review, index) => (
          <div 
            key={review.review_id || index} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium ${getSentimentColor(review.sentiment_label)}`}>
                {getSentimentIcon(review.sentiment_label)}
                {review.sentiment_label}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              "{review.text}"
            </p>
            {review.sentiment_scores && (
              <div className="mt-4 flex gap-4 text-xs text-gray-400">
                <span>Pos: {review.sentiment_scores.pos}</span>
                <span>Neu: {review.sentiment_scores.neu}</span>
                <span>Neg: {review.sentiment_scores.neg}</span>
                <span>Compound: {review.sentiment_scores.compound}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
