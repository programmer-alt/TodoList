import React, { useState } from "react";
import styles from './TodoList.module.css';

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
           <span className={task.isComplete? `${styles.completed}`: 'not-completed' }> {task.title} </span>
            <button onClick={handleDeleteTask}>x</button>
        </li>
    )
}

export default TodoItem