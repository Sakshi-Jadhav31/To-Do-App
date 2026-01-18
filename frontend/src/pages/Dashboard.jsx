import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';
import { FiLogOut, FiPlus, FiFilter } from 'react-icons/fi';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todos');
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const response = await api.post('/todos', todoData);
      setTodos([response.data, ...todos]);
      setShowForm(false);
      toast.success('Todo added!');
    } catch (error) {
      toast.error('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, todoData);
      setTodos(todos.map(t => t._id === id ? response.data : t));
      setEditingTodo(null);
      toast.success('Todo updated!');
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
      toast.success('Todo deleted!');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const response = await api.patch(`/todos/${id}/toggle`);
      setTodos(todos.map(t => t._id === id ? response.data : t));
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Hello, {user?.name}! 👋</h1>
            <p>Let's make today productive</p>
          </div>
          <button onClick={logout} className="logout-btn">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-container">
          <div className="stat-card total">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card completed">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="todos-section">
          <div className="todos-header">
            <h2>My Tasks</h2>
            <div className="todos-actions">
              <div className="filter-group">
                <FiFilter />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button onClick={() => setShowForm(true)} className="add-btn">
                <FiPlus /> Add Task
              </button>
            </div>
          </div>

          {showForm && (
            <TodoForm
              onSubmit={handleAddTodo}
              onCancel={() => setShowForm(false)}
            />
          )}

          {loading ? (
            <div className="loading-todos">Loading your tasks...</div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found. Add one to get started!</p>
            </div>
          ) : (
            <div className="todos-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={setEditingTodo}
                  isEditing={editingTodo?._id === todo._id}
                  onUpdate={handleUpdateTodo}
                  onCancelEdit={() => setEditingTodo(null)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;