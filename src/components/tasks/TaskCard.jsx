import { Link } from "react-router-dom";

function TaskCard({ task, onDelete, snapshot }) {
  // Add styling when dragging
  const cardStyle = snapshot?.isDragging
    ? { opacity: 0.8, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }
    : {};

  return (
    <div
      className="bg-white  p-4 rounded shadow mb-4"
      style={cardStyle}
    >
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <div className="flex justify-end space-x-2">
        <Link to={`/edit-task/${task.id}`} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;