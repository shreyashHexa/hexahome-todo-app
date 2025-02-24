import { Task } from "../types";

export const getTasks = (): Task[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }
  return [];
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
