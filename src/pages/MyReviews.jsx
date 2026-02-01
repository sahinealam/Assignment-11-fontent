import React, { useState, useEffect } from "react";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  if (reviews.length === 0) {
    return <div className="text-center py-16">Loading reviews...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <p className="font-semibold text-lg">{review.mealName}</p>
                  <p className="text-amber-200 mb-2">{review.rating} ★</p>
                  <p className="subhead mb-2">{review.comment}</p>
                  <p className="text-xs text-amber-100/50">{review.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-ghost">Edit</button>
                  <button className="btn-ghost">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
