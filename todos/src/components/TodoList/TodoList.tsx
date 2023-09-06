import { todoItems } from "../../constants/todos";
import { useState, useEffect } from "react";

interface TodoListProps {
  id: number;
  text: string;
}
const TodoItems = () => {
  const [todos, setTodos] = useState<TodoListProps[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos(todoItems);
    }
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoItems;
