"use client";
import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { getTasks, saveTasks } from "./utils/localStorage";
import { Task } from "./types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = () => {
    if (taskText.trim()) {
      const newTask: Task = { id: Date.now(), text: taskText, completed: false }; // Ensure completed is added
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setTaskText("");
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleEditTask = (id: number, text: string) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, text } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="w-full max-w-2xl text-center mt-10">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <input type="text" placeholder="Add your todo’s" className="p-3 rounded-lg border flex-grow" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        <button className="bg-blue-500 text-white px-5 py-3 rounded-lg" onClick={handleAddTask}>Add Task</button>
      </div>
      <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} onEdit={handleEditTask} />
    </div>
  );
}
