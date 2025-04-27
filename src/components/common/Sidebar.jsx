import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { auth } from "../../firebase/firebase";
import { useTasks } from "../../hooks/usetasks";

function Sidebar({ user }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { tasks } = useTasks(user);

  const taskCounts = {
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    deployed: tasks.filter((t) => t.status === "deployed").length,
    deferred: tasks.filter((t) => t.status === "deferred").length,
  };

  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Task Management</h2>
        <nav>
          <Link to="/" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/completed" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Completed Tasks ({taskCounts.completed})
          </Link>
          <Link to="/pending" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Pending Tasks ({taskCounts.pending})
          </Link>
          <Link to="/in-progress" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            In Progress Tasks ({taskCounts.inProgress})
          </Link>
          <Link to="/deployed" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Deployed Tasks ({taskCounts.deployed})
          </Link>
          <Link to="/deferred" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Deferred Tasks ({taskCounts.deferred})
          </Link>
          <Link to="/add-task" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Add New Task
          </Link>
        </nav>
      </div>
      <div>
        {user ? (
          <button
            onClick={handleSignOut}
            className="block py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin" className="block py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
            Sign In
          </Link>
        )}
        <button
          onClick={toggleTheme}
          className="mt-2 w-full text-left py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "light" ? "Dark Theme" : "Light Theme"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;