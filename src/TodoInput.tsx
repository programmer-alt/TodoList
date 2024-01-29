import React, { useState } from "react";
interface TodoInputProps {
    onAddTask: (task: string) => void
}
const TodoInput = ({ onAddTask }: TodoInputProps) => {
    const [inputValue, setInputValue] = useState('')

    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            onAddTask(inputValue);
            setInputValue('')
        }
    }
    return (
        <div>
            <input
                type="text"
                placeholder="введите заметку"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAddTask}>Добавить заметку</button>
        </div>
    )

}
export default TodoInput