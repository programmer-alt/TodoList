// Импортируем React и хук useState для работы с состоянием компонента
import React, { useState } from 'react';
// Импортируем функцию для генерации уникального ID для задач
import generateUniqueId from 'generate-unique-id';
// Импортируем компонент TodoItem для отображения каждой задачи
import TodoItem from './TodoItem';
// Импортируем компонент TodoInput для ввода новой задачи
import TodoInput from './TodoInput';
// Импортируем стили для компонента TodoList
/// <reference types="react-scripts" />
import styles from './TodoList.module.css';


// Объявляем компонент TodoList
const TodoList: React.FC = () => {
    // Инициализируем состояние для хранения списка задач
    const [task, setTask] = useState<{ title: string, id: string, isComplete:boolean }[]>([]);
    // Функция для добавления новой задачи в список
    const handleAddTask = (title: string) => {
        // Создаем новую задачу с уникальным ID и статусом "не выполнено"
        const newTodo = {
            title,
            id: generateUniqueId(),
            isComplete: false
        }
        // Добавляем новую задачу в список
        setTask([...task, newTodo])
    }
    // Функция для удаления задачи из списка по ID
    const handleDeleteTask = (id: string) => {
        // Фильтруем список задач, исключая задачу с указанным ID
        const updatedTask = task.filter((todo) => todo.id !== id)
        // Обновляем список задач
        setTask(updatedTask)
    }
    // Функция для переключения статуса выполнения задачи по ID
    const handleToggleComplete = (id:string) => {
        // Обновляем список задач, переключая статус выполнения для задачи с указанным ID
        const updatedTask = task.map((todo) =>
        // Если ID текущей задачи совпадает с переданным ID,
    // то создаем новый объект задачи с тем же содержимым, но с измененным статусом выполнения
    // (т.е. если задача была не выполнена, то она становится выполненной, и наоборот)
        todo.id === id ? {...todo, isComplete: !todo.isComplete}: todo
        )
        // Обновляем список задач
        setTask(updatedTask)
        // Выводим обновленный список задач в консоль для отладки
        console.log(updatedTask)
    }
    // Возвращаем JSX для рендеринга компонента TodoList
    return (
        <div>
            <h1>Список задач</h1>
            {/* Рендерим компонент TodoInput для ввода новой задачи */}
            <TodoInput onAddTask={handleAddTask} />
            {/* Рендерим список задач */}
            <ul className={`${styles.myList}`}> {/* Применяем стиль из модуля */}
                {/* Для каждой задачи в списке рендерим компонент TodoItem */}
                {task.map((task) =>
                    <TodoItem key={task.id} task={task} onToggleComplete={handleToggleComplete} onDeleteTask={handleDeleteTask} />
                )}
            </ul>
        </div>
    )
}
// Экспортируем компонент TodoList для использования в других частях приложения
export default TodoList;