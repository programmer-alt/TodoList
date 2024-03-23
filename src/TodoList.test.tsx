// Импортируем необходимые зависимости для тестирования
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';
import generateUniqueId from 'generate-unique-id';

// Мокаем функцию генерации уникального ID, чтобы она всегда возвращала один и тот же ID для тестов
jest.mock('generate-unique-id', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue('test-id'),
}));

describe('TodoList', () => {
    // Определяем отдельный тестовый случай
    it('should add a new task when handleAddTask is called', () => {
        // Рендерим компонент TodoList в тестовом окружении
        const { getByPlaceholderText, getByText } = render(
            <TodoList />
        );

        // Ищем поле ввода по его placeholder и вводим название новой задачи
        const input = getByPlaceholderText('введите заметку');
        // Имитируем изменение значения поля ввода, устанавливая его значение в 'New Task'
        fireEvent.change(input, { target: { value: 'New Task' } });

        // Ищем кнопку добавления задачи по ее тексту и кликаем по ней
        const addButton = getByText('Добавить заметку');
        fireEvent.click(addButton);

        // Проверяем, что новая задача была добавлена в состояние компонента
        // Поскольку компонент использует локальное состояние, мы не можем напрямую проверить состояние здесь.
        // Вместо этого мы можем проверить, отображается ли новая задача в DOM.
        expect(getByText('New Task')).toBeInTheDocument();
    });
});