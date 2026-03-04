import { useState } from "react";
import type { ItemProps, TaskStatus } from "../types/task";

const TaskItem = ({ task, setTasks }: ItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  // Delete task
  const deleteTask = () => {
    setTasks((prev) =>
      prev.filter((t) => t.id !== task.id)
    );
  };

  // Change task status
  const changeStatus = (status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status } : t
      )
    );
  };

  // Save edited title
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
        <span
          className={
            task.status === "completed"
              ? "done"
              : ""
          }
        >
          {task.title}
        </span>
      )}

      <div className="task-actions">
        {/* Status Dropdown */}
        <select
          className="status-dropdown"
          value={task.status}
          onChange={(e) =>
            changeStatus(e.target.value as TaskStatus)
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Edit / Save Button */}
        {editMode ? (
          <button onClick={saveEdit}>
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}

        {/* Delete Button */}
        <button onClick={deleteTask}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskItem;