import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoInput from './TodoInput';

describe('TodoInput', () => {
 it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<TodoInput onAddTask={jest.fn()} />);
    //извлекаем из рендера placeholder проверяем пропс через mock где onAddTask={jest.fn()
    expect(getByPlaceholderText('введите заметку')).toBeInTheDocument();
 });

 it('calls onAddTask prop when form is submitted', () => {
    const mockOnAddTask = jest.fn(); // Создание "mock" функции для onAddTask, которая будет использоваться в тестах
    const { getByPlaceholderText, getByText } = render(<TodoInput onAddTask={mockOnAddTask} />);

    fireEvent.change(getByPlaceholderText('введите заметку'), { target: { value: 'New task' } });
    // Симулируем изменение значения поля ввода с помощью      Объект, представляющий событие изменения. Значение поля ввода устанавливается равным 'New task'
    //fireEvent.change
    fireEvent.click(getByText('Добавить заметку'));

    expect(mockOnAddTask).toHaveBeenCalledWith('New task');
 });
});