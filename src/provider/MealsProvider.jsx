import React, { useState, useEffect } from "react";
import { MealsContext } from "../context/MealsContext";

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/meals.json")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching meals:", err);
        setLoading(false);
      });
  }, []);

  return (
    <MealsContext.Provider value={{ meals, loading }}>
      {children}
    </MealsContext.Provider>
  );
};

export default MealsProvider;
