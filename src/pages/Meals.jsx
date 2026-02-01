import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch("/meals.json")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      });
  }, []);

  const sortedMeals = useMemo(() => {
    return [...meals].sort((a, b) =>
      sortDir === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [meals, sortDir]);

  const totalPages = Math.ceil(sortedMeals.length / pageSize);
  const currentMeals = sortedMeals.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (loading) {
    return <div className="page-shell py-16 text-center">Loading meals...</div>;
  }

  return (
    <div className="page-shell space-y-8">
      <div className="flex items-center justify-between gap-3 flex-wrap mt-6">
        <div>
          <p className="pill">Meals</p>
          <h2 className="text-2xl font-semibold">
            Browse today’s home-cooked menu
          </h2>
          <p className="subhead">
            Sort by price and dig into chef details before you order.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortDir("asc")}
            className={`btn-ghost ${sortDir === "asc" ? "pill" : ""}`}
          >
            Price ↑
          </button>
          <button
            onClick={() => setSortDir("desc")}
            className={`btn-ghost ${sortDir === "desc" ? "pill" : ""}`}
          >
            Price ↓
          </button>
        </div>
      </div>

      <div className="card-grid">
        {currentMeals.map((meal) => (
          <div key={meal.id} className="glass-card p-4 space-y-3">
            <div className="relative">
              <img
                className="h-52 w-full object-cover rounded-2xl"
                src={meal.image}
                alt={meal.name}
              />
              <span className="pill absolute top-3 left-3 bg-black/60">
                {meal.deliveryArea}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-lg">{meal.name}</p>
                <p className="text-sm text-amber-100/80">
                  {meal.chefName} · {meal.chefId}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${meal.price.toFixed(2)}</p>
                <p className="text-xs text-amber-200">{meal.rating} ★</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-amber-100/90">
              {meal.ingredients.slice(0, 3).map((ing) => (
                <span key={ing} className="pill">
                  {ing}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="text-amber-100/80">ETA {meal.estimatedDelivery}</p>
              <Link to={`/meals/${meal.id}`} className="btn-solid">
                See details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={num === page ? "pill" : "btn-ghost"}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Meals;
