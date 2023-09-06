import { todoItems } from "../../constants/todos";
import { useState, useEffect } from "react";
import "./TodoList.css";
import NewTodoForm from "../NewTodoForm/NewTodoForm";
import TodosCategory from "../TodosCategory/TodosCategory";

interface Todos {
  id: number;
  text: string;
}

const TodoItems = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [itemsLeft, setItemsLeft] = useState<number>(todos.length);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      setItemsLeft(JSON.parse(storedTodos).length);
    } else {
      setTodos(todoItems);
      setItemsLeft(todoItems.length);
    }
  }, []);

  const isItemChecked = (itemId: number) => checkedItems.includes(itemId);

  const handleCheckboxChange = (itemId: number) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
      setItemsLeft(itemsLeft + 1);
    } else {
      setCheckedItems([...checkedItems, itemId]);
      setItemsLeft(itemsLeft - 1);
    }
  };

  const submit = (todoText: string) => {
    const newTodoItems = [
      ...todos,
      {
        id: Date.now(),
        text: todoText,
      },
    ];

    setTodos(newTodoItems);
    localStorage.setItem("todos", JSON.stringify(newTodoItems));
    setItemsLeft(itemsLeft + 1);
  };

  const clearCompleted = () => {
    const filteredTodoItems = todos.filter((todoItem) => !isItemChecked(todoItem.id));
    setTodos(filteredTodoItems);
  };

  const setActive = (category: string) => {
    if (category === "All") {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        setTodos(todoItems);
      }
    } else if (category === "Active") {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const activeTodos = JSON.parse(storedTodos).filter(
          (todoItem: { id: number; text: string }) => !isItemChecked(todoItem.id)
        );
        setTodos(activeTodos);
      } else {
        const activeTodos = todoItems.filter(
          (todoItem: { id: number; text: string }) => !isItemChecked(todoItem.id)
        );
        setTodos(activeTodos);
      }
    } else if (category === "Completed") {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        const completedTodos = JSON.parse(storedTodos).filter(
          (todoItem: { id: number; text: string }) => isItemChecked(todoItem.id)
        );
        setTodos(completedTodos);
      } else {
        const completedTodos = todoItems.filter((todoItem: { id: number; text: string }) =>
          isItemChecked(todoItem.id)
        );
        setTodos(completedTodos);
      }
    }
  };

  return (
    <section className="todo-list-area">
      <NewTodoForm onSubmit={submit} />
      <ul className="todo-list">
        {todos.map((todoItem) => (
          <li
            key={todoItem.id}
            className={`todo-item ${isItemChecked(todoItem.id) ? "checked" : ""}`}
          >
            <label>
              <input
                type="checkbox"
                checked={isItemChecked(todoItem.id)}
                onChange={() => handleCheckboxChange(todoItem.id)}
              />
              <div className={`custom-checkbox ${isItemChecked(todoItem.id) ? "checked" : ""}`}>
                {isItemChecked(todoItem.id) && <span className="checkmark">&#10003;</span>}
              </div>
              <span className={`todo-name ${isItemChecked(todoItem.id) ? "crossed" : ""}`}>
                {todoItem.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="todo-list-footer">
        <span className="items-left">{itemsLeft} items</span>
        <TodosCategory setActive={setActive} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear Completed
        </button>
      </div>
    </section>
  );
};

export default TodoItems;
