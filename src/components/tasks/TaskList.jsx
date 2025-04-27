import { Link } from "react-router-dom";
import { useTasks } from "../../hooks/usetasks";
import TaskCard from "./TaskCard";
import { db } from "../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

function TaskList({ user, status }) {
  const { tasks, setTasks } = useTasks(user);

  const handleDelete = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  if (!user) {
    return (
      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p>Please sign in to view tasks.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{status.charAt(0).toUpperCase() + status.slice(1)} Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;