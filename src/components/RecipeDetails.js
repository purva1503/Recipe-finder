import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  }, [id]);

  if (!meal)
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-300 animate-pulse">
        Loading recipe...
      </p>
    );

  return (
    <div className="relative min-h-screen w-full pt-24 pb-16 px-6 flex justify-center">

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(8px) brightness(0.7)"
        }}
      />

      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="max-w-3xl w-full bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

        <Link
          to="/"
          className="inline-block mb-6 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md font-semibold transition"
        >
          ⬅ Back
        </Link>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full rounded-2xl shadow-xl mb-6"
        />

        <h2 className="text-4xl font-extrabold mb-3 drop-shadow-xl">
          {meal.strMeal}
        </h2>

        <p className="text-lg text-gray-200 mb-6">
          🍽 <span className="font-semibold">{meal.strCategory}</span>  
          · 🌍 {meal.strArea}
        </p>

        <h3 className="text-3xl font-bold mb-3">Instructions</h3>

        <p className="text-gray-100 leading-relaxed whitespace-pre-line">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
}
