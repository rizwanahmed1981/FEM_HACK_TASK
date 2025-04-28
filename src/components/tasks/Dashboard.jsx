import { useState } from "react";
import { useTasks } from "../../hooks/usetasks";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function Dashboard({ user }) {
  const [showAddTask, setShowAddTask] = useState(false);
  const { tasks, setTasks } = useTasks(user);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterTag, setFilterTag] = useState("");

  // Define columns for all statuses
  const columns = {
    pending: {
      title: "To-do",
      items: tasks.filter(
        (task) =>
          task.status === "pending" &&
          (filterPriority ? task.priority === filterPriority : true)
      ),
    },
    "in-progress": {
      title: "In Progress",
      items: tasks.filter(
        (task) =>
          task.status === "in-progress" &&
          (filterPriority ? task.priority === filterPriority : true)
      ),
    },
    completed: {
      title: "Done",
      items: tasks.filter(
        (task) =>
          task.status === "completed" &&
          (filterPriority ? task.priority === filterPriority : true)
      ),
    },
    deployed: {
      title: "Deployed",
      items: tasks.filter(
        (task) =>
          task.status === "deployed" &&
          (filterPriority ? task.priority === filterPriority : true)
      ),
    },
    deferred: {
      title: "Deferred",
      items: tasks.filter(
        (task) =>
          task.status === "deferred" &&
          (filterPriority ? task.priority === filterPriority : true)
      ),
    },
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const draggedTask = sourceColumn.items[source.index];

    try {
      await updateDoc(doc(db, "tasks", draggedTask.id), {
        status: destination.droppableId,
        updatedAt: new Date().toISOString(),
      });

      const newTasks = tasks.map((task) =>
        task.id === draggedTask.id
          ? { ...task, status: destination.droppableId }
          : task
      );
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4 space-x-4">
        {/* Filters */}
        <div className="flex space-x-4">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={() => {
              setFilterPriority("");
            }}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {showAddTask && (
        <AddTask
          user={user}
          setTasks={setTasks}
          onClose={() => setShowAddTask(false)}
          navigateToDashboard={false}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="flex-shrink-0 w-80 bg-gray-100 dark:bg-gray-700 p-4 rounded"
            >
              <h2 className="text-xl font-bold mb-2">{column.title}</h2>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2 min-h-[200px]"
                  >
                    {column.items.length === 0 ? (
                      <p className="text-gray-500">No tasks</p>
                    ) : (
                      column.items.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onDelete={handleDelete}
                                snapshot={snapshot}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
