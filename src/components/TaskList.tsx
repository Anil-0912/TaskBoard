import type { FormProps } from "../types/task";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, setTasks }: FormProps) => {
  if (tasks.length === 0) {
    return <p className="empty-text">No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};

export default TaskList;