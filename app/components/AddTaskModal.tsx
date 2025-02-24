import { useState } from "react";
import { Task } from "../types";

type AddTaskModalProps = {
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
};

export default function AddTaskModal({ task, onClose, onSave }: AddTaskModalProps) {
  const [text, setText] = useState<string>(task ? task.text : "");

  const handleSubmit = () => {
    if (text.trim()) {
      onSave({ id: task ? task.id : Date.now(), text, completed: task ? task.completed : false });
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-3">{task ? "Edit Task" : "Add Task"}</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="mr-2" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
