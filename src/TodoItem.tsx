import React from "react";

type Todo = {
    title: string,
    id: string
}
type Props = {
    task: Todo,
    onDeleteTask: (id: string) => void
}
const TodoItem: React.FC<Props> = ({ task, onDeleteTask }) => {
    const handleDeleteTask = () => {
        onDeleteTask(task.id)
    }
return (
        
            <li>
                {task.title}
                <button onClick={handleDeleteTask}>x</button>
            </li>
       
    )
}

export default TodoItem