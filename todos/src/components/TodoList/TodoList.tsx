import React, { useState } from "react";
import { todoItems } from "../../constants/todos";
import "./TodoList.css";
import TodosCategory from "../TodosCategory/TodosCategory";

const TodoList = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const itemsLeft = todoItems.filter((item) => !checkedItems.includes(item.id)).length;

  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const isItemChecked = (itemId) => checkedItems.includes(itemId);

  return (
    <section className="todo-list-area">
      <ul className="todo-list">
        {todoItems.map((todoItem) => (
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
        <span className="items-left">{itemsLeft} items left</span>
        <TodosCategory />
        <p className="clear-completed">Clear Completed</p>
      </div>
    </section>
  );
};

export default TodoList;
