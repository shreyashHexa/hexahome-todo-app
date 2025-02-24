import { useState } from "react";
import { Task } from "../types";

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

export default function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editText, setEditText] = useState(task.text);

  return (
    <div className={`flex justify-between items-center bg-gray-100 p-3 rounded mb-2 ${task.completed ? "opacity-50" : ""}`}>
      <div className="flex items-center">
        <input type="checkbox" className="mr-3" checked={task.completed} onChange={() => onToggleComplete(task.id)} />
        <span>{task.text}</span>
      </div>
      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}>⋮</button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded">
            <button className="block w-full px-4 py-2 text-left" onClick={() => setShowEditModal(true)}>Edit</button>
            <button className="block w-full px-4 py-2 text-left text-red-500" onClick={() => setShowDeleteConfirm(true)}>Delete</button>
          </div>
        )}
      </div>
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="border p-2 w-full" />
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => { onEdit(task.id, editText); setShowEditModal(false); }} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={() => { onDelete(task.id); setShowDeleteConfirm(false); }} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
