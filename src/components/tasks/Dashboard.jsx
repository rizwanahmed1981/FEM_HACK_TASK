import { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { db } from "../../firebase/firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useTasks } from "../../hooks/usetasks";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

function Dashboard({ user }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks, setTasks } = useTasks(user);

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

  const filteredTasks = filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "deadline") return new Date(a.deadline) - new Date(b.deadline);
    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);
    setTasks(updatedTasks);

    const newStatus = result.destination.droppableId;
    if (newStatus !== result.source.droppableId) {
      await updateDoc(doc(db, "tasks", reorderedTask.id), { status: newStatus });
    }
  };

  const handleDelete = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700"
          >
            <option value="createdAt">Created At</option>
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks.map((task, index) => (
            <Droppable droppableId={task.status} key={task.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Draggable draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard task={task} onDelete={handleDelete} />
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {showAddTask && (
        <AddTask user={user} setTasks={setTasks} onClose={() => setShowAddTask(false)}/>
      )}
    </div>
  );
}

export default Dashboard;