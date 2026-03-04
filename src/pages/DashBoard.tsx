import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import type { FilterType, FormProps } from "../types/task";

const Dashboard = ({ tasks, setTasks }: FormProps) => {
  const [filter, setFilter] =
    useState<FilterType>("all");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Filter + Search Logic
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filter !== "all" && task.status !== filter) {
      return false;
    }

    // Search filter
    if (
      debouncedSearch &&
      !task.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="container">
      <div className="dashboard-card">
        {/* Task Form */}
        <TaskForm tasks={tasks} setTasks={setTasks} />

        {/* Search + Filter Controls */}
        <div className="top-controls">
          <input
            className="search-box"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="filter-box">
            {["all", "todo", "in-progress", "completed"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setFilter(item as FilterType)
                  }
                  className={
                    filter === item
                      ? "active-filter"
                      : ""
                  }
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* Clear All Button */}
        {tasks.length > 0 && (
          <div className="clear-box">
            <button onClick={() => setTasks([])}>
              Clear All
            </button>
          </div>
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
};

export default Dashboard;