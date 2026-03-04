export type TaskStatus = "todo" | "in-progress" | "completed";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface ThemeProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export interface FormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface ItemProps extends FormProps {
  task: Task;
}

export type FilterType = "all" | TaskStatus;
 
