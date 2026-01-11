import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-[100] w-full backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/20 shadow-lg">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">

          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text drop-shadow">
            🍽 Recipe Finder
          </h1>

          <div className="flex items-center space-x-8 text-lg font-medium">

            <span
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="premium-link cursor-pointer"
            >
              Home
            </span>

            <Link className="premium-link" to="/favorites">
              Favorites
            </Link>

            <span
              onClick={() => setIsSidebarOpen(true)}
              className="premium-link cursor-pointer"
            >
              🍽 Cuisines
            </span>

            <DarkModeToggle />
          </div>
        </nav>
      </header>

      <Sidebar
        isOpen={isSidebarOpen}
        close={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
