import React from "react";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="relative min-h-screen w-full pt-28 pb-16 px-6 overflow-hidden text-black dark:text-white">

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(8px) brightness(0.75)"
        }}
      />

      <div className="absolute inset-0 bg-black/40 -z-10" />

      <h2 className="text-4xl font-extrabold mb-10 drop-shadow-xl tracking-wide text-white">
        Your Favorite Recipes
      </h2>

      {favorites.length === 0 && (
        <p className="text-white/80 text-xl font-medium mt-4">
          No favorites added yet.
        </p>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {favorites.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <RecipeCard meal={meal} />
          </div>
        ))}
      </div>
    </div>
  );
}
