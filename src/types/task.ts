export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface ItemProps {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface ThemeProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

export interface FormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export type FilterType = "all" | "active" | "completed";
 
