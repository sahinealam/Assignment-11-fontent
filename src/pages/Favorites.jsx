import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/meals.json")
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

  if (favorites.length === 0) {
    return <div className="text-center py-16">Loading favorites...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Favorite Meals</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Meal name</th>
                <th className="text-left py-3 px-4 font-semibold">Chef</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Rating</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {favorites.map((fav) => (
                <tr key={fav.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-4">{fav.name}</td>
                  <td className="py-3 px-4">{fav.chefName}</td>
                  <td className="py-3 px-4">${fav.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{fav.rating}</td>
                  <td className="py-3 px-4">
                    <button className="btn-ghost text-sm">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
