import TaskItem from "./TaskItem";
import { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

export default function TaskList({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) {
  return (
    <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-lg">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}