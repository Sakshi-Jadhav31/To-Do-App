import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiCheck, FiX } from 'react-icons/fi';

const TodoItem = ({ todo, onToggle, onDelete, onEdit, isEditing, onUpdate, onCancelEdit }) => {
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
  });

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  const handleSave = () => {
    onUpdate(todo._id, editData);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="edit-input"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="edit-textarea"
          placeholder="Description (optional)"
        />
        <div className="edit-row">
          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleSave} className="save-btn">
            <FiCheck /> Save
          </button>
          <button onClick={onCancelEdit} className="cancel-btn">
            <FiX /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox" onClick={() => onToggle(todo._id)}>
        <div className={`checkbox ${todo.completed ? 'checked' : ''}`}>
          {todo.completed && <FiCheck />}
        </div>
      </div>
      
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && <p className="todo-description">{todo.description}</p>}
        <div className="todo-meta">
          <span 
            className="priority-badge"
            style={{ backgroundColor: priorityColors[todo.priority] }}
          >
            {todo.priority}
          </span>
          {todo.dueDate && (
            <span className="due-date">
              <FiCalendar /> {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="todo-actions">
        <button onClick={() => onEdit(todo)} className="edit-btn">
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(todo._id)} className="delete-btn">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;