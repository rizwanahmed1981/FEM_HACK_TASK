import { Link } from "react-router-dom";
import { useTasks } from "../../hooks/usetasks";

function Profile({ user }) {
  const { tasks } = useTasks(user);

  if (!user) {
    return (
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p>Please sign in to view your profile.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  const taskStats = {
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    deployed: tasks.filter((t) => t.status === "deployed").length,
    deferred: tasks.filter((t) => t.status === "deferred").length,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Pending Tasks:</strong> {taskStats.pending}</p>
        <p><strong>Completed Tasks:</strong> {taskStats.completed}</p>
        <p><strong>In Progress Tasks:</strong> {taskStats.inProgress}</p>
        <p><strong>Deployed Tasks:</strong> {taskStats.deployed}</p>
        <p><strong>Deferred Tasks:</strong> {taskStats.deferred}</p>
      </div>
    </div>
  );
}

export default Profile;