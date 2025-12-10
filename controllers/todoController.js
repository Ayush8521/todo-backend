const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    console.log("--- DEBUG START ---");
    console.log("1. Request Body received:", req.body); 

    const { title, description } = req.body;

    if (!title) {
        console.log("2. Error: Title is missing");
        return res.status(400).json({ message: "Title is required in the JSON body" });
    }

    const newTodo = new Todo({ title, description });
    
    console.log("3. Saving to Database...");
    await newTodo.save();
    
    console.log("4. Save Successful!");
    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });

  } catch (error) {
    console.error("!!! ERROR DETAILS !!!", error); 
    res.status(500).json({ message: 'Error creating todo', error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
    res.status(200).json({ message: 'Todo updated', todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.status(200).json({ message: 'Todo marked as read', todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error marking todo as read', error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error: error.message });
  }
};
