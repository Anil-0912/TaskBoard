import { useState } from "react";
import type { ItemProps, TaskStatus } from "../types/task";
import { deleteTask, updateTask } from "../api/taskApi";

const TaskItem = ({ task, setTasks }: ItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  // Delete task
  const removeTask = async () => {
    try {
      await deleteTask(task.id);

      setTasks((prev) =>
        prev.filter((t) => t.id !== task.id)
      );
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // Change status
  const changeStatus = async (status: TaskStatus) => {
    try {
      const updated = { ...task, status };

      await updateTask(task.id, updated);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status } : t
        )
      );
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  // Save edited title
  const saveEdit = async () => {
    if (!newTitle.trim()) return;

    try {
      const updated = {
        ...task,
        title: newTitle.trim(),
      };

      await updateTask(task.id, updated);

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? { ...t, title: newTitle.trim() }
            : t
        )
      );

      setEditMode(false);
    } catch (error) {
      console.error("Edit failed", error);
    }
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

        <button onClick={removeTask}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default TaskItem;