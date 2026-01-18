const express = require('express');
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes are protected

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').put(updateTodo).delete(deleteTodo);
router.patch('/:id/toggle', toggleTodo);

module.exports = router;