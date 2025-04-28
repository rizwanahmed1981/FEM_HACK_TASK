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
    <div className="w-64 bg-[#52538B] h-auto text-white p-4 flex flex-col justify-between rounded-br-2xl">
      <div className="mt-11">
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>
        <nav className="text-xl">
          <Link to="/" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Dashboard
          </Link>
          <Link to="/completed" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Completed Tasks ({taskCounts.completed})
          </Link>
          <Link to="/pending" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Pending Tasks ({taskCounts.pending})
          </Link>
          <Link to="/in-progress" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            In Progress Tasks ({taskCounts.inProgress})
          </Link>
          <Link to="/deployed" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Deployed Tasks ({taskCounts.deployed})
          </Link>
          <Link to="/deferred" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Deferred Tasks ({taskCounts.deferred})
          </Link>
          <Link to="/add-task" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Add New Task
          </Link>
        </nav>
      </div>
      <div className="text-xl">
        {user ? (
          <button
            onClick={handleSignOut}
            className="block py-2 w-full text-left hover:bg-[#ffffff71] rounded px-2"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin" className="block py-2 hover:bg-[#ffffff71] rounded px-2">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;