// Импортируем React и хук useState для работы с состоянием компонента
import React, { useState } from "react";

// Определяем интерфейс для пропсов компонента TodoInput
interface TodoInputProps {
    // Функция, которая будет вызвана при добавлении новой задачи
    onAddTask: (task: string) => void
}

// Определяем компонент TodoInput
const TodoInput = ({ onAddTask }: TodoInputProps) => {
    // Инициализируем состояние для хранения текущего значения ввода
    const [inputValue, setInputValue] = useState('')

    // Функция для обработки добавления новой задачи
    const handleAddTask = () => {
        // Проверяем, что введенное значение не пустое
        if (inputValue.trim() !== '') {
            // Вызываем функцию onAddTask, передав ей текущее значение ввода
            onAddTask(inputValue);
            // Очищаем значение ввода
            setInputValue('')
        }
    }

    // Возвращаем JSX для рендеринга компонента
    return (
        <div>
            {/* Поле ввода для задачи */}
            <input
                type="text"
                placeholder="введите заметку"
                value={inputValue}
                // Обработчик события изменения значения ввода
                onChange={(e) => setInputValue(e.target.value)}
            />
            {/* Кнопка для добавления задачи */}
            <button onClick={handleAddTask}>Добавить заметку</button>
        </div>
    )
}

// Экспортируем компонент для использования в других частях приложения
export default TodoInput