import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Anika S.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "Chef Amina’s butter chicken felt like a cozy dinner at home. Packaging was spotless.",
  },
  {
    name: "Rahim U.",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80",
    rating: 4,
    comment:
      "Loved the smoky ramen—rich broth and still warm on arrival. Delivery on time.",
  },
  {
    name: "Maliha R.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "Favorites feature is perfect—I keep reordering the truffle paneer tikka!",
  },
];

const starRow = (count) => "★★★★★☆☆☆☆☆".slice(5 - count, 10 - count);

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/meals.json")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      });
  }, []);

  const dailyMeals = meals.slice(0, 6);

  if (loading) {
    return <div className="page-shell py-16 text-center">Loading...</div>;
  }

  return (
    <div className="page-shell space-y-16">
      <section className="relative overflow-hidden glass-card p-8 md:p-12 mt-6">
        <div className="blur-bg hero-blob-a"></div>
        <div className="blur-bg hero-blob-b"></div>
        <div className="relative grid md:grid-cols-2 gap-10 items-center z-10">
          <div className="space-y-6">
            <span className="pill">New • Home chefs near you</span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="headline"
            >
              Eat like a local. Fresh, chef-made meals—no ghost kitchens.
            </motion.h1>
            <p className="subhead max-w-xl">
              Discover rotating daily menus, honest ratings, and real-time order
              tracking. Built for busy humans who crave comfort food with craft.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/meals" className="btn-solid">
                Browse meals
              </Link>
              <button className="btn-ghost">Watch how it works</button>
            </div>
            <div className="flex gap-6 pt-2 text-sm text-amber-100/90">
              <div>
                <p className="text-2xl font-bold">150+</p>
                <p>Trusted home chefs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">25k</p>
                <p>Weekly deliveries</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.8★</p>
                <p>Average rating</p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="frosted-panel p-4 md:p-6"
          >
            <div className="grid grid-cols-2 gap-3">
              {dailyMeals.slice(0, 4).map((meal) => (
                <div
                  key={meal.id}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <img
                    className="h-32 w-full object-cover"
                    src={meal.image}
                    alt={meal.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex flex-col justify-end">
                    <p className="font-semibold text-sm">{meal.name}</p>
                    <p className="text-xs text-amber-200">{meal.chefName}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="divider-line" />
            <p className="text-sm text-amber-100/80">
              Same-kitchen cooks • No hidden fees • Reheats beautifully
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-shell space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="pill">Daily menu</p>
            <h3 className="text-2xl font-semibold">
              Today’s chef-crafted picks
            </h3>
            <p className="subhead">
              We rotate menus every morning based on fresh markets.
            </p>
          </div>
          <Link to="/meals" className="btn-solid">
            See full menu
          </Link>
        </div>
        <div className="card-grid">
          {dailyMeals.map((meal) => (
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
                    By {meal.chefName} · {meal.chefId}
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
              <Link
                to={`/meals/${meal.id}`}
                className="btn-solid w-full justify-center"
              >
                See details
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell space-y-6">
        <p className="pill">Loved by diners</p>
        <h3 className="text-2xl font-semibold">Recent reviews</h3>
        <div className="card-grid">
          {reviews.map((review) => (
            <div key={review.name} className="glass-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={review.avatar}
                  alt={review.name}
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-amber-200">
                    {starRow(review.rating)}
                  </p>
                </div>
              </div>
              <p className="subhead">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell glass-card p-8 space-y-4 text-center">
        <p className="pill mx-auto">Extra</p>
        <h3 className="text-2xl font-semibold">Why LocalChefBazaar works</h3>
        <p className="subhead max-w-3xl mx-auto">
          Real kitchens, transparent ratings, and delivery tuned for reheating.
          Every route is optimized to keep meals warm, and every chef shares
          their sourcing story.
        </p>
        <div className="card-grid">
          {[
            "Real home kitchens",
            "Live status & ETA",
            "Favorites & reorders",
          ].map((item) => (
            <div key={item} className="frosted-panel p-4 text-left">
              <p className="font-semibold">{item}</p>
              <p className="subhead">
                Curated for comfort nights and weekday lunches.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
