import { useState } from 'react';
import { FiX, FiSave } from 'react-icons/fi';

const TodoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          autoFocus
        />
        
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        
        <div className="form-row">
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            <FiSave /> Add Task
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            <FiX /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;