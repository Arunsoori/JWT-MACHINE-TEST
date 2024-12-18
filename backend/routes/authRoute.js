const express = require('express');
const { signup, login, uploadImage } = require('../Controllers/Authcontrollers');
const { checkUser } = require('../Middleware/AuthMiddleware');
const router = express.Router();
const { uploadFile } = require('../Middleware/Multer');
const { addTodo, listTodo, deleteTodo } = require('../Controllers/TodoController');
const AuthMiddleware = require('../Middleware/AuthMiddleware');


router.post("/signup", signup);
router.post("/login", login);
router.post("/uploadimage", uploadFile.single('image'), uploadImage)
router.post("/addTask", AuthMiddleware, addTodo)
router.post("/listTodo", AuthMiddleware, listTodo)
router.delete("/deleteTodo/:id", AuthMiddleware, deleteTodo)


module.exports = router;
