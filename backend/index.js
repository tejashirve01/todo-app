// backend/index.js
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Create a new Todo
app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    try {
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({
            msg: "Todo created"
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Mark a todo as completed
app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    try {
        await Todo.updateOne(
            { _id: req.body.id },
            { $set: { completed: true } }
        );
        res.json({
            msg: "Todo marked as completed"
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Backend server running on http://localhost:3000");
});
