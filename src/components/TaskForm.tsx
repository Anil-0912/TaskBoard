import { useState } from "react";
import type { FormProps } from "../types/task";
import { createTask } from "../api/taskApi";

const TaskForm = ({ setTasks }: FormProps) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const user = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );

    const newTask = {
      title: title.trim(),
      status: "todo",
      assignedAt: new Date().toISOString().split("T")[0],
      dueDate: dueDate || null,
      user: {
        id: user.id,
      },
    };

    try {
      const res = await createTask(newTask);

      // update UI with backend response
      setTasks((prev) => [...prev, res.data]);

      setTitle("");
      setDueDate("");

    } catch (error) {
      console.error("Error creating task", error);
    }
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