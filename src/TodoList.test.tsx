// Импортируем необходимые зависимости для тестирования
import React from 'react';
import { render, fireEvent, queryByText, getByPlaceholderText, getByText, findAllByText, getAllByText } from '@testing-library/react';
import TodoList from './TodoList';
import generateUniqueId from 'generate-unique-id';
import TodoInput from './TodoInput';

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
    // Тест на проверку удаления задачи

    it('should remove a task when handleDeleteTask is called', () => {
        // Рендерим компонент TodoList в тестовом окружении
        const { getByPlaceholderText, getByText, queryByText, container } = render(<TodoList />);

        // Находим поле ввода по его placeholder и вводим название новой задачи
        const input = getByPlaceholderText('введите заметку');
        fireEvent.change(input, { target: { value: 'New Task' } });

        // Находим кнопку добавления задачи по ее тексту и кликаем по ней
        const addButton = getByText('Добавить заметку');
        fireEvent.click(addButton);

        // Проверяем, что новая задача была добавлена
        expect(getByText('New Task')).toBeInTheDocument();

        // Находим кнопку удаления по ее тексту и кликаем по ней
        const deleteButton = getByText('x');
        fireEvent.click(deleteButton);

        // Проверяем, что задача была удалена
        expect(queryByText('New Task')).toBeNull();
    });


    // Тест на проверку переключения статуса выполнения задачи
    it('should toggle the completion status of a task when handleToggleComplete is called', () => {
        const { getByText, getByRole, getByPlaceholderText, rerender } = render(<TodoList />)

        // Находим поле ввода по его placeholder и вводим название новой задачи
        const input = getByPlaceholderText('введите заметку')
        fireEvent.change(input, { target: { value: 'New Task' } });
        // Добавляем новую задачу
        const addButton = getByText('Добавить заметку')
        fireEvent.click(addButton)

        // Проверяем, что новая задача была добавлена в состояние компонента
        expect(getByText('New Task')).toBeInTheDocument();

        // Находим чекбокс задачи
        const checkbox = getByRole('checkbox');
        fireEvent.click(checkbox); // Кликаем по чекбоксу
        // Перерендерим компонент, чтобы увидеть обновленный статус задачи
        rerender(<TodoList />);
        expect(checkbox).toBeChecked(); // Проверяем, что чекбокс теперь отмечен
        expect(getByText('New Task')).toHaveStyle('textDecoration: line-through');
        // Проверяем, что текст задачи теперь перечеркнут
    });
    // Запускает тестовый случай, проверяющий, 
    //что задача с пустым текстом не будет добавлена в список задач.
    it('should not add a task with empty text', () => {
        const mockAddTask = jest.fn(); // Создаем mock функцию для onAddTask
        const { getByPlaceholderText, getByText } = render(<TodoInput onAddTask={mockAddTask} />);
        // Находим поле ввода по его placeholder и вводим пустой текст
        const input = getByPlaceholderText('введите заметку');
        fireEvent.change(input, { target: { value: '' } });
        // Находим кнопку добавления задачи по ее тексту и кликаем по ней
        const addButton = getByText('Добавить заметку');
        fireEvent.click(addButton);
        // Проверяем, что функция onAddTask не была вызвана
        expect(mockAddTask).not.toHaveBeenCalled();
    });
    // добавляет задание с длинным текстом без ошибки
    it('should add a task with very long text without errors', () => {
        const mockAddTask = jest.fn(); // Создаем mock функцию для onAddTask
        const { getByPlaceholderText, getByText } = render(<TodoInput onAddTask={mockAddTask} />);
        const input = getByPlaceholderText('введите заметку');
        
        // Генерируем очень длинный текст (например, 1000 символов)
        const longText = 'a'.repeat(1000);
        
        fireEvent.change(input, { target: { value: longText } }); // Вводим очень длинный текст
        const addButton = getByText('Добавить заметку');
        fireEvent.click(addButton); // Нажимаем кнопку "Добавить заметку"
    
        // Проверяем, что функция onAddTask была вызвана с очень длинным текстом
        expect(mockAddTask).toHaveBeenCalledWith(longText);
    });
    //добавление задания с html тегами без ошибок
    it('should add a task with text containing HTML tags without errors', () => { 
        // Создаем mock функцию для onAddTask, чтобы проверить, вызывается ли она с ожидаемыми аргументами
const mockAddTask = jest.fn();

// Рендерим компонент TodoInput с передачей mock функции в качестве обработчика добавления задачи
const { getByPlaceholderText, getByText } = render(<TodoInput onAddTask={mockAddTask} />);

// Получаем ссылку на элемент ввода по его placeholder тексту
const input = getByPlaceholderText('введите заметку');

// Определяем текст задачи, содержащий HTML-теги
const textWithHTML = '<div>This is a task with <strong>HTML tags</strong></div>';

// Имитируем изменение значения ввода на текст с HTML-тегами
fireEvent.change(input, { target: { value: textWithHTML } });

// Получаем ссылку на кнопку добавления задачи по ее тексту
const addButton = getByText('Добавить заметку');

// Имитируем клик по кнопке добавления задачи
fireEvent.click(addButton);

// Проверяем, что mock функция onAddTask была вызвана с текстом, содержащим HTML-теги
expect(mockAddTask).toHaveBeenCalledWith(textWithHTML);
});
});