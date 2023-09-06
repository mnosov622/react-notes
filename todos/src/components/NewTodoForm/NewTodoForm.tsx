import React from "react";
import "./NewTodoForm.css";

const NewTodoForm = ({ onSubmit }) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(todoText.current.value);
    todoText.current.value = "";
  };
  const todoText = React.useRef(null);
  return (
    <form className="todo-form" onSubmit={(e) => handleSubmit(e)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="grey"
        className="input-icon"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
      <input type="text" placeholder="Add a new task" ref={todoText} />
    </form>
  );
};

export default NewTodoForm;
