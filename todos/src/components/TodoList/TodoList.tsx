import { useState } from "react";
import { todoItems } from "../../constants/todos";
import "./TodoList.css";
import TodosCategory from "../TodosCategory/TodosCategory";
import NewTodoForm from "../NewTodoForm/NewTodoForm";

const TodoList = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [filteredTodoItems, setFilteredTodoItems] = useState(todoItems);

  const handleCheckboxChange = (itemId: number) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const isItemChecked = (itemId: number) => checkedItems.includes(itemId);

  const setActive = (category: string) => {
    if (category === "All") {
      setFilteredTodoItems(todoItems);
    }
    if (category === "Active") {
      setFilteredTodoItems(todoItems.filter((item) => !checkedItems.includes(item.id)));
    }
    if (category === "Completed") {
      setFilteredTodoItems(todoItems.filter((item) => checkedItems.includes(item.id)));
    }
  };

  const clearCompleted = () => {
    const filteredTodoItems = todoItems.filter((item) => {
      return !checkedItems.includes(item.id) || item.id === 0;
    });
    setFilteredTodoItems(filteredTodoItems);
  };

  const submit = (todoText: string) => {
    const newTodoItems = [
      ...filteredTodoItems,
      {
        id: Date.now(),
        text: todoText,
      },
    ];
    setFilteredTodoItems(newTodoItems);
  };

  return (
    <section className="todo-list-area">
      <NewTodoForm onSubmit={submit} />
      <ul className="todo-list">
        {filteredTodoItems.map((todoItem) => (
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
        <span className="items-left">{filteredTodoItems.length} items</span>
        <TodosCategory setActive={setActive} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear Completed
        </button>
      </div>
    </section>
  );
};

export default TodoList;
