import { render, fireEvent, screen, waitFor, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Подключение userEvent для управления событиями пользователя
import TodoItem from './TodoItem';
import React from 'react';
//npm test -- --testPathPattern=TodoItem.test.tsx

describe('TodoItem', () => {
  it(' render without crashing', () => {
    const mockDeleteTask = jest.fn()
    const mockToggleComplete = jest.fn()
    render(<TodoItem task={{ title: 'Test Task', id: 'test-id', isComplete: false }}
      onDeleteTask={mockDeleteTask}
      onToggleComplete={mockToggleComplete} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()

  });
  it('checking the toHaveBeenCalledWith function call', () => {
    const mockTask = {
      title: 'Test task',
      id: 'test-id',
      isComplete: false
    };
    const mockOnDeleteTask = jest.fn();
    const mockOnToggleComplete = jest.fn();
    const { getByRole } = render(
      <TodoItem
        task={mockTask}
        onDeleteTask={mockOnDeleteTask}
        onToggleComplete={mockOnToggleComplete}
      />
    );
    const checkbox = getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockOnToggleComplete).toHaveBeenCalledWith('test-id'); // Предполагаем, что идентификатор задачи передается в функцию onToggleComplete при изменении чекбокса
  });
  it('calls onDeleteTask prop when delete button is clicked', () => {
    const mockDeleteTask = jest.fn()
    const mockTask = {
      title: 'Test Task',
      id: 'test-id',
      isComplete: false
    }
    
    //чтобы получить метод getByText, который позволяет найти элементы по тексту.
    const { getByText } = render(<TodoItem task={mockTask}
      onDeleteTask={mockDeleteTask} onToggleComplete={() => { }} />)
    const deleteButton = getByText('x') // поиск кнопки с названием х
    fireEvent.click(deleteButton)//симуляция клика на кнопку
    expect(mockDeleteTask).toHaveBeenCalledTimes(1)//вызов матчера , ожидание что кнопка нажмется один раз
    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id)
  })
  it(' if input in a state of checked then property isComplete true', () => {
    const mockTask = {
      title: 'Test Task',
      id: 'test-id',
      isComplete: false
    }
    const mockToggleComplete = jest.fn().mockImplementation((id) => {
      if (id === mockTask.id) {
        mockTask.isComplete = true
      }
    })
    const { getByRole } = render(
      <TodoItem
        task={mockTask}
        onDeleteTask={() => { }}
        onToggleComplete={mockToggleComplete}
      />
    );
    const checkbox = getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(mockTask.isComplete).toBe(true)

  })
  it('должен переключать статус задачи и применять стиль перечеркивания при клике на чекбокс', () => {
    // Создаем объект задачи с начальными данными
    const task = {
      title: 'Тестовая задача',
      id: '1',
      isComplete: false,
    };
    // Создаем мок-функцию toggleComplete, которая будет вызываться при клике на чекбокс
    const toggleComplete = jest.fn().mockImplementation(() => {
      // Изменяем свойство isComplete задачи на true
      task.isComplete = true;
      // Возвращаем измененную задачу
      return task;
    });
    // Рендерим компонент TodoItem с передачей задачи и мок-функции
    const { getByRole, rerender } = render(
      <TodoItem task={task} onDeleteTask={jest.fn()} onToggleComplete={toggleComplete} />
    );
    // Получаем элемент чекбокса по его роли
    const checkbox = getByRole('checkbox');
    // Имитируем клик по чекбоксу
    fireEvent.click(checkbox);
    // Проверяем, что мок-функция toggleComplete была вызвана один раз
    expect(toggleComplete).toHaveBeenCalledTimes(1);
    // Проверяем, что мок-функция toggleComplete была вызвана с правильным ID задачи
    expect(toggleComplete).toHaveBeenCalledWith(task.id);
    // Перерендерим компонент с обновленным состоянием задачи
    rerender(<TodoItem task={task} onDeleteTask={jest.fn()} onToggleComplete={toggleComplete} />);
    // Проверяем, что чекбокс отмечен
    expect(getByRole('checkbox')).toBeChecked();
    // Получаем элемент чекбокса и ближайший к нему элемент списка
    const checkboxElement = getByRole('checkbox');
    const liElement = checkboxElement.closest('li');
    // Получаем элемент span внутри элемента списка
    const spanElement = liElement && liElement.querySelector('span');
    // Проверяем, что элемент span существует
    if (spanElement) {
      // Проверяем, что элемент span имеет стиль перечеркивания
      expect(spanElement).toHaveStyle({
        textDecoration: 'line-through'
      });
    } else {
      // Если элемент span не найден, выбрасываем ошибку
      throw new Error('Span element not found');
    }
  })
})