const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Define routes
router.post('/add', todoController.createTodo);       // Create
router.get('/', todoController.getTodos);             // List all
router.put('/update/:id', todoController.updateTodo); // Update
router.patch('/read/:id', todoController.markAsRead); // Mark as Read
router.delete('/delete/:id', todoController.deleteTodo); // Delete

module.exports = router;