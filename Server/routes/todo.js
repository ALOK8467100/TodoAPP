import express from "express";
import { createTodo, deleteTodo, getALlTodos, updateTodo } from "../controllers/todo.js";
// import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(  createTodo);
router.route("/").get( getALlTodos);
router.route("/:todoId").put( updateTodo);
router.route("/:todoId").delete( deleteTodo);

// router.route("/").post( isAuthenticated, createTodo);
// router.route("/").get(isAuthenticated, getALlTodos);
// router.route("/:todoId").put(isAuthenticated, updateTodo);
// router.route("/:todoId").delete(isAuthenticated, deleteTodo);

export default router;