import { useState } from "react";
import type { ItemProps, TaskStatus } from "../types/task";

const TaskItem = ({ task, setTasks }: ItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const deleteTask = () => {
    setTasks((prev) =>
      prev.filter((t) => t.id !== task.id)
    );
  };

  const changeStatus = (status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status } : t
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
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
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

        <div className="task-meta">
          <small>
            Assigned:{" "}
            {new Date(task.assignedAt).toLocaleDateString()}
          </small>

          <small>
            Due:{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </small>
        </div>
      </div>

      <div className="task-actions">
        <select
          className={`status-dropdown ${task.status}`}
          value={task.status}
          onChange={(e) =>
            changeStatus(
              e.target.value as TaskStatus
            )
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">
            In Progress
          </option>
          <option value="completed">
            Completed
          </option>
        </select>

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

        <button onClick={deleteTask}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskItem;