import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function AddTask({ user, setTasks, onClose = () => {} }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const task = {
        userId: user.uid,
        title,
        description,
        deadline,
        startDate,
        priority,
        duration: parseInt(duration) || 0,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "tasks"), task);
      setTasks((prev) => [...prev, { id: docRef.id, ...task }]); // Line 33: Error occurs here

      // Add notification
      await addDoc(collection(db, "notifications"), {
        userId: user.uid,
        message: `Task "${title}" added.`,
        createdAt: new Date().toISOString(),
      });

      onClose();
      navigate("/")
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p>Please sign in to add a task.</p>
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
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
              onClick={onClose}
              className="mr-2 text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
