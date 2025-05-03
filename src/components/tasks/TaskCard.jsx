import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";

function TaskCard({ task, onDelete, snapshot }) {
  const cardStyle = snapshot?.isDragging
    ? { opacity: 0.8, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }
    : {};

  const priorityColors = {
    low: "bg-emerald-100",
    medium: "bg-amber-100",
    high: "bg-rose-100",
  };

  const priorityTextColors = {
    low: "text-emerald-700",
    medium: "text-amber-700",
    high: "text-rose-700",
  };

  const statusColors = {
    pending: "bg-zinc-200",
    "in-progress": "bg-sky-100",
    completed: "bg-green-100",
    deployed: "bg-indigo-100",
    deferred: "bg-yellow-100",
  };

  const statusTextColors = {
    pending: "text-zinc-700",
    "in-progress": "text-sky-700",
    completed: "text-green-700",
    deployed: "text-indigo-700",
    deferred: "text-yellow-700",
  };

  const priorityBg = priorityColors[task.priority] || "bg-gray-300";
  const priorityText = priorityTextColors[task.priority] || "text-black";
  const statusBg = statusColors[task.status] || "bg-gray-300";
  const statusText = statusTextColors[task.status] || "text-black";

  return (
    <div
      className="bg-white flex flex-col gap-5 p-4 rounded shadow mb-4"
      style={cardStyle}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-3 items-center">
        <p className={`${priorityBg} ${priorityText} rounded p-1 px-2`}>
          {task.priority}
        </p>
        <p className={`${statusBg} ${statusText} rounded p-1 px-2`}>
          {task.status}
        </p>
      </div>
      <div className="flex items-center justify-between border-t pt-2 text-2xl border-[#0007]">
        <p>{task.deadline}</p>
        <div className="flex justify-end gap-2">
          <Link
            to={`/edit-task/${task.id}`}
            className="text-blue-500 hover:underline"
          >
            <BsPencilSquare />
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:underline"
          >
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
