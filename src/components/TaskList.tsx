import TaskItem from "./TaskItem";
import type { FormProps } from "../types/task";

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
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};

export default TaskList;
