import { useState } from "react";
import type { FormProps, Task } from "../types/task";

const TaskForm = ({ tasks, setTasks }: FormProps) => {
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default TaskForm;
