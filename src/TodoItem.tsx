import React, { useState } from "react";

type Todo = {
    title: string,
    id: string,
    isComplete: boolean
}

type Props = {
    task: Todo,
    onDeleteTask: (id: string) => void,
    onToggleComplete: (id: string) => void
}

const TodoItem: React.FC<Props> = ({ task, onDeleteTask, onToggleComplete }) => {
    const handleDeleteTask = () => {
        onDeleteTask(task.id)
    }

    const handleToggleComplete = () => {
        onToggleComplete(task.id)
    }

    return (
        <li>
            <input type="checkbox" checked={task.isComplete} onChange={handleToggleComplete} />
            {task.title}
            <button onClick={handleDeleteTask}>x</button>
        </li>
    )
}

export default TodoItem