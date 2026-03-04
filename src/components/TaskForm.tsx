import { useState } from "react";
import type { FormProps, Task } from "../types/task";

const TaskForm = ({ setTasks }: FormProps) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      status: "todo",
      assignedAt: new Date().toISOString(),
      dueDate,
    };

    setTasks((prev) => [...prev, newTask]);

    setTitle("");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={addTask}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        title="Select Due Date"
      />

      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;