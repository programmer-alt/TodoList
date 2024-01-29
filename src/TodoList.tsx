import React, { useState } from 'react';
import generateUniqueId from 'generate-unique-id';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import styles from './TodoList.module.css';

const TodoList: React.FC = () => {
    const [task, setTask] = useState<{ title: string, id: string }[]>([]);
    const handleAddTask = (title: string) => {
        const newTodo = {
            title,
            id: generateUniqueId()
        }
        setTask([...task, newTodo])
    }
    const handleDeleteTask = (id: string) => {
        console.log('Удаляем задачу с индексом:', id);
        const updatedTask = task.filter((todo) => todo.id !== id)
        setTask(updatedTask)
    }
    return (
        <div>
            <h1>Список задач</h1>
            <TodoInput onAddTask={handleAddTask} />
            <ul className={`${styles.myList}`}> {/* Применение стиля из модуля */}
                {task.map((task) =>
                    <TodoItem key={task.id} task={task} onDeleteTask={handleDeleteTask} />
                )}
            </ul>
        </div>
    )
}
export default TodoList;
