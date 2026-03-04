export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  assignedAt: string;
  dueDate: string;
}

export interface ThemeProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export interface FormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface ItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export type FilterType = "all" | TaskStatus;

