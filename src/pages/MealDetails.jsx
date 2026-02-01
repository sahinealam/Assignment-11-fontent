import React, { useMemo, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MealsContext } from "../context/MealsContext";

const MealDetails = () => {
  const { mealId } = useParams();
  const { meals, loading } = useContext(MealsContext);
  const [reviews, setReviews] = useState([]);

  const meal = useMemo(
    () => meals.find((m) => m.id === mealId),
    [meals, mealId]
  );

  useEffect(() => {
    if (meal) {
      fetch("/reviews.json")
        .then((res) => res.json())
        .then((data) =>
          setReviews(
            data
              .filter((r) => r.mealName === meal.name)
              .map((r) => ({
                reviewerName: r.id,
                reviewerImage:
                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
                rating: r.rating,
                comment: r.comment,
                date: r.date,
              }))
          )
        );
    }
  }, [meal]);
  const [formState, setFormState] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  if (loading) {
    return (
      <div className="page-shell py-16 text-center">
        Loading meal details...
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="page-shell py-16 text-center">
        <p className="subhead">Meal not found.</p>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews((prev) => [
      {
        reviewerName: formState.name || "Guest",
        reviewerImage:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
        rating: Number(formState.rating),
        comment: formState.comment,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setFormState({ name: "", rating: 5, comment: "" });
    toast.success("Review submitted (demo)");
  };

  const handleFavorite = () => {
    toast.success("Added to favorites (demo)");
  };

  return (
    <section className="page-shell py-12 space-y-8">
      <div className="glass-card p-6 md:p-8 grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-4">
          <img
            className="w-full h-[360px] object-cover rounded-2xl"
            src={meal.image}
            alt={meal.name}
          />
          <div className="flex gap-2 flex-wrap text-xs text-amber-100/90">
            {meal.ingredients.map((ing) => (
              <span key={ing} className="pill">
                {ing}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="pill">{meal.deliveryArea}</p>
            <p className="pill">ETA {meal.estimatedDelivery}</p>
          </div>
          <h1 className="headline text-3xl">{meal.name}</h1>
          <p className="text-amber-100/80">
            By {meal.chefName} · {meal.chefId}
          </p>
          <div className="flex items-center gap-6 text-lg font-semibold">
            <span>${meal.price.toFixed(2)}</span>
            <span>{meal.rating} ★</span>
          </div>
          <p className="subhead">{meal.experience}</p>
          <div className="flex gap-3 flex-wrap">
            <button className="btn-solid" onClick={handleFavorite}>
              Add to favorites
            </button>
            <button className="btn-ghost">Order now</button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <span className="pill">Live demo</span>
          </div>
          <div className="space-y-3 max-h-96 overflow-auto pr-1">
            {reviews.map((review) => (
              <div
                key={review.reviewerName + review.date}
                className="frosted-panel p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {review.reviewerName}
                    </p>
                    <p className="text-xs text-amber-200">
                      {review.rating} ★ · {review.date}
                    </p>
                  </div>
                </div>
                <p className="subhead mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6 space-y-3">
          <h3 className="text-lg font-semibold">Add your review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <input
              className="input w-full"
              placeholder="Your name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
            />
            <select
              className="select w-full"
              value={formState.rating}
              onChange={(e) =>
                setFormState({ ...formState, rating: e.target.value })
              }
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} stars
                </option>
              ))}
            </select>
            <textarea
              className="textarea w-full"
              rows="3"
              placeholder="Share your experience"
              value={formState.comment}
              onChange={(e) =>
                setFormState({ ...formState, comment: e.target.value })
              }
            />
            <button type="submit" className="btn-solid w-full justify-center">
              Submit review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MealDetails;
