import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <div
      className="
        bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl
        rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/40
        overflow-hidden transition-all duration-300
        hover:shadow-2xl hover:scale-[1.04] hover:-translate-y-1
        hover:border-purple-400/60
      "
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {meal.strMeal}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          {meal.strCategory}
        </p>

        <div className="flex justify-between items-center mt-4 text-sm font-semibold">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 transition"
          >
            View Details →
          </Link>

          <button
            onClick={() => {
              let fav = JSON.parse(localStorage.getItem("favorites")) || [];
              if (!fav.find((x) => x.idMeal === meal.idMeal)) {
                fav.push(meal);
                localStorage.setItem("favorites", JSON.stringify(fav));
                alert("Saved ❤️");
              } else {
                alert("Already in Favorites");
              }
            }}
            className="text-red-500 hover:text-red-700 transition transform active:scale-90"
          >
            ❤️ Save
          </button>
        </div>
      </div>
    </div>
  );
}
