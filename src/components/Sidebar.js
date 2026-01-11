import React, { useState } from "react";

export default function Sidebar({ isOpen, close }) {
  const cuisines = [
    "Italian", "Mexican", "Thai", "Chinese", "French",
    "Japanese", "Greek", "Spanish", "Turkish",
    "American", "Korean", "German", "Arabic"
  ];

  const [activeCuisine, setActiveCuisine] = useState(null);

  const handleCuisineClick = (cuisine) => {
    setActiveCuisine(cuisine);
    window.dispatchEvent(new CustomEvent("selectCuisine", { detail: cuisine }));
    close();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity"
          onClick={close}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-72
          bg-white/15 dark:bg-black/25 
          backdrop-blur-2xl
          border-r border-white/30 dark:border-gray-700/30
          shadow-2xl z-[100]
          transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:scale-110 transition"
        >
          ✖
        </button>

        <h2 className="text-3xl text-white font-bold mt-16 px-6 tracking-wide drop-shadow">
          🍽 Cuisines
        </h2>

        <ul className="mt-8 space-y-3 px-6 text-white pb-10">
          {cuisines.map((cuisine) => (
            <li
              key={cuisine}
              onClick={() => handleCuisineClick(cuisine)}
              className={`
                p-3 rounded-lg cursor-pointer text-lg font-medium
                transition-all duration-200
                ${
                  activeCuisine === cuisine
                    ? "bg-purple-600 shadow-xl scale-105"
                    : "bg-white/10 hover:bg-purple-500/60 hover:scale-[1.04]"
                }
              `}
            >
              {cuisine}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
