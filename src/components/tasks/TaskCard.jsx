import { Link } from "react-router-dom";

function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Tags: {task.tags.join(", ")}</p>
      <div className="flex space-x-2 mt-2">
        <Link to={`/edit-task/${task.id}`} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;