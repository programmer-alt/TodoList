import React, { useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
    const [task, setTask] = useState<{ title: string, id: string, isComplete:boolean }[]>([]);
    const handleAddTask = (title: string) => {
        const newTodo = {
            title,
            id: generateUniqueId(),
            isComplete: false
        }
        setTask([...task, newTodo])
    }
    const handleDeleteTask = (id: string) => {
        const updatedTask = task.filter((todo) => todo.id !== id)
        setTask(updatedTask)
    }
    const handleToggleComplete = (id:string) => {
        const updatedTask = task.map((todo) =>
        todo.id === id ? {...todo, isComplete: !todo.isComplete}: todo
        )
        setTask(updatedTask)
    }
    return (
        <div>
            <h1>Список задач</h1>
            <TodoInput onAddTask={handleAddTask} />
            <ul className={`${styles.myList}`}> {/* Применение стиля из модуля */}
                {task.map((task) =>
                    <TodoItem key={task.id} task={task} onToggleComplete={handleToggleComplete} onDeleteTask={handleDeleteTask} />
                )}
            </ul>
        </div>
    )
}
export default TodoList;
