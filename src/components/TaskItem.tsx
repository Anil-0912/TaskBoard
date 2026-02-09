import { useState } from "react";
import type { ItemProps } from "../types/task";

const TaskItem = ({ task, tasks, setTasks }: ItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const deleteTask = () => {
    setTasks((prev) =>
      prev.filter((t) => t.id !== task.id)
    );
  };

  const toggleComplete = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const saveEdit = () => {
    if (!newTitle.trim()) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, title: newTitle.trim() }
          : t
      )
    );

    setEditMode(false);
  };

  return (
    <div className="task-item">
      {editMode ? (
        <input
          value={newTitle}
          onChange={(e) =>
            setNewTitle(e.target.value)
          }
        />
      ) : (
        <span className={task.completed ? "done" : ""}>
          {task.title}
        </span>
      )}

      <div className="task-actions">
        <button onClick={toggleComplete}>✔</button>

        {editMode ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}

        <button onClick={deleteTask}>❌</button>
      </div>
    </div>
  );
};

export default TaskItem;
