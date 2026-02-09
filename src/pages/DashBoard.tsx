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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active" && task.completed)
      return false;

    if (filter === "completed" && !task.completed)
      return false;

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
        <TaskForm tasks={tasks} setTasks={setTasks} />

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
            {["all", "active", "completed"].map(
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

        {tasks.length > 0 && (
          <div className="clear-box">
            <button onClick={() => setTasks([])}>
              Clear All
            </button>
          </div>
        )}

        <TaskList
          tasks={filteredTasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
};

export default Dashboard;
