import React, { useState } from "react";
import { todoItems } from "../../constants/todos";
import "./TodoList.css";

const TodoList = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      // Item is already checked, so uncheck it
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      // Item is not checked, so check it
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
            <div
              className={`custom-checkbox ${isItemChecked(todoItem.id) ? "checked" : ""}`}
              onClick={() => handleCheckboxChange(todoItem.id)}
            >
              {isItemChecked(todoItem.id) && <span className="checkmark">&#10003;</span>}
            </div>
            <span className={`todo-name ${isItemChecked(todoItem.id) ? "crossed" : ""}`}>
              {todoItem.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
