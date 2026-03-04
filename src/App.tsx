import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import type { Task } from "./types/task";
import Dashboard from "./pages/DashBoard";
import { useNavigate } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (!loggedUser) {
      navigate("/");
    }
  }, []);

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <Dashboard
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
