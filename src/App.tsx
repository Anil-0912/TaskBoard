import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import type { Task } from "./types/task";
import Dashboard from "./pages/DashBoard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved =
        localStorage.getItem("tasks");

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
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
