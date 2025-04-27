import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./components/tasks/Dashboard";
import TaskList from "./components/tasks/TaskList";
import AddTask from "./components/tasks/AddTask";
import EditTask from "./components/tasks/EditTask";
import Profile from "./components/user/Profile";
import Notifications from "./components/user/Notifications";
import Settings from "./components/user/Settings";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { useTasks } from "./hooks/usetasks";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const { tasks, setTasks } = useTasks(user)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <div className="flex h-screen">
          <Sidebar user={user} />
          <div className="flex-1 flex flex-col">
            <Navbar user={user} />
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route
                path="/completed"
                element={<TaskList user={user} status="completed" />}
              />
              <Route
                path="/pending"
                element={<TaskList user={user} status="pending" />}
              />
              <Route
                path="/in-progress"
                element={<TaskList user={user} status="in-progress" />}
              />
              <Route
                path="/deployed"
                element={<TaskList user={user} status="deployed" />}
              />
              <Route
                path="/deferred"
                element={<TaskList user={user} status="deferred" />}
              />
              <Route path="/add-task" element={<AddTask user={user}setTasks={setTasks} />} />
              <Route
                path="/edit-task/:taskId"
                element={<EditTask user={user} />}
              />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route
                path="/notifications"
                element={<Notifications user={user} />}
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signin" element={<SignIn setUser={setUser} />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
