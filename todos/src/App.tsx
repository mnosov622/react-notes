import Container from "./components/Layout/Container";
import Header from "./components/Layout/Header";
import NewTodoForm from "./components/NewTodoForm/NewTodoForm";
import TodoList from "./components/TodoList/TodoList";

const App = () => {
  return (
    <>
      <Container>
        <Header />
        <TodoList />
      </Container>
    </>
  );
};

export default App;
