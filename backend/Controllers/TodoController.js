const TodoModel = require("../Models/TodoModel");

const addTodo = async (req, res) => {
    try {
        const { todo } = req.body
        console.log(req.user, "todo..");

        const newTask = new TodoModel({
            userId: req.user._id,
            task: todo
        })

        const savedTodo = await newTask.save()
        return res.status(200).json({ message: "todo saved", savedTodo })


    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })

    }
}


const listTodo = async (req, res) => {
    try {
        const todos = await TodoModel.find()
        return res.status(200).json(todos)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}


const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id

        const delted = await TodoModel.deleteOne({ _id: todoId })
        console.log(delted, "delted");

        return res.status(200).json({ message: 'Todo Deleted', todoId })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

module.exports = {
    addTodo,
    listTodo,
    deleteTodo
}