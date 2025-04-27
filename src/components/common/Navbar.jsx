import { useState } from "react";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import { useTasks } from "../../hooks/usetasks";

function Navbar({ user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { tasks } = useTasks(user);

  const fuse = new Fuse(tasks, {
    keys: ["title", "tags", "priority"],
    threshold: 0.3,
  });

  const searchResults = searchQuery ? fuse.search(searchQuery).map((result) => result.item) : [];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Logo</div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsSearchOpen(true)}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 hidden md:block"
          />
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {isSearchOpen && (
            <div className="absolute top-12 w-full bg-white dark:bg-gray-800 p-4 shadow-lg z-10">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearch}
                className="p-2 rounded bg-gray-100 dark:bg-gray-700 w-full md:hidden"
              />
              <div className="mt-2">
                {searchResults.map((task) => (
                  <div key={task.id} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    {task.title} ({task.priority})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link to="/profile" className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
        <Link to="/notifications" className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Link>
        <Link to="/settings" className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;