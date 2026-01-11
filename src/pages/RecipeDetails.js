import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!meal)
    return (
      <p className="text-center text-gray-300 mt-10 text-xl animate-pulse">
        Loading recipe...
      </p>
    );

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing) ingredients.push(`${ing} - ${measure}`);
  }

  return (
    <div className="relative min-h-screen w-full pt-24 pb-16 px-4 flex justify-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(8px) brightness(0.7)",
        }}
      />

      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        <Link
          to="/"
          className="inline-block mb-6 px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold shadow-md transition"
        >
          ⬅ Back
        </Link>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full rounded-2xl shadow-xl mb-8"
        />

        <h1 className="text-4xl font-extrabold mb-4 drop-shadow-xl tracking-wide">
          {meal.strMeal}
        </h1>

        <p className="text-lg text-gray-200 mb-6 font-medium">
          🍽 <span className="font-semibold">{meal.strCategory}</span> · 🌍 {meal.strArea}
        </p>

        <h2 className="text-3xl font-bold mb-3">Ingredients</h2>
        <ul className="list-disc pl-6 text-gray-100 text-lg mb-8 space-y-1">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold mb-3">Instructions</h2>
        <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
          {meal.strInstructions}
        </p>

        <button
          onClick={() => {
            const favs = JSON.parse(localStorage.getItem("favorites")) || [];
            if (!favs.find((f) => f.idMeal === meal.idMeal)) {
              favs.push(meal);
              localStorage.setItem("favorites", JSON.stringify(favs));
              alert("Added to Favorites ❤️");
            } else {
              alert("Already added!");
            }
          }}
          className="mt-8 w-full py-3 text-xl rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-xl font-bold transition active:scale-95"
        >
          ❤️ Save to Favorites
        </button>
      </div>
    </div>
  );
}