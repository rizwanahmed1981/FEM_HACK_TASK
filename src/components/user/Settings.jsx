import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <button
          onClick={toggleTheme}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </div>
    </div>
  );
}

export default Settings;