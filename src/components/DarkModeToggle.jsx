import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        w-20 h-10 flex items-center
        bg-gray-300 dark:bg-gray-700
        rounded-full p-1 transition-all duration-300
        shadow-lg border border-gray-400 dark:border-gray-600
      "
    >
      <div
        className={`
          w-8 h-8 bg-white dark:bg-black rounded-full 
          flex items-center justify-center text-xl
          transform transition-all duration-300
          ${dark ? "translate-x-10" : ""}
        `}
      >
        {dark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
