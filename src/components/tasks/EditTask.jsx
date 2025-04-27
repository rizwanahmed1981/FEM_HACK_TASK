import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useTasks } from "../../hooks/usetasks";

function EditTask({ user }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useTasks(user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchTask = async () => {
      const taskDoc = await getDoc(doc(db, "tasks", taskId));
      if (taskDoc.exists()) {
        const task = taskDoc.data();
        setTitle(task.title);
        setDescription(task.description);
        setDeadline(task.deadline);
        setStartDate(task.startDate);
        setPriority(task.priority);
        setDuration(task.duration.toString());
        setTags(task.tags.join(", "));
      }
      setLoading(false);
    };
    fetchTask();
  }, [user, taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatedTask = {
      userId: user.uid,
      title,
      description,
      deadline,
      startDate,
      priority,
      duration: parseInt(duration) || 0,
      tags: tags.split(",").map((tag) => tag.trim()),
      status: tasks.find((t) => t.id === taskId).status,
      createdAt: tasks.find((t) => t.id === taskId).createdAt,
    };

    await updateDoc(doc(db, "tasks", taskId), updatedTask);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { id: taskId, ...updatedTask } : t)));

    // Add notification
    await addDoc(collection(db, "notifications"), {
      userId: user.uid,
      message: `Task "${title}" updated.`,
      createdAt: new Date().toISOString(),
    });

    navigate("/");
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p>Please sign in to edit a task.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="number"
            placeholder="Duration (days)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mr-2 text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;