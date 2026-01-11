import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const categories = [
    "Indian",
    "Seafood",
    "Chicken",
    "Dessert",
    "Beef",
    "Vegetarian",
    "Vegan",
    "Breakfast",
    "Pasta",
    "Lamb"
  ];

  const categoryIcons = {
    Indian: "🌶️",
    Seafood: "🐟",
    Chicken: "🍗",
    Dessert: "🍰",
    Beef: "🥩",
    Vegetarian: "🥦",
    Vegan: "🌱",
    Breakfast: "🍳",
    Pasta: "🍝",
    Lamb: "🍖",
  };

  useEffect(() => {
    fetchRecommended();
  }, []);

  const fetchRecommended = async () => {
    let recList = [];
    for (let i = 0; i < 10; i++) {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await res.json();
        if (data.meals) recList.push(data.meals[0]);
      } catch (err) {
        console.warn("random fetch failed", err);
      }
    }
    setRecommended(recList);
  };

  const searchRecipes = async () => {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    const q = query.toLowerCase();
    let url = q.includes("indian") || q.includes("desi")
      ? "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data.meals) {
        setRecipes([]);
        return;
      }

      const sorted = data.meals.sort((a, b) => {
        const nameA = a.strMeal.toLowerCase();
        const nameB = b.strMeal.toLowerCase();

        const indexA = nameA.indexOf(q);
        const indexB = nameB.indexOf(q);

        if (indexA === -1 && indexB === -1) 
          return nameA.localeCompare(nameB);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });

      setRecipes(sorted);
    } catch (err) {
      console.log("search error", err);
      setRecipes([]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      searchRecipes();
    }, 350);

    return () => clearTimeout(delay);
  }, [query]);

  const searchByCategory = async (category) => {
    setActiveCategory(category);

    let url =
      category === "Indian"
        ? "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error("category search error", err);
      setRecipes([]);
    }
  };

  const searchByCuisine = async (cuisine) => {
    setActiveCategory(null);

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(cuisine)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error("cuisine search error", err);
      setRecipes([]);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      const cuisine = e?.detail;
      if (cuisine) searchByCuisine(cuisine);
    };

    window.addEventListener("selectCuisine", handler);
    return () => window.removeEventListener("selectCuisine", handler);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden transition-all duration-300">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=100')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "blur(6px) brightness(0.75)",
        }}
      />

      <div className="absolute inset-0 bg-black/40 -z-10" />

      <h2 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg pt-28 text-center tracking-wide">
        Discover Delicious Recipes
      </h2>

      <div className="flex justify-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 md:w-96 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-black dark:text-white shadow-lg focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      <div className="w-full overflow-x-auto mt-10 px-4 py-3 hide-scrollbar">
        <div className="flex gap-4 w-max mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => searchByCategory(cat)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border shadow-md backdrop-blur-lg
                ${activeCategory === cat
                  ? "bg-purple-600 text-white border-purple-600 shadow-xl scale-105"
                  : "bg-white/10 text-white border-white/30 hover:bg-purple-500/60 hover:scale-105"}`}
            >
              <span className="text-xl">{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {recipes.length === 0 && query.trim() === "" && (
        <div className="mt-14 px-6">
          <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
            Recommended For You
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-2">
            {recommended.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h4 className="text-white font-semibold text-lg">{meal.strMeal}</h4>
                  <p className="text-gray-300 text-sm mt-1">{meal.strCategory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-14 px-4 pb-10">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}
