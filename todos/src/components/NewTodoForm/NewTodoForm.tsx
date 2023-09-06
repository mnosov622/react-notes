import React, { useRef } from "react";
import "./NewTodoForm.css";

type Props = {
  onSubmit: (todoText: string) => void;
};

const NewTodoForm = ({ onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todoText.current || !todoText.current.value.trim()) {
      return;
    }

    onSubmit(todoText.current.value);
    todoText.current.value = "";
  };

  const todoText = useRef<HTMLInputElement | null>(null);

  return (
    <form className="todo-form" onSubmit={(e) => handleSubmit(e)} id="add-note-form">
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
      <input type="text" placeholder="Add a new task" ref={todoText} id="new-note-input" />
    </form>
  );
};

export default NewTodoForm;
