import React from "react";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const saved = JSON.parse(localStorage.getItem("favorites")) || [];

  const removeFavorite = (id) => {
    const updated = saved.filter((meal) => meal.idMeal !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen w-full text-center pt-32 pb-10 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1920&q=100')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(6px) brightness(0.75)",
        }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <h2 className="text-4xl font-extrabold mb-10 text-white drop-shadow-lg tracking-wide">
        Your Favorite Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 max-w-7xl mx-auto">
        {saved.length === 0 ? (
          <p className="text-white text-xl font-medium opacity-90">
            No favorites added yet.
          </p>
        ) : (
          saved.map((meal) => (
            <div key={meal.idMeal} className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl hover:scale-[1.02] transition duration-300">
              <RecipeCard meal={meal} />

              <button
                onClick={() => removeFavorite(meal.idMeal)}
                className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold shadow-md transition active:scale-95"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}