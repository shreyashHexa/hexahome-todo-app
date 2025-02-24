"use client";
import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { getTasks, saveTasks } from "./utils/localStorage";
import { Task } from "./types";

export default function Home() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleAddTask = () => {
    if (!taskText.trim()) return;
    const newTask: Task = { id: Date.now(), text: taskText.trim(), completed: false };
    const updatedTasks = [...(tasks || []), newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTaskText("");
  };

  const handleToggleComplete = (id: number) => {
    if (!tasks) return;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    if (!tasks) return;
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleEditTask = (id: number, text: string) => {
    if (!tasks) return;
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, text } : task));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="w-full max-w-2xl text-center mt-10">
      <div className="flex items-center justify-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Add your todo’s"
          className="p-3 rounded-lg border flex-grow"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          autoFocus
        />
        <button className="bg-blue-500 text-white px-5 py-3 rounded-lg" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      {tasks === null ? <p>Loading tasks...</p> : <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} onEdit={handleEditTask} />}
    </div>
  );
}
