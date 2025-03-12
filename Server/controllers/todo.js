import { Todo } from "../modals/todo.js";


// Create todo
export const  createTodo = async (req, res) => {
    try {
      const {title, description} = req.body;
      if(!title || !description){
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
      }
      const todo = new Todo({title, description});
      todo.save();
      console.log(todo)
      return res.status(201).json({
        success: true,
        message: "Todo created successfully.",
        todo,
      })
    } catch (error) {
      console.log(error)
    }
}

// Get all todos or fetch all todo
export const getALlTodos = async(req, res) => {
  try {
    const todos = await Todo.find();
    console.log(todos)
    return res.status(200).json({
      success: true,
      message: "All todos fetched successfully.",
      todos : todos.length === 0 ? "No todos found." : todos,
    })
  } catch (error) {
    console.log(error)
  }
}


// Update todo

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const {title, description} = req.body;
    console.log(title, description)
    const todo = await Todo.findByIdAndUpdate(todoId, {title, description}, {new: true});
    console.log(todo)
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully.",
      todo,
    })
  } catch (error) {
    console.log(error)
  }
}


// Delete todo

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await Todo.findByIdAndDelete(todoId);
    console.log(todo)
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully."
    })
  } catch (error) {
    console.log(error)
  }
}