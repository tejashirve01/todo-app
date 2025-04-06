// frontend/src/components/CreateTodo.jsx
import { useState } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            const res = await fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    description
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            alert(json.msg || "Todo added");
            // Optionally clear inputs:
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Error adding todo");
        }
    };

    return (
        <div>
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /><br />

            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /><br />

            <button style={{ padding: 10, margin: 10 }} onClick={handleAddTodo}>
                Add a todo
            </button>
        </div>
    );
}
